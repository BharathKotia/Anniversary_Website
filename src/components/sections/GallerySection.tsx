"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { anniversaryContent } from "@/data/anniversary";
import SectionHeading from "@/components/ui/SectionHeading";
import PhotoLightbox from "@/components/gallery/PhotoLightbox";

function PhotoPlaceholder({ featured }: { featured?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-dusty-rose/30 via-champagne/20 to-deep-wine/20",
        featured ? "min-h-[320px] md:min-h-[400px]" : "min-h-[220px] md:min-h-[280px]"
      )}
    >
      <Camera className="h-10 w-10 text-champagne/50 md:h-12 md:w-12" />
    </div>
  );
}

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-soft-white px-4 py-20 md:py-28 lg:py-32"
    >
      {/* Subtle decorative background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-dusty-rose/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Captured moments"
          title="Our Gallery"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5"
        >
          {gallery.map((photo, index) => {
            const isFeatured = photo.featured;
            const hasError = imageErrors.has(index);

            return (
              <motion.article
                key={`${photo.src}-${index}`}
                variants={itemVariants}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-lg",
                  isFeatured && "sm:col-span-2 sm:row-span-2"
                )}
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
                  <PhotoPlaceholder featured={isFeatured} />
                ) : (
                  <div
                    className={cn(
                      "relative w-full overflow-hidden",
                      isFeatured
                        ? "h-full min-h-[320px] md:min-h-[400px]"
                        : "h-full min-h-[220px] md:min-h-[280px]"
                    )}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={
                        isFeatured
                          ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 66vw"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      }
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={() => handleImageError(index)}
                    />
                  </div>
                )}

                {/* Overlay with caption */}
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-deep-brown/70 via-deep-brown/20 to-transparent p-4 transition-opacity duration-300 md:p-6",
                    "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                    hasError && "opacity-100"
                  )}
                >
                  <p className="font-display text-base font-medium text-soft-white md:text-lg">
                    {photo.caption}
                  </p>
                  <span className="mt-1 font-handwritten text-sm text-dusty-rose/90 md:text-base">
                    {photo.date}
                  </span>
                </div>

                {/* Focus ring */}
                <div className="pointer-events-none absolute inset-0 rounded-lg ring-champagne ring-offset-2 ring-offset-soft-white group-focus-visible:ring-2" />
              </motion.article>
            );
          })}
        </motion.div>
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
