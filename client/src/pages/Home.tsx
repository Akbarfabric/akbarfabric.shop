import CategoryCard from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { categories } from "@shared/categories";
import { Link } from "wouter";

export default function Home() {
  const featured = categories.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f2]">
      {/* Hero */}
      <header className="bg-[#3a1014] py-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#e8c97a]">
          اکبر فیبرکس بورے والا
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          Akbar Fabrics
        </h1>
        <p className="mt-2 text-white/70">Bridal &amp; Formal Wear Fabrics</p>
        <Link href="/categories">
          <Button className="mt-6 bg-[#e8c97a] text-[#3a1014] hover:bg-[#dcb965]">
            Shop by Category
          </Button>
        </Link>
        <Link href="/add-product">
          <Button
            variant="outline"
            className="mt-6 ml-3 border-[#e8c97a] text-[#e8c97a] hover:bg-white/10"
          >
            + Add Product
          </Button>
        </Link>
      </header>

      {/* Category preview */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-[#3a1014]">
          مصنوعات کی اقسام
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/categories">
            <Button variant="outline" className="border-[#7a1f2b] text-[#7a1f2b]">
              تمام اقسام دیکھیں
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
