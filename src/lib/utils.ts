import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Simple slugify utility – lowercases, replaces spaces with hyphens,
 * removes non‑alphanumeric characters (except hyphens), and trims.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^a-z0-9-]/g, "") // Remove all non‑alphanumeric chars except -
    .replace(/-+/g, "-") // Collapse multiple -
}
