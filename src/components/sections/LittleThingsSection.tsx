"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { anniversaryContent } from "@/data/anniversary";
import SectionHeading from "@/components/ui/SectionHeading";

const cardRotations = [-2, 2, -1, 2, -2, 1];

export default function LittleThingsSection() {
  const { littleThings } = anniversaryContent;

  return (
    <section
      id="little-things"
      className="relative min-h-screen flex flex-col justify-center py-20 md:py-28 lg:py-32 bg-ivory overflow-hidden"
    >
      {/* Subtle decorative background hearts */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Heart className="absolute top-16 left-[10%] h-24 w-24 text-dusty-rose/[0.07] rotate-12" />
        <Heart className="absolute bottom-20 right-[8%] h-20 w-20 text-dusty-rose/[0.06] -rotate-6" />
        <Heart className="absolute top-1/2 left-[55%] h-16 w-16 text-champagne/[0.08] rotate-45" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What makes us, us"
          title="The Little Things"
        />

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {littleThings.map((thing, index) => {
            const rotation = cardRotations[index % cardRotations.length];

            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotation }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="group"
              >
                <div
                  className={cn(
                    "relative h-full rounded-xl p-4 sm:p-5 lg:p-6",
                    "bg-soft-white border border-dusty-rose/15",
                    "shadow-sm transition-all duration-500 ease-out",
                    "hover:shadow-lg hover:-translate-y-1 hover:rotate-0",
                    // Paper texture feel
                    "bg-[linear-gradient(135deg,rgba(247,240,232,0.5)_0%,rgba(255,251,247,1)_50%,rgba(232,201,193,0.12)_100%)]"
                  )}
                >
                  {/* Decorative heart */}
                  <Heart className="absolute top-3 right-3 h-4 w-4 text-dusty-rose/40 fill-dusty-rose/20 transition-colors duration-300 group-hover:text-deep-wine/50 group-hover:fill-deep-wine/25" />

                  {/* Title */}
                  <h3 className="font-handwritten text-xl sm:text-2xl text-deep-wine pr-5 leading-tight">
                    {thing.title}
                  </h3>

                  {/* Message — always visible on mobile, revealed on hover for desktop */}
                  <p
                    className={cn(
                      "mt-2 sm:mt-3 font-body text-xs sm:text-sm leading-relaxed text-deep-brown/70",
                      "md:max-h-0 md:opacity-0 md:overflow-hidden",
                      "md:group-hover:max-h-40 md:group-hover:opacity-100",
                      "transition-all duration-500 ease-out"
                    )}
                  >
                    {thing.message}
                  </p>

                  {/* Subtle bottom accent line */}
                  <div
                    aria-hidden="true"
                    className="mt-3 sm:mt-4 h-px w-8 bg-champagne/40 transition-all duration-300 group-hover:w-12 group-hover:bg-champagne/70"
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
