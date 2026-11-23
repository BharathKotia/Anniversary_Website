"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Heart, Sparkles, RotateCcw, Gift } from "lucide-react";
import { anniversaryContent } from "@/data/anniversary";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function FinalRevealSection() {
  const { finalReveal, couple } = anniversaryContent;
  const [isRevealed, setIsRevealed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleReplay = () => {
    const openingEl = document.getElementById("opening");
    if (openingEl) {
      openingEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="final-reveal"
      className="relative min-h-screen flex flex-col justify-center py-24 md:py-32 lg:py-40 bg-ivory overflow-hidden"
      aria-label="The Final Surprise"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-dusty-rose/25 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading
          eyebrow="A Keepsake For You"
          title="One Last Thing..."
          subtitle="Before this chapter closes, there is something I want to give you."
        />

        <div className="mt-12 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.div
                key="box"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <motion.button
                  type="button"
                  onClick={() => setIsRevealed(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-3xl bg-gradient-to-br from-deep-wine to-deep-wine/90 shadow-2xl shadow-deep-wine/30 ring-4 ring-champagne/40 transition-all cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-champagne"
                  aria-label="Open your final surprise"
                >
                  <div className="absolute inset-2 rounded-2xl border border-soft-white/20" />
                  <Gift className="h-16 w-16 text-soft-white transition-transform duration-300 group-hover:scale-110" />
                  <span className="sr-only">Open your final surprise</span>
                </motion.button>

                <p className="mt-6 font-handwritten text-2xl text-deep-brown/80">
                  Tap to unwrap your final message ✨
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-full max-w-2xl rounded-3xl border border-dusty-rose/40 bg-soft-white/90 p-8 sm:p-12 shadow-2xl shadow-deep-wine/10 backdrop-blur-sm"
              >
                {/* Floating Heart Icon */}
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : { scale: [1, 1.15, 1] }
                  }
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-deep-wine/10 text-deep-wine"
                >
                  <Heart className="h-10 w-10 fill-deep-wine text-deep-wine" />
                </motion.div>

                <span className="font-handwritten text-2xl text-champagne">
                  Happy Anniversary
                </span>

                <h3 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-deep-wine">
                  {couple.firstName} & {couple.secondName}
                </h3>

                <p className="mt-6 font-body text-lg sm:text-xl leading-relaxed text-deep-brown/85">
                  &ldquo;{finalReveal.message}&rdquo;
                </p>

                <div className="mt-8 flex items-center justify-center gap-2 text-champagne font-handwritten text-xl">
                  <Sparkles className="h-5 w-5" />
                  <span>Always &amp; Forever</span>
                  <Sparkles className="h-5 w-5" />
                </div>

                {/* Replay Button */}
                <div className="mt-10 pt-8 border-t border-dusty-rose/20 flex justify-center">
                  <Button
                    variant="secondary"
                    onClick={handleReplay}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Replay Our Story</span>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
