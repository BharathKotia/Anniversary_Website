"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  /** true = section is on dark (wine) bg; false = light (cream) bg */
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn(
        "mb-12 md:mb-16 w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "font-body text-xs md:text-sm tracking-[0.3em] uppercase mb-3 block text-center",
            light ? "text-gold/90" : "text-wine/70"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-tight text-center",
          light ? "text-cream" : "text-wine"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 font-body text-base md:text-lg max-w-xl leading-relaxed text-center",
            light ? "text-cream/75" : "text-ink/75"
          )}
        >
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center w-full">
        <div
          className={cn(
            "h-px w-24",
            light ? "bg-gold/60" : "bg-gold/80"
          )}
        />
      </div>
    </motion.div>
  );
}
