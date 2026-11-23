"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { anniversaryContent } from "@/data/anniversary";
import SectionHeading from "@/components/ui/SectionHeading";
import PhotoLightbox from "@/components/gallery/PhotoLightbox";

function PhotoPlaceholder({ aspectClass }: { aspectClass: string }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-xl bg-gradient-to-br from-dusty-rose/30 via-champagne/20 to-deep-wine/20",
        aspectClass
      )}
    >
      <Camera className="h-10 w-10 text-champagne/50 md:h-12 md:w-12" />
    </div>
  );
}

/** Masonry column assignments — 6 photos across 3 columns */
const COLUMN_ASSIGNMENTS: Record<number, number[]> = {
  3: [0, 1, 2, 0, 1, 2],
  2: [0, 1, 0, 1, 0, 1],
  1: [0, 0, 0, 0, 0, 0],
};

/** Different aspect ratios to give masonry variety */
const ASPECT_CLASSES = [
  "aspect-[3/4]",   // tall portrait
  "aspect-[4/5]",   // portrait
  "aspect-[1/1]",   // square
  "aspect-[4/3]",   // landscape
  "aspect-[3/4]",   // tall portrait
  "aspect-[1/1]",   // square
];

export default function GallerySection() {
  const { gallery } = anniversaryContent;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null && prev < gallery.length - 1 ? prev + 1 : prev
    );
  }, [gallery.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : prev
    );
  }, []);

  const handleImageError = useCallback((index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
    }),
  };

  /** Build 3 masonry columns */
  const columns = [0, 1, 2].map((colIdx) =>
    gallery
      .map((photo, i) => ({ photo, i }))
      .filter(({ i }) => COLUMN_ASSIGNMENTS[3][i % gallery.length] === colIdx)
  );

  const renderPhoto = (photo: (typeof gallery)[0], index: number) => {
    const hasError = imageErrors.has(index);
    const aspectClass = ASPECT_CLASSES[index % ASPECT_CLASSES.length];

    return (
      <motion.article
        key={`${photo.src}-${index}`}
        custom={index}
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="group relative cursor-pointer overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
        onClick={() => openLightbox(index)}
        role="button"
        tabIndex={0}
        aria-label={`View photo: ${photo.caption}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLightbox(index);
          }
        }}
      >
        {hasError ? (
          <PhotoPlaceholder aspectClass={aspectClass} />
        ) : (
          <div className={cn("relative w-full overflow-hidden", aspectClass)}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onError={() => handleImageError(index)}
            />
          </div>
        )}

        {/* Caption overlay */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-deep-brown/70 via-deep-brown/20 to-transparent p-4 transition-opacity duration-300",
            "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
            hasError && "opacity-100"
          )}
        >
          <p className="font-display text-sm font-medium text-soft-white md:text-base">
            {photo.caption}
          </p>
          <span className="mt-0.5 font-handwritten text-xs text-dusty-rose/90 md:text-sm">
            {photo.date}
          </span>
        </div>

        {/* Focus ring */}
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-champagne ring-offset-2 ring-offset-soft-white group-focus-visible:ring-2" />
      </motion.article>
    );
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen overflow-hidden bg-soft-white py-20 md:py-28 lg:py-32"
    >
      {/* Subtle decorative background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-dusty-rose/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Captured moments" title="Our Gallery" />

        {/* ── Masonry grid: 1 col mobile → 2 col sm → 3 col lg ── */}
        <div className="hidden lg:flex gap-4 items-start">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-4">
              {col.map(({ photo, i }) => renderPhoto(photo, i))}
            </div>
          ))}
        </div>

        {/* 2-column masonry for sm–lg */}
        <div className="hidden sm:flex lg:hidden gap-4 items-start">
          {[0, 1].map((colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-4">
              {gallery
                .map((photo, i) => ({ photo, i }))
                .filter(({ i }) => COLUMN_ASSIGNMENTS[2][i % gallery.length] === colIdx)
                .map(({ photo, i }) => renderPhoto(photo, i))}
            </div>
          ))}
        </div>

        {/* Single-column for mobile */}
        <div className="flex sm:hidden flex-col gap-4">
          {gallery.map((photo, i) => renderPhoto(photo, i))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          images={gallery}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </section>
  );
}
