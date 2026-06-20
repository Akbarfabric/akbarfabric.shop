import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { fetchProductsByCategory, type Product } from "@/lib/api";
import { getCategoryBySlug } from "@shared/categories";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";

export default function CategoryProducts() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchProductsByCategory(slug)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [slug]);

  if (!category) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#fbf8f2]">
        <p className="text-lg text-[#3a1014]">Category not found</p>
        <Link href="/categories">
          <Button variant="outline">Back to Categories</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf8f2]">
      <header className="border-b border-[#d9c089]/40 bg-[#3a1014] py-10 text-center">
        <Link href="/categories">
          <span className="mb-3 inline-flex cursor-pointer items-center gap-1 text-sm text-[#e8c97a] hover:underline">
            <ChevronLeft className="h-4 w-4" /> All Categories
          </span>
        </Link>
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          {category.name}
        </h1>
        <p className="mt-2 text-sm text-white/70">{category.nameUrdu}</p>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-[#7a1f2b]" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Is category mein abhi products add nahi huay. Jald hi add kiye
            jayenge.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
