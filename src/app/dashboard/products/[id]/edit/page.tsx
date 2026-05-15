import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/ui/image-upload";
import { getCurrentUser } from "@/lib/auth-server";
import { getProductById } from "@/lib/products";
import { redirect } from "next/navigation";
import { updateProductAction, deleteProductAction } from "@/app/actions";

interface EditProductPageProps {
  params: { id: string }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const user = await getCurrentUser()
  
  if (!user || !user.farm) {
    redirect("/login")
  }
  
  const product = await getProductById(params.id)
  
  if (!product || product.farm.id !== user.farm.id) {
    redirect("/dashboard/products")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="mb-8 text-gray-600">Update your product information</p>

        <Card>
          <CardContent className="pt-6">
            <form action={updateProductAction.bind(null, params.id)} className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input id="name" name="name" defaultValue={product.name} required />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select name="category" defaultValue={product.category} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRODUCE">Produce (vegetables, fruits)</SelectItem>
                    <SelectItem value="EGGS">Eggs</SelectItem>
                    <SelectItem value="DAIRY">Dairy</SelectItem>
                    <SelectItem value="MEAT">Meat</SelectItem>
                    <SelectItem value="POULTRY">Poultry</SelectItem>
                    <SelectItem value="PLANTS">Plants</SelectItem>
                    <SelectItem value="COTTAGE_FOOD">Cottage Food</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price & Unit */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input 
                    id="price" 
                    name="price" 
                    type="number" 
                    step="0.01" 
                    defaultValue={product.price?.toString() || ""} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" name="unit" defaultValue={product.unit || ""} />
                </div>
              </div>

              {/* Product Image */}
              <ImageUpload
                label="Product Image"
                value={product.imageUrl || ""}
                onChange={(url) => {
                  // Store in hidden input for form submission
                  const input = document.getElementById("imageUrl") as HTMLInputElement
                  if (input) input.value = url
                }}
              />
              <input type="hidden" id="imageUrl" name="imageUrl" value={product.imageUrl || ""} />

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  defaultValue={product.description || ""}
                  rows={4}
                />
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select name="availability" defaultValue={product.availability || "AVAILABLE"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">Available</SelectItem>
                    <SelectItem value="LIMITED">Limited Availability</SelectItem>
                    <SelectItem value="SEASONAL">Seasonal</SelectItem>
                    <SelectItem value="SOLD_OUT">Sold Out</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isActive" 
                  name="isActive" 
                  defaultChecked={product.isActive ?? true} 
                />
                <Label htmlFor="isActive">Show on public page</Label>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/products">Cancel</Link>
                </Button>
              </div>
            </form>

            {/* Delete Form */}
            <form 
              action={async () => {
                "use server"
                await deleteProductAction(params.id)
              }}
              className="mt-6 pt-6 border-t"
            >
              <Button 
                type="submit" 
                variant="destructive"
                onClick={(e) => {
                  if (!confirm("Are you sure you want to delete this product?")) {
                    e.preventDefault()
                  }
                }}
              >
                Delete Product
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}