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
        "flex w-full items-center justify-center rounded-xl bg-gradient-to-br from-wine via-wine/80 to-gold/20 border border-gold/30",
        aspectClass
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Camera className="h-10 w-10 text-gold/60 md:h-12 md:w-12" />
        <span className="font-handwritten text-sm text-cream/50">A captured moment</span>
      </div>
    </div>
  );
}

/** Aspect ratio patterns for true masonry diversity */
const ASPECT_CLASSES = [
  "aspect-[3/4]", // Portrait
  "aspect-[4/5]", // Tall Portrait
  "aspect-[1/1]", // Square
  "aspect-[4/3]", // Landscape
  "aspect-[3/4]", // Portrait
  "aspect-[1/1]", // Square
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
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const },
    }),
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-wine py-24 md:py-32 lg:py-40 overflow-hidden text-center"
      aria-label="Photo Gallery"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(201,168,108,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <SectionHeading
          eyebrow="Captured moments"
          title="Our Gallery"
          subtitle="Glimpses of love, laughter, and every little moment in between."
          light={true}
        />

        {/* ── Native CSS Multi-Column Masonry (100% centered, responsive, zero overflow) ── */}
        <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] text-left">
          {gallery.map((photo, index) => {
            const hasError = imageErrors.has(index);
            const aspectClass = ASPECT_CLASSES[index % ASPECT_CLASSES.length];

            return (
              <div key={`${photo.src}-${index}`} className="break-inside-avoid mb-6 w-full">
                <motion.article
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-gold/30 bg-wine/70 shadow-xl transition-all duration-500 hover:border-gold hover:shadow-2xl hover:scale-[1.02]"
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
                    <div className={cn("relative w-full overflow-hidden bg-wine/40", aspectClass)}>
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

                  {/* Caption Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-wine/95 via-wine/40 to-transparent p-5 transition-opacity duration-300",
                      "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                      hasError && "opacity-100"
                    )}
                  >
                    <p className="font-display text-lg font-normal text-cream">
                      {photo.caption}
                    </p>
                    <span className="mt-1 font-handwritten text-base text-gold">
                      {photo.date}
                    </span>
                  </div>

                  {/* Focus ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-gold ring-offset-2 ring-offset-wine group-focus-visible:ring-2" />
                </motion.article>
              </div>
            );
          })}
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
