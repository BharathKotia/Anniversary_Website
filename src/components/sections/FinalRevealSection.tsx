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
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 md:py-32 lg:py-40 bg-wine overflow-hidden text-center"
      aria-label="The Final Surprise"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(201,168,108,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <SectionHeading
          eyebrow="A Keepsake For You"
          title="One Last Thing..."
          subtitle="Before this chapter closes, there is something I want to give you."
          light={true}
        />

        <div className="mt-8 flex flex-col items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.div
                key="box"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center"
              >
                <motion.button
                  type="button"
                  onClick={() => setIsRevealed(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center bg-wine border-2 border-gold/60 shadow-2xl shadow-black/40 transition-all cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-gold"
                  aria-label="Open your final surprise"
                >
                  <div className="absolute inset-2 border border-gold/30" />
                  <Gift className="h-16 w-16 text-gold transition-transform duration-300 group-hover:scale-110" />
                  <span className="sr-only">Open your final surprise</span>
                </motion.button>

                <p className="mt-8 font-handwritten text-2xl text-cream/80">
                  Tap to unwrap your final message ✨
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-full max-w-2xl bg-off-white p-8 sm:p-12 shadow-2xl shadow-black/30 border border-gold/50 frame-gold text-center"
              >
                {/* Floating Heart Icon */}
                <motion.div
                  animate={
                    prefersReducedMotion ? {} : { scale: [1, 1.15, 1] }
                  }
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-wine/10 text-wine"
                >
                  <Heart className="h-10 w-10 fill-wine text-wine" />
                </motion.div>

                <span className="font-body text-xs uppercase tracking-[0.3em] text-gold block mb-2">
                  Happy Anniversary
                </span>

                <h3 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-wine">
                  {couple.firstName} &amp; {couple.secondName}
                </h3>

                <p className="mt-6 font-body text-lg sm:text-xl leading-relaxed text-ink/80">
                  &ldquo;{finalReveal.message}&rdquo;
                </p>

                <div className="mt-8 flex items-center justify-center gap-2 text-gold font-handwritten text-2xl">
                  <Sparkles className="h-5 w-5" />
                  <span>Always &amp; Forever</span>
                  <Sparkles className="h-5 w-5" />
                </div>

                {/* Replay Button */}
                <div className="mt-10 pt-8 border-t border-gold/30 flex justify-center">
                  <Button
                    variant="primary"
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
