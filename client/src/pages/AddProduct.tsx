import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/lib/api";
import { categories } from "@shared/categories";
import { CheckCircle2, ImagePlus, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function AddProduct() {
  const [categorySlug, setCategorySlug] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categorySlug || !imageFile) return;

    setSubmitting(true);
    setError(null);
    try {
      await createProduct({
        categorySlug,
        name,
        price: Number(price) || 0,
        description,
        imageFile,
      });

      setSuccess(true);
      setCategorySlug("");
      setName("");
      setPrice("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      (document.getElementById("image-input") as HTMLInputElement).value = "";
    } catch {
      setError("Product add nahi ho saka. Dobara koshish karein.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf8f2]">
      <header className="border-b border-[#d9c089]/40 bg-[#3a1014] py-10 text-center">
        <h1 className="text-3xl font-bold text-white">Add Product</h1>
        <p className="mt-2 text-sm text-white/70">نیا پروڈکٹ شامل کریں</p>
      </header>

      <main className="mx-auto max-w-xl px-4 py-10">
        {success && (
          <div className="mb-6 flex items-center gap-2 rounded-md border border-green-300 bg-green-50 p-3 text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            Product add ho gaya! Category page par ja kar dekh lein.
          </div>
        )}
        {error && (
          <div className="mb-6 rounded-md border border-red-300 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category select */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={categorySlug} onValueChange={setCategorySlug}>
              <SelectTrigger>
                <SelectValue placeholder="Category select karein" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image upload */}
          <div className="space-y-2">
            <Label htmlFor="image-input">Picture</Label>
            <Input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-48 w-36 rounded-md border object-cover"
              />
            ) : (
              <div className="mt-2 flex h-48 w-36 items-center justify-center rounded-md border border-dashed text-muted-foreground">
                <ImagePlus className="h-8 w-8" />
              </div>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name (optional)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Velvet Bridal Shawl"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price (Rs.)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 3500"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Fabric, design details, etc."
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={!categorySlug || !imageFile || submitting}
            className="w-full bg-[#7a1f2b] hover:bg-[#5c1620]"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Add Product"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/categories">
            <span className="cursor-pointer text-sm text-[#7a1f2b] hover:underline">
              Categories dekhein
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
