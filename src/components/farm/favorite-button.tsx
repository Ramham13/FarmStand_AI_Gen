"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"

interface FavoriteButtonProps {
  farmId: string
  farmSlug?: string
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function FavoriteButton({ 
  farmId, 
  farmSlug,
  size = "md",
  showLabel = false 
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isToggling, setIsToggling] = useState(false)

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch("/api/favorites")
        if (res.ok) {
          const data = await res.json()
          if (data.favorites) {
            const favorited = data.favorites.some((f: any) => f.farmId === farmId)
            setIsFavorited(favorited)
          }
        }
      } catch (e) {
        console.error("Error checking favorite:", e)
      } finally {
        setIsLoading(false)
      }
    }

    checkFavorite()
  }, [farmId])

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isToggling || isLoading) return
    setIsToggling(true)

    try {
      if (isFavorited) {
        // Remove from favorites
        const res = await fetch(`/api/favorites?farmId=${farmId}`, {
          method: "DELETE",
        })
        if (res.ok) {
          setIsFavorited(false)
        }
      } else {
        // Add to favorites
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ farmId }),
        })
        if (res.ok) {
          setIsFavorited(true)
        }
      }
    } catch (e) {
      console.error("Error toggling favorite:", e)
    } finally {
      setIsToggling(false)
    }
  }

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  if (isLoading) {
    return (
      <button
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-colors animate-pulse`}
        disabled
      >
        <Heart size={iconSizes[size]} className="currentColor" />
      </button>
    )
  }

  return (
    <button
      onClick={handleToggle}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-colors ${
        isFavorited 
          ? "bg-red-50 text-red-500 hover:bg-red-100" 
          : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white"
      } ${isToggling ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart 
        size={iconSizes[size]} 
        className={isFavorited ? "fill-current" : "currentColor"} 
      />
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isFavorited ? "Saved" : "Save"}
        </span>
      )}
    </button>
  )
}
