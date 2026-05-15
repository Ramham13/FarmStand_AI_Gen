"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Form state
  const [farmName, setFarmName] = useState("")
  const [slug, setSlug] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [acknowledge, setAcknowledge] = useState(false)
  
  // Step 2
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [emoji, setEmoji] = useState("🏡")
  const [paymentLink, setPaymentLink] = useState("")

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  }

  const handleFarmNameChange = (value: string) => {
    setFarmName(value)
    if (!slug || slug === generateSlug(slug)) {
      setSlug(generateSlug(value))
    }
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!acknowledge) {
      setError("Please accept the seller responsibility agreement")
      return
    }
    setError("")
    setStep(2)
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      // Get user from localStorage
      const userStr = localStorage.getItem("user")
      if (userStr) {
        const user = JSON.parse(userStr)
        user.farm = { name: farmName, slug, location, description, phone, email, emoji, paymentLink }
        localStorage.setItem("user", JSON.stringify(user))
      }
      router.push("/dashboard")
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            1
          </div>
          <div className={`h-0.5 w-16 ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`} />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
          <div className={`h-0.5 w-16 ${step >= 3 ? 'bg-green-600' : 'bg-gray-200'}`} />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            3
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Set Up Your Farm</CardTitle>
              <CardDescription>Step 1: Tell us about your farm</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStep1Submit} className="space-y-6">
                {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">{error}</div>}
                
                <div className="space-y-2">
                  <Label htmlFor="farmName">Farm Name *</Label>
                  <Input 
                    id="farmName" 
                    placeholder="Your farm name" 
                    value={farmName}
                    onChange={(e) => handleFarmNameChange(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug *</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">/farm/</span>
                    <Input 
                      id="slug" 
                      placeholder="your-farm-name" 
                      value={slug}
                      onChange={(e) => setSlug(generateSlug(e.target.value))}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input 
                    id="location" 
                    placeholder="City, State" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Farm Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Tell customers about your farm, what you grow, your farming practices..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Seller Acknowledgement */}
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="acknowledge" 
                      checked={acknowledge}
                      onCheckedChange={(checked) => setAcknowledge(checked as boolean)}
                    />
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
        )}

        {step === 2 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Set Up Your Farm</CardTitle>
              <CardDescription>Step 2: Add your contact info</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStep2Submit} className="space-y-6">
                {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">{error}</div>}
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    placeholder="(555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="you@farm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emoji">Farm Emoji</Label>
                  <Input 
                    id="emoji" 
                    placeholder="🏡"
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                    className="w-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentLink">Payment Link (Venmo, PayPal, etc.)</Label>
                  <Input 
                    id="paymentLink" 
                    placeholder="https://venmo.com/your-farm"
                    value={paymentLink}
                    onChange={(e) => setPaymentLink(e.target.value)}
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
                  {loading ? "Setting up..." : "Complete Setup"}
                  {!loading && <CheckCircle className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
