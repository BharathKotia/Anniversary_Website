"use client";

import { motion, useReducedMotion } from "motion/react";
import { anniversaryContent } from "@/data/anniversary";
import SectionHeading from "@/components/ui/SectionHeading";

export default function LetterSection() {
  const prefersReducedMotion = useReducedMotion();
  const { title, paragraphs, signOff, signName } = anniversaryContent.letter;

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" as const },
      };

  return (
    <section
      id="letter"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-cream overflow-hidden text-center"
      aria-label="A Personal Letter"
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
        <SectionHeading
          eyebrow="From my heart"
          title="A Letter For You"
          light={false}
        />

        {/* Parchment letter card */}
        <motion.article
          {...fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full rounded-2xl bg-off-white px-8 py-12 sm:px-12 md:px-14 md:py-16 shadow-2xl shadow-wine/15 frame-gold text-left"
        >
          {/* Top accent flourish */}
          <div className="flex justify-center mb-8">
            <div className="h-px w-20 bg-gold/60" aria-hidden="true" />
          </div>

          {/* Paragraphs */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                {...fadeUp}
                transition={{
                  duration: 0.7,
                  delay: prefersReducedMotion ? 0 : 0.15 + index * 0.1,
                  ease: "easeOut",
                }}
                className="font-body text-base leading-relaxed sm:text-lg sm:leading-loose text-ink/80"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Sign-off */}
          <motion.div
            {...fadeUp}
            transition={{
              duration: 0.7,
              delay: prefersReducedMotion
                ? 0
                : 0.15 + paragraphs.length * 0.1 + 0.1,
              ease: "easeOut",
            }}
            className="mt-12 text-right border-t border-gold/30 pt-6"
          >
            <p className="font-handwritten text-2xl text-wine sm:text-3xl">
              {signOff}
            </p>
            <p className="mt-1 font-display text-xl text-ink/80 sm:text-2xl font-normal">
              — {signName}
            </p>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
}
