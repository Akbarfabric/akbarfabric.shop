import { Button } from "@/components/ui/button";
import { getCategories } from "@shared/categories";
import { Link } from "wouter";

export default function Home() {
  const categories = getCategories().slice(0, 6);

  return (
    <div className="min-h-screen bg-[#fbf8f2]">
      <section className="relative overflow-hidden bg-[#3a1014] py-20 text-center text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(#d9c089_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-[#e8c97a]">
            اکبر فیبرکس بورے والا
          </p>
          <h1 className="text-5xl font-bold md:text-7xl">Akbar Fabrics</h1>
          <p className="mt-4 text-lg text-white/70 md:text-xl">
            Bridal & Formal Wear Fabrics
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/categories">
              <Button className="h-12 border-[#d9c089] bg-[#d9c089] px-8 text-[#3a1014] hover:bg-[#e8c97a]">
                Shop by Category
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#3a1014]">مصنوعات کی اقسام</h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#7a1f2b]"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <div className="group cursor-pointer overflow-hidden border border-[#d9c089]/20 bg-white transition-all hover:border-[#d9c089]/60 hover:shadow-lg">
                <div className="relative h-48 bg-[#3a1014] p-8 text-center flex flex-col items-center justify-center transition-colors group-hover:bg-[#4a161b]">
                   <h3 className="text-2xl font-bold text-[#e8c97a] mb-2">{category.nameUrdu}</h3>
                   <div className="h-[1px] w-12 bg-white/20 mb-2"></div>
                   <p className="text-sm text-white/60 font-medium uppercase tracking-widest">{category.name}</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/categories">
            <Button variant="outline" className="border-[#7a1f2b] text-[#7a1f2b] hover:bg-[#7a1f2b] hover:text-white">
              تمام اقسام دیکھیں
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
