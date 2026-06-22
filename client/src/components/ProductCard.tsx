import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/api";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("${product.brand} ${product.code} tokri mein add ho gaya!");
  };

  return (
    <Card className="overflow-hidden border-[#d9c089]/40 bg-[#fffdf8] py-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative group">
        <img
          src={product.image}
          alt={`${product.brand} ${product.code}`}
          className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardContent className="p-4">
        <p className="text-xs uppercase tracking-wide text-[#7a1f2b] font-bold">
          {product.brand}
        </p>
        <h3 className="font-semibold text-[#3a1014] truncate">{product.code}</h3>
        <ul className="mt-1 text-[10px] text-muted-foreground line-clamp-2 h-8">
          {product.details.map((d) => (
            <li key={d} className="inline mr-1 after:content-[','] last:after:content-['']">{d}</li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-bold text-[#3a1014]">
            Rs. {product.price}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="gap-1 bg-[#7a1f2b] text-white hover:bg-[#3a1014] text-xs h-8"
          >
            <ShoppingCart className="h-3 w-3" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
