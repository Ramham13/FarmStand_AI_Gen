"use client";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  farmId: string;
  farmName: string;
  farmSlug: string;
  price: number;
  unit: string;
  imageUrl?: string;
}

export function AddToCartButton({
  productId,
  productName,
  farmId,
  farmName,
  farmSlug,
  price,
  unit,
  imageUrl,
}: AddToCartButtonProps) {
  const { addItem, items, setIsCartOpen } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const isInCart = items.some((item) => item.productId === productId);

  const handleAddToCart = () => {
    addItem({
      productId,
      productName,
      farmId,
      farmName,
      farmSlug,
      price,
      unit,
      imageUrl,
    });
    setJustAdded(true);
    toast.success(`${productName} added to cart`);
    setTimeout(() => setJustAdded(false), 2000);
  };

  if (justAdded || isInCart) {
    return (
      <Button
        variant="outline"
        onClick={() => setIsCartOpen(true)}
        className="w-full border-green-600 text-green-600 hover:bg-green-50 touch-manipulation"
      >
        <Check className="mr-2 h-4 w-4" />
        In Cart ({items.find((i) => i.productId === productId)?.quantity || 1})
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      className="w-full bg-green-600 hover:bg-green-700 touch-manipulation"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}