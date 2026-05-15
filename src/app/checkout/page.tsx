"use client";

import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ShoppingBag, Loader2, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FarmInfo {
  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [farmInfo, setFarmInfo] = useState<FarmInfo | null>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    message: "",
  });

  // Fetch farm info from API when farmSlug is available
  useEffect(() => {
    if (items.length > 0) {
      const farm = items[0];
      // Set initial farm name/slug from cart
      setFarmInfo({
        name: farm.farmName,
        slug: farm.farmSlug,
        email: null,
        phone: null,
        address: null,
      });
      
      // Fetch full farm details (including contact info) from API
      fetch(`/api/farms/${farm.farmSlug}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            setFarmInfo({
              name: data.name || farm.farmName,
              slug: farm.farmSlug,
              email: data.email || null,
              phone: data.phone || null,
              address: data.location || null,
            });
          }
        })
        .catch(console.error);
    }
  }, [items]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/explore");
    }
  }, [items, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone || undefined,
          message: formData.message || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process checkout");
      }

      // Clear cart and redirect to confirmation (include farm slug for contact info)
      clearCart();
      const farmSlug = farmInfo?.slug || '';
      router.push(`/checkout/confirmation?orderId=${data.orderId}&farm=${farmSlug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/explore" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 order-2 md:order-1">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-green-600" />
              Order Summary
            </h2>

            {/* Farm Info */}
            {farmInfo && (
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-500">Order from</p>
                <p className="font-medium text-lg">{farmInfo.name}</p>
              </div>
            )}

            {/* Cart Items */}
            <div className="space-y-4 mb-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  {item.imageUrl && (
                    <div className="w-14 h-14 relative rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" sizes="56px" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.productName}</h4>
                    <p className="text-xs text-gray-500">
                      ${item.price.toFixed(2)}/{item.unit} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 order-1 md:order-2">
            <h2 className="font-semibold text-lg mb-4">Your Information</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="customerName">Name *</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label htmlFor="customerEmail">Email *</Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="customerPhone">Phone (optional)</Label>
                <Input
                  id="customerPhone"
                  name="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="message">Message to Farmer (optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any special requests or questions..."
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700 touch-manipulation"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Reservation
                  </>
                )}
              </Button>
            </form>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t text-sm text-gray-500">
              <p className="mb-2 font-medium text-gray-700">Questions? Contact the farm:</p>
              <div className="space-y-2">
                {farmInfo?.email && (
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-600" />
                    <a href={`mailto:${farmInfo.email}`} className="text-green-600 hover:underline">
                      {farmInfo.email}
                    </a>
                  </p>
                )}
                {farmInfo?.phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    <a href={`tel:${farmInfo.phone}`} className="text-green-600 hover:underline">
                      {farmInfo.phone}
                    </a>
                  </p>
                )}
                {farmInfo?.address && (
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    {farmInfo.address}
                  </p>
                )}
                {!farmInfo?.email && !farmInfo?.phone && !farmInfo?.address && (
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Farm location details will be in confirmation email
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
