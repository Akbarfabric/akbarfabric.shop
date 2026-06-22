import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "923441702702";

export default function Checkout() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Aapki tokri khali hai!");
      return;
    }

    const orderDetails = cart
      .map((item) => `${item.brand} - ${item.code} (Qty: ${item.quantity}) - Rs. ${item.price * item.quantity}`)
      .join("\n");

    const message = encodeURIComponent(
      `Assalam o Alaikum, main ye order place karna chahta hoon:\n\n*Customer Details:*\nNaam: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city}\n\n*Order Items:*\n${orderDetails}\n\n*Total Bill: Rs. ${totalPrice}*`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    toast.success("Order details WhatsApp par bhej di gayi hain!");
    // clearCart();
    // setLocation("/");
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#fbf8f2] p-4">
        <ShoppingBag className="h-16 w-16 text-[#d9c089]" />
        <h2 className="text-2xl font-bold text-[#3a1014]">Aapki tokri khali hai</h2>
        <p className="text-muted-foreground">Abhi koi suit select nahi kiya gaya.</p>
        <Link href="/categories">
          <Button className="bg-[#7a1f2b] hover:bg-[#3a1014]">Shop Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf8f2] pb-20">
      <header className="border-b border-[#d9c089]/40 bg-[#3a1014] py-6 text-center">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between">
          <Link href="/categories">
            <Button variant="ghost" className="text-[#e8c97a] hover:text-white hover:bg-white/10">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Checkout</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#3a1014]">Aapka Order</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="border-[#d9c089]/20 bg-white">
                  <CardContent className="p-4 flex gap-4">
                    <img src={item.image} alt={item.code} className="h-20 w-20 rounded object-cover" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase text-[#7a1f2b]">{item.brand}</p>
                          <h3 className="font-semibold text-[#3a1014]">{item.code}</h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 border border-[#d9c089]/40 rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-bold text-[#3a1014]">Rs. {item.price * item.quantity}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-[#d9c089]/40 bg-[#3a1014] text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Bill:</span>
                  <span>Rs. {totalPrice}</span>
                </div>
                <p className="text-xs text-white/60 mt-1">Total Items: {totalItems}</p>
              </CardContent>
            </Card>
          </div>

          {/* Shipping Form */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#3a1014]">Shipping Details</h2>
            <Card className="border-[#d9c089]/40 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name (Pura Naam)</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Ali Khan"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (WhatsApp)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 03001234567"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City (Shehar)</Label>
                    <Input
                      id="city"
                      placeholder="e.g. Burewala"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address (Ghar ka pata)</Label>
                    <Textarea
                      id="address"
                      placeholder="House no, Street, Area..."
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white h-12 text-lg font-bold">
                    Order on WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
