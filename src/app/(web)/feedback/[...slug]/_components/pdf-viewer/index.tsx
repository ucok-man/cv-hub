"use client";

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = { imageurls: string[] };

export default function PDFViewer({ imageurls }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(80);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageurls.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageurls.length) % imageurls.length
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setZoom(50); // Reset zoom when entering fullscreen
    }
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 150));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const resetZoom = () => {
    setZoom(80);
  };

  return (
    <div className="w-full max-w-2xl sticky top-8 z-50">
      <div
        className={`transition-all duration-300 ${
          isFullscreen ? "fixed inset-0 bg-background p-4" : "relative"
        }`}
      >
        <div
          className={`rounded-xl border border-border bg-linear-to-br from-primary/5 to-card shadow-lg overflow-hidden ${
            isFullscreen ? "h-full" : ""
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="p-2 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>

              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Page</span>
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  {currentIndex + 1}
                </span>
                <span className="text-sm text-muted-foreground">of</span>
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  {imageurls.length}
                </span>
              </div>

              <button
                onClick={nextSlide}
                disabled={currentIndex === imageurls.length - 1}
                className="p-2 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <button
                onClick={zoomOut}
                disabled={zoom <= 50}
                className="p-2 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={resetZoom}
                className="px-3 py-1 rounded-lg hover:bg-accent transition-colors text-xs font-medium text-muted-foreground min-w-[60px]"
              >
                {zoom}%
              </button>
              <button
                onClick={zoomIn}
                disabled={zoom >= 150}
                className="p-2 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="w-px h-6 bg-border mx-1"></div>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Document Viewer */}
          <div
            className={`bg-muted/30 overflow-auto scrollbar scrollbar-thumb-stone-700 scrollbar-track-card ${
              isFullscreen ? "h-[calc(100vh-10.5rem)]" : "h-[calc(100vh-12rem)]"
            }`}
          >
            <div
              className="flex items-center justify-center min-h-full p-4 transition-all duration-200 mx-auto"
              style={{
                width: `${zoom}%`,
                minWidth: "50%",
              }}
            >
              <div
                className="relative w-full h-full max-w-4xl mx-auto"
                style={{
                  aspectRatio: "8.5/11",
                  width: isFullscreen ? `${zoom}%` : undefined,
                  minWidth: isFullscreen ? "70%" : undefined,
                }}
              >
                <Image
                  src={imageurls[currentIndex]}
                  alt={`Page ${currentIndex + 1}`}
                  className="shadow-2xl object-contain object-center"
                  fill
                />
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
}
