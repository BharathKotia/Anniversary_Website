"use client";

import { cn } from "@/lib/utils";
import { type HTMLMotionProps, motion } from "motion/react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center justify-center font-body font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        // square corners per Viktor & Paula style
        "rounded-none",
        variant === "primary" &&
          "bg-wine text-cream hover:bg-wine/90 border border-gold/40 shadow-lg shadow-wine/30",
        variant === "secondary" &&
          "bg-cream/10 text-cream hover:bg-cream/20 border border-cream/30",
        variant === "ghost" &&
          "text-cream hover:bg-cream/10",
        size === "sm" && "px-5 py-2 text-sm tracking-wide",
        size === "md" && "px-7 py-3 text-base tracking-wide",
        size === "lg" && "px-9 py-4 text-lg tracking-wide",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
