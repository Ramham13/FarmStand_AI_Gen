'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { ImageUpload } from '@/components/ui/image-upload'

interface FarmData {
  id: string
  name: string
  slug: string
  description: string | null
  location: string | null
  phone: string | null
  email: string | null
  website: string | null
  paymentLink: string | null
  imageUrl: string | null
  status: string
}

const defaultFarmData: FarmData = {
  id: '',
  name: '',
  slug: '',
  description: '',
  location: '',
  phone: '',
  email: '',
  website: '',
  paymentLink: '',
  imageUrl: '',
  status: 'ACTIVE',
}

export default function FarmSettingsPage() {
  const [formData, setFormData] = useState<FarmData>(defaultFarmData)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasFarm, setHasFarm] = useState(true)

  useEffect(() => {
    async function fetchFarmData() {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const userData = await response.json()
          if (userData.farm?.slug) {
            const farmResponse = await fetch(`/api/farms/${userData.farm.slug}`)
            if (farmResponse.ok) {
              const farm = await farmResponse.json()
              setFormData({
                id: farm.id || '',
                name: farm.name || '',
                slug: farm.slug || '',
                description: farm.description || '',
                location: farm.location || '',
                phone: farm.phone || '',
                email: farm.email || '',
                website: farm.website || '',
                paymentLink: farm.paymentLink || '',
                imageUrl: farm.imageUrl || '',
                status: farm.status || 'ACTIVE',
              })
              setHasFarm(true)
            } else {
              setHasFarm(false)
            }
          } else {
            setHasFarm(false)
          }
        } else {
          setHasFarm(false)
        }
      } catch (e) {
        console.error('Error fetching farm data:', e)
        setHasFarm(false)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFarmData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPublic: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch(`/api/farms/${formData.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          location: formData.location,
          phone: formData.phone,
          email: formData.email,
          website: formData.website,
          paymentLink: formData.paymentLink,
          imageUrl: formData.imageUrl,
          status: formData.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
        }),
      })

      if (response.ok) {
        toast.success('Settings saved successfully!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving farm settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!hasFarm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Farm Settings</h1>
          <p className="mb-8 text-gray-600">Manage your farm profile and settings</p>
          
          <Card>
            <CardHeader>
              <CardTitle>No Farm Found</CardTitle>
              <CardDescription>Create your farm to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">You don't have a farm yet. Complete onboarding to create your farm.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Farm Settings</h1>
        <p className="mb-8 text-gray-600">Manage your farm profile and settings</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Farm Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Farm Profile</CardTitle>
              <CardDescription>Basic information about your farm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Farm Name *</Label>
                <Input id="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">/farm/</span>
                  <Input id="slug" value={formData.slug || ''} onChange={handleChange} required />
                </div>
                <p className="text-xs text-gray-500">Your farm page: /farm/{formData.slug}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" value={formData.location || ''} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={formData.description || ''} 
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Farm Cover Image</Label>
                <ImageUpload
                  value={formData.imageUrl || ''}
                  onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
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
                <Input id="phone" type="tel" value={formData.phone || ''} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email || ''} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  type="url" 
                  placeholder="https://yourfarm.com"
                  value={formData.website || ''} 
                  onChange={handleChange}
                />
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
                  value={formData.paymentLink || ''} 
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500">
                  Link to your Venmo, PayPal, or other payment service
                </p>
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
                <Switch 
                  id="isPublic" 
                  checked={formData.status === 'ACTIVE'} 
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, status: checked ? 'ACTIVE' : 'INACTIVE' }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}