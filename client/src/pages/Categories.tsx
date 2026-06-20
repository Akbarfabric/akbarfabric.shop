import CategoryCard from "@/components/CategoryCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categories, type Category } from "@shared/categories";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Categories() {
  const [active, setActive] = useState<Category | null>(null);
  const [, navigate] = useLocation();

  const handleCardClick = (category: Category) => {
    if (category.sizeChart) {
      setActive(category);
      return;
    }
    navigate(`/categories/${category.slug}`);
  };

  return (
    <div className="min-h-screen bg-[#fbf8f2]">
      {/* Header */}
      <header className="border-b border-[#d9c089]/40 bg-[#3a1014] py-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#e8c97a]">
          Akbar Fabrics Burewala
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
          Shop by Category
        </h1>
        <p className="mt-2 text-sm text-white/70">
          مصنوعات کی اقسام دیکھیں
        </p>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </main>

      {/* Size chart dialog for Stitch Suit */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="border-[#d9c089]/50">
          <DialogHeader>
            <DialogTitle className="text-[#3a1014]">
              {active?.name} — Size Chart
            </DialogTitle>
          </DialogHeader>
          {active?.sizeChart && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Size</TableHead>
                  <TableHead>Chest</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {active.sizeChart.map((row) => (
                  <TableRow key={row.size}>
                    <TableCell className="font-medium">{row.size}</TableCell>
                    <TableCell>{row.chest}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
