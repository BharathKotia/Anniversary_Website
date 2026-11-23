import StoryProgress from "@/components/layout/StoryProgress";
import OpeningSection from "@/components/sections/OpeningSection";
import BeginningSection from "@/components/sections/BeginningSection";
import GallerySection from "@/components/sections/GallerySection";
import TimelineSection from "@/components/sections/TimelineSection";
import LittleThingsSection from "@/components/sections/LittleThingsSection";
import LetterSection from "@/components/sections/LetterSection";
import CelebrationSection from "@/components/sections/CelebrationSection";
import FutureSection from "@/components/sections/FutureSection";
import FinalRevealSection from "@/components/sections/FinalRevealSection";
import { anniversaryContent } from "@/data/anniversary";
import { Heart } from "lucide-react";

export default function Home() {
  const { couple } = anniversaryContent;

  return (
    <div className="relative min-h-screen bg-ivory text-deep-brown font-body selection:bg-dusty-rose selection:text-deep-brown">
      {/* Story Progress Indicator */}
      <StoryProgress />

      {/* Main Experience Chapters */}
      <main>
        <OpeningSection />
        <BeginningSection />
        <GallerySection />
        <TimelineSection />
        <LittleThingsSection />
        <LetterSection />
        <CelebrationSection />
        <FutureSection />
        <FinalRevealSection />
      </main>

      {/* Elegant Footer */}
      <footer className="relative min-h-screen border-t border-dusty-rose/20 bg-soft-white flex flex-col items-center justify-center gap-10 px-4 sm:px-6 text-center">
        {/* Subtle background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(232,201,193,0.18) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-xl space-y-4">
          <div className="flex items-center justify-center gap-2 text-deep-wine">
            <Heart className="h-4 w-4 fill-deep-wine" />
            <span className="font-display font-medium text-lg">
              {couple.firstName} &amp; {couple.secondName}
            </span>
            <Heart className="h-4 w-4 fill-deep-wine" />
          </div>

          <p className="font-body text-sm text-deep-brown/60">
            {couple.anniversaryDate} &bull; {couple.title}
          </p>

          <p className="font-handwritten text-lg text-champagne">
            Crafted with love, written in moments
          </p>
        </div>

        {/* Creator credit */}
        <div className="relative mt-4 flex flex-col items-center gap-1">
          <div className="h-px w-16 bg-champagne/40 mb-4" aria-hidden="true" />
          <p className="font-body text-xs text-deep-brown/40 tracking-wide uppercase">
            Created with love by
          </p>
          <p className="font-handwritten text-2xl md:text-3xl text-deep-wine/80">
            Bharath Raj
          </p>
          <p className="font-body text-sm text-deep-brown/50 mt-1">
            for{" "}
            <span className="font-display font-medium text-deep-wine/70">
              {couple.secondName}
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
