"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { anniversaryContent } from "@/data/anniversary";
import SectionHeading from "@/components/ui/SectionHeading";

export default function LittleThingsSection() {
  const { littleThings } = anniversaryContent;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  return (
    <section
      id="little-things"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-28 sm:py-36 md:py-44 bg-wine overflow-hidden text-center"
      aria-label="The Little Things"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201,168,108,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <SectionHeading
          eyebrow="What makes us, us"
          title="The Little Things"
          subtitle="The quiet habits, the shared jokes, and the everyday moments that mean the most."
          light={true}
        />

        {/* User interaction guide */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-5 py-2 text-xs font-body tracking-[0.2em] uppercase text-gold/90"
        >
          <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" />
          <span>Hover over a card to reveal</span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {littleThings.map((thing, index) => {
            const isRevealed =
              hoveredIndex === index ||
              tappedIndex === index ||
              focusedIndex === index;

            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="flex"
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isRevealed}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") {
                      setHoveredIndex(index);
                    }
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") {
                      setHoveredIndex(null);
                    }
                  }}
                  onClick={() => {
                    if (hoveredIndex !== index) {
                      setTappedIndex((prev) => (prev === index ? null : index));
                    }
                  }}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setTappedIndex((prev) => (prev === index ? null : index));
                    }
                  }}
                  className={cn(
                    "relative w-full min-h-[200px] sm:min-h-[220px] rounded-xl p-7 sm:p-8 flex flex-col justify-between text-left cursor-pointer select-none",
                    "bg-wine/80 border shadow-lg shadow-black/20",
                    "transition-all duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    isRevealed
                      ? "border-gold shadow-2xl shadow-gold/15 -translate-y-1 bg-wine"
                      : "border-gold/30 hover:border-gold/70"
                  )}
                >
                  {/* Subtle inner glow on reveal */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-500",
                      isRevealed ? "opacity-100" : "opacity-0"
                    )}
                    style={{
                      background:
                        "radial-gradient(circle at 85% 15%, rgba(201,168,108,0.14) 0%, transparent 65%)",
                    }}
                  />

                  {/* Decorative heart */}
                  <Heart
                    className={cn(
                      "absolute top-6 right-6 h-4 w-4 transition-all duration-300",
                      isRevealed
                        ? "text-gold fill-gold/50 scale-110"
                        : "text-gold/40 fill-gold/20"
                    )}
                  />

                  <div className="relative p-10 z-10">
                    {/* Always-visible Heading */}
                    <h3
                      className={cn(
                        "font-display text-2xl sm:text-[26px] p-7 leading-tight transition-colors duration-300",
                        isRevealed ? "text-gold-bright" : "text-cream"
                      )}
                    >
                      {thing.title}
                    </h3>

                    {/* Hover cue (fades out when revealed) */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isRevealed ? 0 : 1,
                        height: isRevealed ? 0 : "auto",
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <span className="inline-flex items-center gap-1.5 pt-3 font-body text-[11px] tracking-[0.2em] uppercase text-gold/75">
                        <Sparkles className="h-3 w-3 text-gold/80 animate-pulse" />
                        <span>Hover to reveal</span>
                      </span>
                    </motion.div>

                    {/* Animated Remaining Words (revealed on hover / tap) */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isRevealed ? "auto" : 0,
                        opacity: isRevealed ? 1 : 0,
                        y: isRevealed ? 0 : 10,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 font-body text-sm sm:text-base leading-relaxed text-cream/85">
                        {thing.message}
                      </p>
                    </motion.div>
                  </div>

                  {/* Subtle bottom accent line */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 mt-6 h-px transition-all duration-500",
                      isRevealed ? "w-20 bg-gold" : "w-8 bg-gold/45"
                    )}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
