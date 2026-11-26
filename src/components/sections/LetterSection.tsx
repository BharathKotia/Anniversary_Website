"use client";

import { motion, useReducedMotion } from "motion/react";
import { Heart } from "lucide-react";
import { anniversaryContent } from "@/data/anniversary";
import SectionHeading from "@/components/ui/SectionHeading";

export default function LetterSection() {
  const prefersReducedMotion = useReducedMotion();
  const { paragraphs, signOff, signName } = anniversaryContent.letter;
  const { anniversaryDate } = anniversaryContent.couple;

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
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-28 sm:py-36 md:py-44 px-4 sm:px-6 lg:px-8 bg-cream overflow-hidden text-center"
      aria-label="A Personal Letter"
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
        <SectionHeading
          eyebrow="From my heart"
          title="A Letter For You"
          light={false}
        />

        {/* Layered Real Letter Paper Stack */}
        <div className="relative w-full mt-4">
          {/* Underneath stacked sheet 1 */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[3px] bg-[#F3E5CE] border border-gold/30 shadow-md -rotate-[1.6deg] translate-y-1.5"
          />

          {/* Underneath stacked sheet 2 */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[3px] bg-[#FAF0DF] border border-gold/35 shadow-lg rotate-[1.1deg] translate-y-0.5"
          />

          {/* Main Real Letter Paper Sheet */}
          <motion.article
            {...fadeUp}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="relative w-full rounded-[3px] border border-gold/45 text-left overflow-hidden"
            style={{
              backgroundColor: "#FFFDF7",
              backgroundImage: `
                linear-gradient(180deg, rgba(255,253,247,0.92) 0%, rgba(252,244,230,0.96) 100%),
                repeating-linear-gradient(
                  transparent,
                  transparent 35px,
                  rgba(201, 168, 108, 0.2) 35px,
                  rgba(201, 168, 108, 0.2) 36px
                )
              `,
              backgroundSize: "100% 100%, 100% 36px",
              backgroundPosition: "0 0, 0 28px",
              boxShadow:
                "0 24px 55px rgba(88, 11, 27, 0.18), 0 4px 12px rgba(88, 11, 27, 0.08), inset 0 0 48px rgba(201, 168, 108, 0.1)",
            }}
          >
            {/* Subtle horizontal letter fold creases */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/3 h-3 bg-gradient-to-b from-wine/[0.035] via-white/50 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-2/3 h-3 bg-gradient-to-b from-wine/[0.03] via-white/40 to-transparent"
            />

            {/* Classic stationery vertical margin line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 bottom-0 left-6 sm:left-11 w-px bg-wine/15"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 bottom-0 left-[27px] sm:left-[47px] w-px bg-wine/10"
            />

            {/* Subtle top-right corner fold */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 h-10 w-10 sm:h-12 sm:w-12"
              style={{
                background:
                  "linear-gradient(225deg, #F7EAD7 48%, rgba(201,168,108,0.4) 50%, #F4E7D1 53%, transparent 55%)",
                boxShadow: "-2px 2px 6px rgba(88,11,27,0.08)",
              }}
            />

            {/* Letter Content Area */}
            <div className="relative z-10 pl-10 pr-6 py-10 sm:pl-16 sm:pr-12 sm:py-14 md:pl-20 md:pr-14 md:py-16">
              {/* Stationery Header: Date + Wax Seal */}
              <div className="flex items-start justify-between gap-4 mb-8 pb-4 border-b border-gold/25">
                <div>
                 
                  <p className="mt-1 font-handwritten text-2xl sm:text-3xl text-wine">
                    My Dearest,
                  </p>
                </div>

                {/* Vintage Burgundy Wax Seal */}
                <div
                  aria-hidden="true"
                  className="relative flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-wine text-gold shadow-md mr-3 sm:mr-2"
                  style={{
                    boxShadow:
                      "0 4px 10px rgba(88,11,27,0.35), inset 0 2px 4px rgba(255,255,255,0.18), inset 0 -3px 6px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="absolute inset-1 rounded-full border border-gold/45" />
                  <Heart className="h-5 w-5 fill-gold/85 text-gold" />
                </div>
              </div>

              {/* Letter Paragraphs aligned to ruled paper lines */}
              <div className="space-y-9">
                {paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    {...fadeUp}
                    transition={{
                      duration: 0.7,
                      delay: prefersReducedMotion ? 0 : 0.15 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className={
                      index === 0
                        ? "font-body text-base sm:text-[17px] leading-[36px] text-ink/85 first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8] first-letter:text-wine"
                        : "font-body text-base sm:text-[17px] leading-[36px] text-ink/85"
                    }
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Handwritten Sign-off */}
              <motion.div
                {...fadeUp}
                transition={{
                  duration: 0.7,
                  delay: prefersReducedMotion
                    ? 0
                    : 0.15 + paragraphs.length * 0.1 + 0.1,
                  ease: "easeOut",
                }}
                className="mt-10 pt-6 border-t border-gold/25 flex flex-col items-end text-right"
              >
                <p className="font-handwritten text-2xl sm:text-3xl text-wine">
                  {signOff}
                </p>
                <p className="mt-1 font-display italic text-xl sm:text-2xl text-ink/80 font-normal">
                  — {signName}
                </p>
              </motion.div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
