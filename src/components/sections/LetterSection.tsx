"use client";

import { motion, useReducedMotion } from "motion/react";
import { anniversaryContent } from "@/data/anniversary";

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
      className="relative min-h-screen flex flex-col justify-center py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
      aria-label="A personal letter"
    >
      <div className="mx-auto max-w-2xl">
        {/* Paper / letter card */}
        <motion.article
          {...fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-sm bg-soft-white px-8 py-12 shadow-[0_4px_24px_rgba(48,36,38,0.06)] ring-1 ring-champagne/20 sm:px-12 md:px-16 md:py-16"
        >
          {/* Decorative top accent line */}
          <div
            className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-champagne/40"
            aria-hidden="true"
          />

          {/* Title */}
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="mb-10 text-center font-display text-3xl font-semibold tracking-tight text-deep-brown md:text-4xl"
          >
            {title}
          </motion.h2>

          {/* Paragraphs */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                {...fadeUp}
                transition={{
                  duration: 0.7,
                  delay: prefersReducedMotion ? 0 : 0.2 + index * 0.15,
                  ease: "easeOut",
                }}
                className="font-body text-base leading-[1.85] text-deep-brown/85 md:text-lg md:leading-[1.9]"
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
                : 0.2 + paragraphs.length * 0.15 + 0.1,
              ease: "easeOut",
            }}
            className="mt-12 text-right"
          >
            <p className="font-handwritten text-2xl text-champagne md:text-3xl">
              {signOff}
            </p>
            <p className="mt-2 font-handwritten text-xl text-deep-brown/70 md:text-2xl">
              — {signName}
            </p>
          </motion.div>

          {/* Decorative bottom accent line */}
          <div
            className="absolute bottom-0 left-1/2 h-px w-24 -translate-x-1/2 bg-champagne/40"
            aria-hidden="true"
          />
        </motion.article>
      </div>
    </section>
  );
}
