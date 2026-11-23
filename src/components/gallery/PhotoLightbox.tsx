"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/anniversary";
import Image from "next/image";

interface PhotoLightboxProps {
  images: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PhotoLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: PhotoLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const current = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (hasPrev) onPrev();
          break;
        case "ArrowRight":
          if (hasNext) onNext();
          break;
      }
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  // Prevent background scrolling
  useEffect(() => {
    document.body.classList.add("lightbox-open");
    return () => {
      document.body.classList.remove("lightbox-open");
    };
  }, []);

  // Keyboard listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Focus trap
  useEffect(() => {
    closeButtonRef.current?.focus();

    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleFocusTrap = (e: FocusEvent) => {
      if (!overlay.contains(e.target as Node)) {
        e.stopPropagation();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("focus", handleFocusTrap, true);
    return () => document.removeEventListener("focus", handleFocusTrap, true);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo lightbox: ${current?.caption}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-deep-brown/90 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-4 right-4 z-10 rounded-full bg-deep-brown/60 p-2.5 text-soft-white/80 transition-colors hover:bg-deep-brown hover:text-soft-white focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne md:top-6 md:right-6"
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Previous button */}
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label="Previous photo"
          className={cn(
            "absolute left-2 z-10 rounded-full bg-deep-brown/60 p-2.5 text-soft-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne md:left-6",
            hasPrev
              ? "hover:bg-deep-brown hover:text-soft-white"
              : "cursor-not-allowed opacity-30"
          )}
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Next button */}
        <button
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next photo"
          className={cn(
            "absolute right-2 z-10 rounded-full bg-deep-brown/60 p-2.5 text-soft-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne md:right-6",
            hasNext
              ? "hover:bg-deep-brown hover:text-soft-white"
              : "cursor-not-allowed opacity-30"
          )}
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Image + Caption container */}
        <AnimatePresence mode="wait">
          <motion.figure
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex max-h-[85vh] w-full max-w-5xl flex-col items-center px-12 md:px-20"
          >
            <div className="relative w-full overflow-hidden rounded-lg" style={{ maxHeight: "70vh" }}>
              <Image
                src={current.src}
                alt={current.alt}
                width={1200}
                height={800}
                className="h-auto max-h-[70vh] w-full rounded-lg object-contain"
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1024px"
              />
            </div>
            <figcaption className="mt-4 text-center md:mt-6">
              <p className="font-display text-lg text-soft-white md:text-xl">
                {current.caption}
              </p>
              <p className="mt-1 font-handwritten text-base text-dusty-rose/80 md:text-lg">
                {current.date}
              </p>
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-sm text-soft-white/50 md:bottom-6">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
