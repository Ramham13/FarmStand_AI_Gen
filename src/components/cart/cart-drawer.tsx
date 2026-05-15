"use client";

import { useCart, CartItem } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CartItemRow({ item, onUpdateQuantity, onRemove }: { item: CartItem; onUpdateQuantity: (qty: number) => void; onRemove: () => void }) {
  return (
    <div className="flex gap-3 py-3 border-b border-gray-100">
      {item.imageUrl && (
        <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
          <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" sizes="64px" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.productName}</h4>
        <p className="text-xs text-gray-500">{item.farmName}</p>
        <p className="text-sm font-semibold mt-1">
          ${item.price.toFixed(2)}/{item.unit}
        </p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button onClick={onRemove} className="text-gray-400 hover:text-red-500 p-1" aria-label="Remove item">
          <Trash2 className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
          <button
            onClick={() => onUpdateQuantity(item.quantity - 1)}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 touch-manipulation"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-6 text-center text-sm">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 touch-manipulation"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    // Get unique farms in cart
    const farms = [...new Set(items.map((i) => i.farmSlug))];
    if (farms.length === 1) {
      // Redirect to checkout page
      window.location.href = `/checkout`;
    } else {
      alert("Checkout is only available for a single farm at a time. Please checkout farm by farm.");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({items.length})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Your cart is empty</p>
              <Link
                href="/explore"
                className="text-green-600 hover:underline mt-2 inline-block"
                onClick={() => setIsCartOpen(false)}
              >
                Browse farms
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
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
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500">
              Checkout will redirect to the farm&apos;s payment page
            </p>
            <Button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 touch-manipulation"
              size="lg"
            >
              Checkout
            </Button>
            <button
              onClick={clearCart}
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}