import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@shared/categories";
import { ChevronLeft } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  onClick?: (category: Category) => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <Card
      onClick={() => onClick?.(category)}
      className="group cursor-pointer overflow-hidden border-[#d9c089]/40 bg-[#fffdf8] transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7a1f2b]/10"
    >
      <div className="relative flex h-28 items-center justify-center bg-gradient-to-br from-[#7a1f2b] to-[#5c1620]">
        <span
          className="text-3xl font-bold tracking-wide text-[#e8c97a]"
          style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
        >
          {category.nameUrdu}
        </span>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-[#3a1014]">{category.name}</h3>
          <ChevronLeft className="h-4 w-4 shrink-0 rotate-180 text-[#7a1f2b] opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {category.description}
        </p>
      </CardContent>
    </Card>
  );
}
