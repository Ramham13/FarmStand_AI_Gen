"use client";

import { useCart, CartItem } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

function CartItemRow({ item, onUpdateQuantity, onRemove }: { item: CartItem; onUpdateQuantity: (qty: number) => void; onRemove: () => void }) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
      {item.imageUrl && (
        <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
          <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" sizes="80px" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{item.productName}</h3>
        <p className="text-sm text-gray-500">{item.farmName}</p>
        <p className="text-lg font-semibold text-green-700 mt-1">
          ${item.price.toFixed(2)} per {item.unit}
        </p>
      </div>
      <div className="flex flex-col justify-between items-end">
        <button 
          onClick={onRemove} 
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full touch-manipulation"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-2">
          <button
            onClick={() => onUpdateQuantity(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center text-base font-medium">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 touch-manipulation"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    const farms = [...new Set(items.map((i) => i.farmSlug))];
    if (farms.length === 1) {
      window.location.href = `/checkout`;
    } else {
      toast.warning("Checkout is only available for a single farm at a time. Please checkout farm by farm.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/explore" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 touch-manipulation">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
        
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <ShoppingBag className="w-7 h-7" />
          Your Cart ({items.length})
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-500 mb-6">Your cart is empty</p>
            <Link href="/explore">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Browse Farms
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemRow
                key={item.productId}
                item={item}
                onUpdateQuantity={(qty) => updateQuantity(item.productId, qty)}
                onRemove={() => removeItem(item.productId)}
              />
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span className="text-green-700">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500">
              Checkout will redirect to the farm&apos;s payment page
            </p>
            
            <Button 
              onClick={handleCheckout} 
              className="w-full bg-green-600 hover:bg-green-700 touch-manipulation text-base py-6"
              size="lg"
            >
              Proceed to Checkout
            </Button>
            
            <button 
              onClick={clearCart} 
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4 py-2 touch-manipulation"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
