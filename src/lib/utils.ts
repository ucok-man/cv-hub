import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  // Determine the appropriate unit by calculating the log
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Format with 2 decimal places and round
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseSlug(slug: string) {
  const arr = slug.split("-");
  const id = arr.pop() ?? "";
  const jobtitle = arr.join(" ");

  return { id, jobtitle };
}

export function titlecase(name: string) {
  const arr = name.split(" ");
  const clean = arr
    .map((text) => text[0].toUpperCase() + text.substring(1))
    .join(" ");
  return clean;
}
