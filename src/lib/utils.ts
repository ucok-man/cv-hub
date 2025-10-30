import { clsx, type ClassValue } from "clsx";
import { AlertTriangle, CheckCircle, Medal, XCircle } from "lucide-react";
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

export function scoreStyle(score: number) {
  if (score >= 85) {
    return {
      icon: Medal,
      gradient: "from-emerald-900/10",
      border: "border-emerald-800/50",
      iconBg: "bg-emerald-900/30",
      iconColor: "text-emerald-400",
      labelColor: "text-emerald-300",
      label: "Excellent",
    };
  } else if (score >= 70) {
    return {
      icon: CheckCircle,
      gradient: "from-lime-900/10",
      border: "border-lime-800/50",
      iconBg: "bg-lime-900/30",
      iconColor: "text-lime-400",
      labelColor: "text-lime-300",
      label: "Strong",
    };
  } else if (score >= 50) {
    return {
      icon: AlertTriangle,
      gradient: "from-amber-900/10",
      border: "border-amber-800/50",
      iconBg: "bg-amber-900/30",
      iconColor: "text-amber-400",
      labelColor: "text-amber-300",
      label: "Good Start",
    };
  } else {
    return {
      icon: XCircle,
      gradient: "from-rose-900/10",
      border: "border-rose-800/50",
      iconBg: "bg-rose-900/30",
      iconColor: "text-rose-400",
      labelColor: "text-rose-300",
      label: "Needs Work",
    };
  }
}
