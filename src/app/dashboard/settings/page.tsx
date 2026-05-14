import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function FarmSettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Farm Settings</h1>
        <p className="mb-8 text-gray-600">Manage your farm profile and settings</p>

        <div className="space-y-6">
          {/* Farm Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Farm Profile</CardTitle>
              <CardDescription>Basic information about your farm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Farm Name *</Label>
                <Input id="name" defaultValue="Sunny Acres Farm" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">/farm/</span>
                  <Input id="slug" defaultValue="sunny-acres" required />
                </div>
                <p className="text-xs text-gray-500">Your farm page: /farm/sunny-acres</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" defaultValue="Portland, OR" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue="Family-owned farm specializing in organic vegetables and free-range eggs."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How customers can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="(503) 555-0123" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="hello@sunnyacres.farm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" placeholder="https://yourfarm.com" />
              </div>
            </CardContent>
          </Card>

          {/* Payment & Links */}
          <Card>
            <CardHeader>
              <CardTitle>Payment & External Links</CardTitle>
              <CardDescription>Where customers can pay or learn more</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paymentLink">Payment Link</Label>
                <Input 
                  id="paymentLink" 
                  type="url" 
                  placeholder="https://venmo.com/yourfarm"
                  defaultValue="https://venmo.com/sunnyacres"
                />
                <p className="text-xs text-gray-500">
                  Link to your Venmo, PayPal, or other payment service
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="externalSite">External Website</Label>
                <Input 
                  id="externalSite" 
                  type="url" 
                  placeholder="https://yourfarm.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Visibility */}
          <Card>
            <CardHeader>
              <CardTitle>Visibility</CardTitle>
              <CardDescription>Control who can see your farm</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isPublic">Public Listing</Label>
                  <p className="text-sm text-gray-500">Allow your farm to appear in search results</p>
                </div>
                <Switch id="isPublic" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}