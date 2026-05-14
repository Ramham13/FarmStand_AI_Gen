import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-medium text-white">
            1
          </div>
          <div className="h-0.5 w-16 bg-green-600" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-500">
            2
          </div>
          <div className="h-0.5 w-16 bg-gray-200" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-500">
            3
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Set Up Your Farm</CardTitle>
            <CardDescription>Step 1: Tell us about your farm</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name *</Label>
                <Input id="farmName" placeholder="Your farm name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">/farm/</span>
                  <Input id="slug" placeholder="your-farm-name" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" placeholder="City, State" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Farm Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Tell customers about your farm, what you grow, your farming practices..."
                  rows={4}
                />
              </div>

              {/* Seller Acknowledgement */}
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start space-x-2">
                  <Checkbox id="acknowledge" required />
                  <Label htmlFor="acknowledge" className="text-sm font-normal">
                    <span className="font-semibold">Seller Responsibility Agreement *</span>
                    <p className="mt-1 text-xs text-amber-800">
                      I acknowledge that I am responsible for complying with all applicable local 
                      regulations regarding food safety, labeling, and sales. I understand that 
                      Virtual Farm Stand does not process payments and that all transactions are 
                      directly between me and my customers. I agree to handle customer data responsibly 
                      and maintain transparency in my listings.
                    </p>
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}