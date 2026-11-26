"use client";

import { useEffect, useMemo, useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { anniversaryContent } from "@/data/anniversary";
import InfiniteMenu from "@/components/gallery/InfiniteMenu";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export default function GallerySection() {
  const { gallery } = anniversaryContent;
  const [isMobileLocked, setIsMobileLocked] = useState(false);

  const menuItems = useMemo(
    () =>
      gallery.map((photo) => ({
        image: photo.src,
        alt: photo.alt,
        description: photo.caption,
      })),
    [gallery]
  );

  /* Lock page scroll on mobile while user interacts with the 3D gallery */
  useEffect(() => {
    if (!isMobileLocked) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileLocked]);

  return (
    <section
      id="gallery"
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-wine text-center"
      aria-label="Photo Gallery"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(201,168,108,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        className={cn(
          "absolute inset-0 md:pointer-events-auto",
          isMobileLocked ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <InfiniteMenu
            items={menuItems}
            count={160}
            tileSize={0.63}
            roundness={0.2}
            zoom={1.65}
            pullBack={1}
            stretch={0.6}
            inertia={0.6}
            autoplay={3}
            grayscale
            dim={0.5}
            intro
            showInfo
            theme="dark"
            accentColor="#ffffff"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-8 z-10 px-4 sm:top-10">
        <SectionHeading
          eyebrow="Captured moments"
          title="Our Gallery"
          light
            className="!mb-0"
        />
      </div>

      {/* Mobile-only Scroll Lock / Interact Toggle (Icon Button + Tooltip on Top) */}
      <div className="md:hidden absolute bottom-5 right-4 z-30 flex flex-col items-end gap-2">
        {/* Tooltip label on top */}
        <div
          role="tooltip"
          className={cn(
            "pointer-events-none relative rounded-lg px-3 py-1.5 text-[11px] font-body font-medium tracking-wider uppercase shadow-lg backdrop-blur-md whitespace-nowrap transition-all duration-300",
            isMobileLocked
              ? "bg-gold text-wine border border-gold-bright"
              : "bg-wine/90 text-cream border border-gold/45"
          )}
        >
          <span>{isMobileLocked ? "Back to Scroll" : "Tap to Lock & Explore"}</span>
          {/* Tooltip arrow pointing down to icon button */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute -bottom-1 right-4 h-2 w-2 rotate-45 border-r border-b",
              isMobileLocked
                ? "bg-gold border-gold-bright"
                : "bg-wine/90 border-gold/45"
            )}
          />
        </div>

        {/* Icon-only button */}
        <button
          type="button"
          onClick={() => setIsMobileLocked((prev) => !prev)}
          aria-pressed={isMobileLocked}
          aria-label={isMobileLocked ? "Back to Scroll" : "Tap to Lock & Explore"}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full shadow-xl transition-all duration-300 backdrop-blur-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
            isMobileLocked
              ? "bg-gold text-wine border border-gold-bright scale-105"
              : "bg-wine/90 text-gold border border-gold/50 hover:border-gold"
          )}
        >
          {isMobileLocked ? (
            <Unlock className="h-4 w-4" />
          ) : (
            <Lock className="h-4 w-4" />
          )}
        </button>
      </div>
    </section>
  );
}
