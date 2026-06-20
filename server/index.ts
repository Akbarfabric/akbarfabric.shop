import express from "express";
import { createServer } from "http";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  getAllProducts,
  getProductsByCategory,
  addProduct,
  deleteProduct,
  seedIfEmpty,
  usingDatabase,
} from "./db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const UPLOADS_DIR = path.join(ROOT, "client", "public", "uploads");

// ---------------------------------------------------------------------------
// Multer (image upload) config
// ---------------------------------------------------------------------------
// When a database is configured (DATABASE_URL set), uploaded images are
// stored directly in the database as base64 -- this avoids relying on the
// host's disk, which is wiped on every deploy/restart on free hosting tiers.
// Without a database (local dev), images are written to disk as before.
const upload = usingDatabase
  ? multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } })
  : multer({
      storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
          if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
          cb(null, UPLOADS_DIR);
        },
        filename: (_req, file, cb) => {
          const ext = path.extname(file.originalname) || ".jpg";
          cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
        },
      }),
      limits: { fileSize: 8 * 1024 * 1024 },
    });

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------
async function startServer() {
  await seedIfEmpty();

  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "10mb" }));

  // ---- API routes ----------------------------------------------------------
  app.get("/api/products", async (_req, res) => {
    res.json(await getAllProducts());
  });

  app.get("/api/products/category/:slug", async (req, res) => {
    res.json(await getProductsByCategory(req.params.slug));
  });

  app.post("/api/products", upload.single("image"), async (req, res) => {
    const { categorySlug, name, price, description, code, brand } = req.body;

    if (!categorySlug) {
      return res.status(400).json({ error: "categorySlug is required" });
    }

    let imagePath = "";
    if (req.file) {
      if (usingDatabase) {
        const mime = req.file.mimetype || "image/jpeg";
        imagePath = `data:${mime};base64,${req.file.buffer.toString("base64")}`;
      } else {
        imagePath = `/uploads/${req.file.filename}`;
      }
    } else if (typeof req.body.image === "string") {
      imagePath = req.body.image;
    }

    const product = await addProduct({
      id: `p-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
      categorySlug,
      code: code || "NEW",
      name: name || "New Product",
      brand: brand || "Akbar Fabrics",
      price: Number(price) || 0,
      image: imagePath,
      details: description ? [description] : [],
    });

    res.status(201).json(product);
  });

  app.delete("/api/products/:id", async (req, res) => {
    await deleteProduct(req.params.id);
    res.json({ success: true });
  });

  // ---- Static files ----------------------------------------------------------
  app.use("/uploads", express.static(UPLOADS_DIR));

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(staticPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  const port =
    process.env.NODE_ENV === "production"
      ? process.env.PORT || 3000
      : process.env.API_PORT || 5001;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Database: ${usingDatabase ? "PostgreSQL (persistent)" : "local JSON file (dev only)"}`);
  });
}

startServer().catch(console.error);
