"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Calendar, Sparkles, Heart } from "lucide-react";
import { anniversaryContent } from "@/data/anniversary";
import SectionHeading from "@/components/ui/SectionHeading";

export default function BeginningSection() {
  const { beginning } = anniversaryContent;
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section
      id="beginning"
      className="relative min-h-screen flex flex-col justify-center py-24 md:py-32 lg:py-40 bg-soft-white overflow-hidden"
      aria-label="Where It Began"
    >
      {/* Decorative background glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_var(--tw-gradient-stops))] from-dusty-rose/15 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The prologue"
          title={beginning.title}
          subtitle={`Where two paths crossed on ${beginning.date}`}
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Narrative text card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-champagne/10 px-4 py-1.5 w-fit">
              <Calendar className="h-4 w-4 text-champagne" />
              <span className="font-body text-sm font-medium text-deep-brown/80">
                {beginning.date}
              </span>
            </div>

            <p className="font-display text-2xl md:text-3xl font-medium leading-relaxed text-deep-wine/90 italic">
              &ldquo;Some stories begin with grand gestures. Ours began with a simple hello.&rdquo;
            </p>

            <p className="font-body text-base md:text-lg leading-relaxed text-deep-brown/80">
              {beginning.description}
            </p>

            <div className="pt-2 flex items-center gap-3 text-champagne font-handwritten text-xl">
              <Sparkles className="h-5 w-5" />
              <span>And neither of us looked back since</span>
            </div>
          </motion.div>

          {/* Keepsake photo card */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm rounded-2xl bg-ivory p-4 md:p-5 shadow-[0_12px_40px_rgba(48,36,38,0.08)] ring-1 ring-dusty-rose/30 transition-transform duration-500 hover:-translate-y-1">
              {/* Tape decor */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-champagne/25 -rotate-2 rounded-sm pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-dusty-rose/20">
                {imageError ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                    <div className="h-14 w-14 rounded-full bg-champagne/20 flex items-center justify-center text-deep-wine">
                      <Heart className="h-7 w-7 fill-deep-wine/20 text-deep-wine" />
                    </div>
                    <p className="font-display text-lg font-medium text-deep-wine">
                      Day One
                    </p>
                    <span className="font-handwritten text-base text-deep-brown/60">
                      {beginning.imageAlt}
                    </span>
                  </div>
                ) : (
                  <Image
                    src={beginning.image}
                    alt={beginning.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>

              <div className="mt-4 text-center">
                <span className="font-handwritten text-xl text-deep-brown/75">
                  The day everything changed ✨
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
