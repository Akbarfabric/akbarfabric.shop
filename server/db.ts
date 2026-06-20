import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

export interface Product {
  id: string;
  categorySlug: string;
  code: string;
  name: string;
  brand: string;
  price: number;
  image: string; // either a static path (/products/...) or a base64 data URL
  details: string[];
}

const USE_DB = !!process.env.DATABASE_URL;

// ---------------------------------------------------------------------------
// Postgres backend (used in production once DATABASE_URL is set, e.g. on
// Render with a free Neon / Supabase / Render Postgres database). Data here
// survives deploys and restarts, unlike the local disk.
// ---------------------------------------------------------------------------
let pool: import("pg").Pool | null = null;

async function getPool() {
  if (!pool) {
    const { Pool } = await import("pg");
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        category_slug TEXT NOT NULL,
        code TEXT,
        name TEXT,
        brand TEXT,
        price INTEGER DEFAULT 0,
        image TEXT,
        details JSONB DEFAULT '[]'
      );
    `);
  }
  return pool;
}

function rowToProduct(row: any): Product {
  return {
    id: row.id,
    categorySlug: row.category_slug,
    code: row.code,
    name: row.name,
    brand: row.brand,
    price: Number(row.price) || 0,
    image: row.image,
    details: Array.isArray(row.details) ? row.details : [],
  };
}

async function dbGetAll(): Promise<Product[]> {
  const p = await getPool();
  const { rows } = await p.query("SELECT * FROM products ORDER BY id");
  return rows.map(rowToProduct);
}

async function dbGetByCategory(slug: string): Promise<Product[]> {
  const p = await getPool();
  const { rows } = await p.query(
    "SELECT * FROM products WHERE category_slug = $1 ORDER BY id",
    [slug]
  );
  return rows.map(rowToProduct);
}

async function dbInsert(product: Product): Promise<Product> {
  const p = await getPool();
  await p.query(
    `INSERT INTO products (id, category_slug, code, name, brand, price, image, details)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      product.id,
      product.categorySlug,
      product.code,
      product.name,
      product.brand,
      product.price,
      product.image,
      JSON.stringify(product.details),
    ]
  );
  return product;
}

async function dbDelete(id: string): Promise<void> {
  const p = await getPool();
  await p.query("DELETE FROM products WHERE id = $1", [id]);
}

async function dbCount(): Promise<number> {
  const p = await getPool();
  const { rows } = await p.query("SELECT COUNT(*)::int AS count FROM products");
  return rows[0].count;
}

// ---------------------------------------------------------------------------
// JSON-file backend (used automatically in local development when no
// DATABASE_URL is configured, so `pnpm dev` keeps working out of the box).
// ---------------------------------------------------------------------------
const DATA_DIR = path.join(ROOT, "server", "data");
const DATA_FILE = path.join(DATA_DIR, "products.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function fileReadAll(): Product[] {
  ensureDataFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function fileWriteAll(products: Product[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// Public API (automatically picks DB or file backend)
// ---------------------------------------------------------------------------
export async function getAllProducts(): Promise<Product[]> {
  return USE_DB ? dbGetAll() : fileReadAll();
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  if (USE_DB) return dbGetByCategory(slug);
  return fileReadAll().filter((p) => p.categorySlug === slug);
}

export async function addProduct(product: Product): Promise<Product> {
  if (USE_DB) return dbInsert(product);
  const all = fileReadAll();
  all.push(product);
  fileWriteAll(all);
  return product;
}

export async function deleteProduct(id: string): Promise<void> {
  if (USE_DB) return dbDelete(id);
  const all = fileReadAll();
  fileWriteAll(all.filter((p) => p.id !== id));
}

export async function seedIfEmpty(): Promise<void> {
  const count = USE_DB ? await dbCount() : fileReadAll().length;
  if (count > 0) return;

  try {
    const mod = await import(path.join(ROOT, "shared", "products.ts"));
    const seedProducts: Product[] = Array.isArray(mod.products) ? mod.products : [];
    if (USE_DB) {
      for (const product of seedProducts) {
        await dbInsert(product);
      }
    } else {
      fileWriteAll(seedProducts);
    }
  } catch {
    // shared/products.ts wasn't importable; start with an empty catalog.
  }
}

export const usingDatabase = USE_DB;
