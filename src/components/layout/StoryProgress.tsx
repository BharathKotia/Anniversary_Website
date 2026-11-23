"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const chapters = [
  { id: "opening", label: "Opening" },
  { id: "beginning", label: "Where It Began" },
  { id: "gallery", label: "Memories" },
  { id: "timeline", label: "Our Journey" },
  { id: "little-things", label: "Little Things" },
  { id: "letter", label: "Letter" },
  { id: "celebration", label: "Celebration" },
  { id: "future", label: "Next Chapters" },
  { id: "final-reveal", label: "Surprise" },
];

export default function StoryProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > window.innerHeight * 0.5);

      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3"
          aria-label="Story progress"
          onMouseEnter={() => setShowLabels(true)}
          onMouseLeave={() => setShowLabels(false)}
        >
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              onClick={() => scrollToSection(chapter.id)}
              className="group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne rounded-full"
              aria-label={`Go to ${chapter.label}`}
              aria-current={index === activeIndex ? "step" : undefined}
            >
              <AnimatePresence>
                {showLabels && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className={cn(
                      "text-xs font-body whitespace-nowrap px-2 py-1 rounded-full transition-colors",
                      index === activeIndex
                        ? "text-deep-wine bg-dusty-rose/30"
                        : "text-deep-brown/50 bg-ivory/80"
                    )}
                  >
                    {chapter.label}
                  </motion.span>
                )}
              </AnimatePresence>
              <span
                className={cn(
                  "block rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-3 h-3 bg-deep-wine shadow-md shadow-deep-wine/30"
                    : "w-2 h-2 bg-champagne/40 group-hover:bg-champagne"
                )}
              />
            </button>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
