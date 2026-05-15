"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Get stored user data
  const [userData] = useState(() => {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : {}
  })
  
  // Form state
  const [farmName, setFarmName] = useState(userData.farm?.name || "")
  const [slug, setSlug] = useState(userData.farm?.slug || "")
  const [location, setLocation] = useState(userData.farm?.location || "")
  const [description, setDescription] = useState(userData.farm?.description || "")
  const [phone, setPhone] = useState(userData.farm?.phone || "")
  const [emoji, setEmoji] = useState(userData.farm?.emoji || "🏡")

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      // Update user data in localStorage
      const updatedUser = {
        ...userData,
        farm: { 
          ...userData.farm,
          name: farmName, 
          slug, 
          location, 
          description, 
          phone, 
          emoji 
        }
      }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      
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
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Set Up Your Farm</CardTitle>
            <CardDescription>Tell us about your farm</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">{error}</div>}
              
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name *</Label>
                <Input 
                  id="farmName" 
                  placeholder="Your farm name" 
                  value={farmName}
                  onChange={(e) => {
                    setFarmName(e.target.value)
                    if (!slug) setSlug(generateSlug(e.target.value))
                  }}
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
                  placeholder="Tell customers about your farm..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="emoji">Emoji</Label>
                  <Input 
                    id="emoji" 
                    placeholder="🏡"
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                    className="w-20"
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
                {loading ? "Setting up..." : "Complete Setup"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
