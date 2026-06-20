import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/api";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923441702702";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const message = encodeURIComponent(
    `Assalam o Alaikum, mujhe ye suit order karna hai:\nCode: ${product.code}\nPrice: Rs. ${product.price}`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <Card className="overflow-hidden border-[#d9c089]/40 bg-[#fffdf8] py-0">
      <img
        src={product.image}
        alt={`${product.brand} ${product.code}`}
        className="aspect-[3/4] w-full object-cover"
        loading="lazy"
      />
      <CardContent className="p-4">
        <p className="text-xs uppercase tracking-wide text-[#7a1f2b]">
          {product.brand}
        </p>
        <h3 className="font-semibold text-[#3a1014]">{product.code}</h3>
        <ul className="mt-1 text-xs text-muted-foreground">
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-[#3a1014]">
            Rs. {product.price}
          </span>
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="gap-1 bg-[#25D366] text-white hover:bg-[#1ebe5b]"
            >
              <MessageCircle className="h-4 w-4" />
              Order
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
