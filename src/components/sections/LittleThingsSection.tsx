"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { anniversaryContent } from "@/data/anniversary";
import SectionHeading from "@/components/ui/SectionHeading";

export default function LittleThingsSection() {
  const { littleThings } = anniversaryContent;

  return (
    <section
      id="little-things"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 md:py-32 lg:py-40 bg-wine overflow-hidden text-center"
      aria-label="The Little Things"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201,168,108,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <SectionHeading
          eyebrow="What makes us, us"
          title="The Little Things"
          subtitle="The quiet habits, the shared jokes, and the everyday moments that mean the most."
          light={true}
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {littleThings.map((thing, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="group flex"
            >
              <div
                className={cn(
                  "relative w-full rounded-xl p-6 sm:p-7 flex flex-col justify-between text-left",
                  "bg-wine/80 border border-gold/30 shadow-lg shadow-black/20",
                  "transition-all duration-500 ease-out",
                  "hover:border-gold hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-1"
                )}
              >
                {/* Decorative heart */}
                <Heart className="absolute top-5 right-5 h-4 w-4 text-gold/40 fill-gold/20 transition-colors duration-300 group-hover:text-gold group-hover:fill-gold/40" />

                <div>
                  {/* Title */}
                  <h3 className="font-display text-2xl text-cream pr-6 leading-tight">
                    {thing.title}
                  </h3>

                  {/* Message */}
                  <p className="mt-3 font-body text-sm leading-relaxed text-cream/75">
                    {thing.message}
                  </p>
                </div>

                {/* Subtle bottom accent line */}
                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-8 bg-gold/50 transition-all duration-300 group-hover:w-16 group-hover:bg-gold"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
