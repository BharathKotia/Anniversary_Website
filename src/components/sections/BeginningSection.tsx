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
      className="relative min-h-screen w-full h-full flex flex-wrap items-center justify-center py-28 sm:py-36 md:py-44 lg:py-52 bg-cream overflow-hidden text-center"
      aria-label="Where It Began"
    >
      {/* Subtle warm glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(88,11,27,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-12 flex flex-col items-center justify-center h-full  text-center">
        <SectionHeading
        
          title={beginning.title}
      
          light={false}
        />

        {/* Centered Wedding Photo Keepsake Card */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="w-full flex justify-center mb-10"
        >
          <div className="relative w-full max-w-sm sm:max-w-md bg-off-white p-4 sm:p-5 shadow-2xl shadow-wine/20 frame-gold transition-transform duration-500 hover:-translate-y-1">
            {/* Washi tape decor */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-gold/25 -rotate-1 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-dim">
              {imageError ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-wine/10 flex items-center justify-center text-wine">
                    <Heart className="h-8 w-8 text-wine fill-wine/20" />
                  </div>
                  <p className="font-display text-xl font-normal text-wine">Day One</p>
                  <span className="font-handwritten text-base text-ink/60">
                    {beginning.imageAlt}
                  </span>
                </div>
              ) : (
                <Image
                  src={beginning.image}
                  alt={beginning.imageAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, 420px"
                  className="object-cover"
                  onError={() => setImageError(true)}
                  priority
                />
              )}
            </div>

            <div className="mt-4 text-center">
              <span className="font-handwritten text-xl sm:text-2xl text-wine/80">
                The day everything changed ✨
              </span>
            </div>
          </div>
        </motion.div>

        {/* Centered Narrative Text Block */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center justify-center space-y-6 max-w-2xl mx-auto"
        >
    

          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-normal leading-relaxed text-wine italic text-center">
            &ldquo;Some stories begin with grand gestures. Ours began with a simple hello.&rdquo;
          </p>

          <p className="font-body text-base sm:text-lg leading-relaxed text-ink/80 text-center">
            {beginning.description}
          </p>

          <div className="pt-2 flex items-center justify-center gap-3 text-gold font-handwritten text-xl sm:text-2xl">
            <Sparkles className="h-5 w-5 text-gold" />
            <span>And neither of us looked back since</span>
            <Sparkles className="h-5 w-5 text-gold" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
