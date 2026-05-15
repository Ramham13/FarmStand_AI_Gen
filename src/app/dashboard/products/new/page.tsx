import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function NewProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="mb-8 text-gray-600">List a new product for your farm stand</p>

        <Card>
          <CardContent className="pt-6">
            <form className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input id="name" placeholder="e.g., Farm Fresh Eggs" required />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRODUCE">Produce (vegetables, fruits)</SelectItem>
                    <SelectItem value="EGGS">Eggs</SelectItem>
                    <SelectItem value="DAIRY">Dairy (milk, cheese, butter)</SelectItem>
                    <SelectItem value="MEAT">Meat (beef, pork, poultry, lamb)</SelectItem>
                    <SelectItem value="POULTRY">Poultry (chickens, ducks, turkeys)</SelectItem>
                    <SelectItem value="LIVE_ANIMALS">Live Animals</SelectItem>
                    <SelectItem value="PLANTS">Plants (seedlings, perennials)</SelectItem>
                    <SelectItem value="SEEDS">Seeds</SelectItem>
                    <SelectItem value="COTTAGE_FOOD">Cottage Food (baked goods, honey)</SelectItem>
                    <SelectItem value="CRAFTS">Crafts (handmade farm items)</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price & Unit */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" placeholder="e.g., lb, dozen, each" />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Product Image URL</Label>
                <Input 
                  id="imageUrl" 
                  type="url"
                  placeholder="https://example.com/images/product.jpg" 
                />
                <p className="text-xs text-gray-500">Enter a URL to an image of your product</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your product (origin, growing method, etc.)" 
                  rows={4}
                />
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select defaultValue="AVAILABLE">
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
                <Checkbox id="isActive" defaultChecked />
                <Label htmlFor="isActive">Show on public page</Label>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Add Product
                </Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}