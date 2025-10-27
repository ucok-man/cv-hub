import { Providers } from "@/components/providers";
import "@/orpc/orpc.server";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { fonts } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "CVHub — AI-Powered CV & Resume Analyzer",
  description:
    "Optimize your CV and resume with CVHub, an AI-powered analyzer that helps you enhance content, structure, and keywords to stand out in job applications.",
  keywords: [
    "CV analyzer",
    "resume analyzer",
    "AI resume tool",
    "CV optimization",
    "AI job application",
    "resume improvement",
    "career tools",
  ],
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html className="dark" lang="en">
      <body className={`${fonts} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
