"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { anniversaryContent } from "@/data/anniversary";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function FutureSection() {
  const { future } = anniversaryContent;

  return (
    <section
      id="future"
      className="relative min-h-screen flex flex-col justify-center py-24 md:py-32 lg:py-40 bg-ivory overflow-hidden"
    >
      {/* Subtle radial glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-dusty-rose/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What's ahead"
          title="Our Next Chapters"
          subtitle={future.message}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {future.promises.map((promise, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={cn(
                "group relative rounded-2xl border border-dusty-rose/20",
                "bg-dusty-rose/10 p-6 md:p-8",
                "transition-shadow duration-300 hover:shadow-lg hover:shadow-dusty-rose/10"
              )}
            >
              {/* Sparkle icon */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-champagne/15">
                <Sparkles className="h-5 w-5 text-champagne" />
              </div>

              {/* Promise text */}
              <p className="font-body text-base md:text-lg leading-relaxed text-deep-brown/85">
                {promise}
              </p>

              {/* Subtle hover shimmer line */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
