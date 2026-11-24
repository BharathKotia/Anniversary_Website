"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { anniversaryContent } from "@/data/anniversary";
import { cn } from "@/lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 md:py-32 lg:py-40 bg-cream overflow-hidden text-center"
      aria-label="Our Next Chapters"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <SectionHeading
          eyebrow="What's ahead"
          title="Our Next Chapters"
          subtitle={future.message}
          light={false}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {future.promises.map((promise, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className={cn(
                "group relative rounded-xl border border-gold/40",
                "bg-off-white p-7 shadow-md shadow-wine/5",
                "transition-all duration-400 hover:shadow-2xl hover:border-gold hover:-translate-y-1 text-left flex flex-col justify-between"
              )}
            >
              <div>
                {/* Sparkle icon */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold/15">
                  <Sparkles className="h-5 w-5 text-gold" />
                </div>

                {/* Promise text */}
                <p className="font-display text-xl leading-relaxed text-wine">
                  {promise}
                </p>
              </div>

              {/* Shimmer line */}
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
