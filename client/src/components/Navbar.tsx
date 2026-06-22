import { Link } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#d9c089]/20 bg-[#3a1014] text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex cursor-pointer flex-col items-start">
            <span className="text-xl font-bold tracking-tight text-[#e8c97a]">AKBAR FABRICS</span>
            <span className="text-[10px] uppercase text-white/60">Burewala - E-Store</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/"><span className="cursor-pointer text-sm font-medium hover:text-[#e8c97a]">Home</span></Link>
          <Link href="/categories"><span className="cursor-pointer text-sm font-medium hover:text-[#e8c97a]">Shop by Category</span></Link>
          <Link href="/add-product"><span className="cursor-pointer text-sm font-medium hover:text-[#e8c97a]">Add Product</span></Link>
        </div>

        {/* Cart & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/checkout">
            <Button variant="ghost" className="relative p-2 text-[#e8c97a] hover:bg-white/10 hover:text-white">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6 text-[#e8c97a]" /> : <Menu className="h-6 w-6 text-[#e8c97a]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[#d9c089]/10 bg-[#4a161b] p-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/"><span className="text-sm font-medium py-2 border-b border-white/5" onClick={() => setIsOpen(false)}>Home</span></Link>
            <Link href="/categories"><span className="text-sm font-medium py-2 border-b border-white/5" onClick={() => setIsOpen(false)}>Shop by Category</span></Link>
            <Link href="/add-product"><span className="text-sm font-medium py-2" onClick={() => setIsOpen(false)}>Add Product</span></Link>
          </div>
        </div>
      )}
    </nav>
  );
}
