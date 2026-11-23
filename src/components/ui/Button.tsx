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
        "inline-flex items-center justify-center rounded-full font-body font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:opacity-50 disabled:pointer-events-none",
        variant === "primary" &&
          "bg-deep-wine text-soft-white hover:bg-deep-wine/90 shadow-lg shadow-deep-wine/20",
        variant === "secondary" &&
          "bg-dusty-rose/30 text-deep-brown hover:bg-dusty-rose/50 border border-dusty-rose/40",
        variant === "ghost" &&
          "text-deep-brown hover:bg-dusty-rose/20",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
