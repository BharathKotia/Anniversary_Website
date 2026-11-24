"use client";

import { useMemo } from "react";
import { anniversaryContent } from "@/data/anniversary";
import InfiniteMenu from "@/components/gallery/InfiniteMenu";
import SectionHeading from "@/components/ui/SectionHeading";

export default function GallerySection() {
  const { gallery } = anniversaryContent;
  const menuItems = useMemo(
    () =>
      gallery.map((photo) => ({
        image: photo.src,
        alt: photo.alt,
        description: photo.caption,
      })),
    [gallery]
  );

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

      <div className="absolute inset-0">
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
    </section>
  );
}
