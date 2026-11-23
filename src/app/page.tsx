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
      <footer className="relative border-t border-dusty-rose/20 bg-soft-white py-12 px-6 text-center">
        <div className="mx-auto max-w-xl space-y-4">
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
      </footer>
    </div>
  );
}
