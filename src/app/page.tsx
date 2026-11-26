"use client";

import { useState } from "react";
import Preloader from "@/components/layout/Preloader";
import StoryProgress from "@/components/layout/StoryProgress";
import OpeningSection from "@/components/sections/OpeningSection";
import BeginningSection from "@/components/sections/BeginningSection";
import GallerySection from "@/components/sections/GallerySection";
import LittleThingsSection from "@/components/sections/LittleThingsSection";
import LetterSection from "@/components/sections/LetterSection";
import CelebrationSection from "@/components/sections/CelebrationSection";
import FinalRevealSection from "@/components/sections/FinalRevealSection";
import { anniversaryContent } from "@/data/anniversary";
import { Heart } from "lucide-react";

export default function Home() {
  const { couple } = anniversaryContent;
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [isAnniversaryRevealed, setIsAnniversaryRevealed] = useState(false);

  return (
    <div className="relative min-h-screen bg-wine text-cream font-body selection:bg-gold selection:text-wine w-full" style={{ overflowX: "clip" }}>
      {/* ── Exact Expanding Circle & Floating Items Preloader ── */}
      <Preloader onComplete={() => setPreloaderComplete(true)} />

      {/* Story Progress Indicator */}
      <StoryProgress showCelebration={isAnniversaryRevealed} />

      {/* Main Experience Chapters */}
      <main className="w-full" style={{ overflowX: "clip" }}>
        {/* Hero Section with Text Reveal Animation */}
        <OpeningSection startAnimation={preloaderComplete} />
        <BeginningSection />
        <GallerySection />
        <LittleThingsSection />
        <LetterSection />
        <FinalRevealSection onReveal={() => setIsAnniversaryRevealed(true)} />
        {isAnniversaryRevealed && <CelebrationSection />}
      </main>

      {/* Elegant Footer */}
      <footer className="relative min-h-screen border-t border-gold/30 bg-wine flex flex-col items-center justify-center gap-10 px-4 sm:px-6 text-center w-full">
        {/* Subtle background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(201,168,108,0.1) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-xl space-y-4">
          <div className="flex items-center justify-center gap-2 text-gold">
            <Heart className="h-4 w-4 fill-gold" />
            <span className="font-display font-normal text-2xl tracking-wide text-cream">
              {couple.firstName} &amp; {couple.secondName}
            </span>
            <Heart className="h-4 w-4 fill-gold" />
          </div>

          <p className="font-body text-xs sm:text-sm text-cream/60 tracking-widest uppercase">
           27 November 2026 &bull; {couple.title}
          </p>

          <p className="font-handwritten text-xl text-gold">
            Crafted with love, written in moments
          </p>
        </div>

        {/* Creator credit */}
        <div className="relative mt-4 flex flex-col items-center gap-1.5">
          <div className="h-px w-20 bg-gold/50 mb-4" aria-hidden="true" />
          <p className="font-body text-xs text-cream/50 tracking-[0.25em] uppercase">
            Created with love by
          </p>
          <p className="font-display text-3xl sm:text-4xl text-gold font-normal">
            Bharath Raj
          </p>
          <p className="font-body text-sm text-cream/60 mt-1">
            for{" "}
            <span className="font-display text-xl text-cream font-normal">
              {couple.firstName}
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
