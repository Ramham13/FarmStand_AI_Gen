"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState(value || "");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await response.json();
      setPreviewUrl(data.url);
      onChange?.(data.url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreviewUrl(url);
    onChange?.(url);
  };

  const handleRemove = () => {
    setPreviewUrl("");
    onChange?.("");
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      
      {previewUrl ? (
        <div className="relative rounded-lg overflow-hidden bg-gray-100 border">
          <div className="relative h-48 w-full">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
            >
              <X className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="flex-1"
            />
            {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">Or enter image URL below</p>
          </div>
          
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            onChange={handleUrlChange}
          />
          
          {error && <p className="text-sm text-red-500">{error}</p>}
          <p className="text-xs text-gray-500">Supported formats: JPEG, PNG, WebP, GIF. Max size: 5MB</p>
        </div>
      )}
    </div>
  );
}
