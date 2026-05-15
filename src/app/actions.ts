"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth-server"
import { getProductById, createProduct, updateProduct, deleteProduct } from "@/lib/products"

export async function createProductAction(formData: FormData) {
  const user = await getCurrentUser()
  
  if (!user || !user.farm) {
    throw new Error("Unauthorized")
  }
  
  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const description = formData.get("description") as string
  const price = formData.get("price") as string
  const unit = formData.get("unit") as string
  const imageUrl = formData.get("imageUrl") as string
  const availability = formData.get("availability") as string
  const isActive = formData.get("isActive") === "on"

  if (!name || !category) {
    throw new Error("Name and category are required")
  }

  await createProduct({
    farmId: user.farm.id,
    name,
    category,
    description: description || undefined,
    price: price ? parseFloat(price) : undefined,
    unit: unit || undefined,
    imageUrl: imageUrl || undefined,
    availability: availability || "AVAILABLE",
    isActive,
  })

  revalidatePath("/dashboard/products")
  revalidatePath("/products")
  redirect("/dashboard/products")
}

export async function updateProductAction(productId: string, formData: FormData) {
  const user = await getCurrentUser()
  
  if (!user || !user.farm) {
    throw new Error("Unauthorized")
  }
  
  // Verify product belongs to user's farm
  const product = await getProductById(productId)
  if (!product || product.farm.id !== user.farm.id) {
    throw new Error("Product not found")
  }
  
  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const description = formData.get("description") as string
  const price = formData.get("price") as string
  const unit = formData.get("unit") as string
  const imageUrl = formData.get("imageUrl") as string
  const availability = formData.get("availability") as string
  const isActive = formData.get("isActive") === "on"

  await updateProduct(productId, {
    name,
    category,
    description: description || undefined,
    price: price ? parseFloat(price) : undefined,
    unit: unit || undefined,
    imageUrl: imageUrl || undefined,
    availability: availability || "AVAILABLE",
    isActive,
  })

  revalidatePath("/dashboard/products")
  revalidatePath("/dashboard/products/[id]/edit")
  revalidatePath("/products")
  redirect("/dashboard/products")
}

export async function deleteProductAction(productId: string) {
  const user = await getCurrentUser()
  
  if (!user || !user.farm) {
    throw new Error("Unauthorized")
  }

  // Verify product belongs to user's farm
  const product = await getProductById(productId)
  if (!product || product.farm.id !== user.farm.id) {
    throw new Error("Product not found")
  }

  await deleteProduct(productId)

  revalidatePath("/dashboard/products")
  revalidatePath("/products")
  redirect("/dashboard/products")
}
