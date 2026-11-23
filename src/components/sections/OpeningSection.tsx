"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { anniversaryContent } from "@/data/anniversary";

interface Particle {
  id: number;
  x: number;
  y: number;
  targetY: number;
  targetX: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function FloatingParticles({ count = 30 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        return {
          id: i,
          x,
          y,
          targetY: y - 20 - Math.random() * 15,
          targetX: x + (Math.random() - 0.5) * 10,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 12 + 10,
          delay: Math.random() * 8,
          opacity: Math.random() * 0.3 + 0.1,
        };
      })
    );
  }, [count]);

  if (particles.length === 0) {
    return null;
  }

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-dusty-rose"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-dusty-rose"
          style={{
            width: p.size,
            height: p.size,
          }}
          initial={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0,
          }}
          animate={{
            top: [`${p.y}%`, `${p.targetY}%`],
            left: [`${p.x}%`, `${p.targetX}%`],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function OpeningSection() {
  const { couple, opening } = anniversaryContent;
  const [isOpen, setIsOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleOpen = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const cardDelay = prefersReducedMotion ? 0 : 600;
    const scrollDelay = prefersReducedMotion ? 300 : 2200;

    const cardTimer = setTimeout(() => setShowCard(true), cardDelay);
    const scrollTimer = setTimeout(() => {
      const beginningSection = document.getElementById("beginning");
      if (beginningSection) {
        beginningSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    }, scrollDelay);

    return () => {
      clearTimeout(cardTimer);
      clearTimeout(scrollTimer);
    };
  }, [isOpen, prefersReducedMotion]);

  return (
    <section
      id="opening"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ivory"
      aria-label="Opening"
    >
      {/* Background particles */}
      <FloatingParticles />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(232,201,193,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Top content */}
      <motion.div
        className="relative z-10 text-center px-6 mb-10 md:mb-14"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: "easeOut" }}
      >
        <span className="font-handwritten text-lg md:text-xl text-champagne block mb-3">
          {opening.eyebrow}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-deep-brown tracking-tight leading-tight max-w-3xl mx-auto">
          {couple.title}
        </h1>
        <p className="mt-4 font-body text-base md:text-lg text-deep-brown/60">
          {couple.firstName} &amp; {couple.secondName}
        </p>
        <p className="mt-1 font-handwritten text-lg md:text-xl text-champagne">
          {couple.anniversaryDate}
        </p>
      </motion.div>

      {/* Envelope */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.9,
          delay: prefersReducedMotion ? 0 : 0.4,
          ease: "easeOut",
        }}
      >
        <div
          className="relative w-72 sm:w-80 md:w-96"
          style={{ perspective: "800px" }}
        >
          {/* Envelope body */}
          <div
            className={cn(
              "relative w-full aspect-[4/3] rounded-lg overflow-visible",
              "bg-gradient-to-br from-dusty-rose to-muted-rose",
              "shadow-lg"
            )}
          >
            {/* Inner envelope lining */}
            <div className="absolute inset-[3px] rounded-md bg-gradient-to-b from-soft-white/80 to-ivory/60" />

            {/* Invitation card – slides up when envelope opens */}
            <AnimatePresence>
              {showCard && (
                <motion.div
                  className={cn(
                    "absolute left-3 right-3 bottom-3 rounded-md",
                    "bg-soft-white border border-dusty-rose/30",
                    "flex flex-col items-center justify-center p-6 md:p-8",
                    "shadow-md"
                  )}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -80, opacity: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ minHeight: "70%" }}
                >
                  <span className="font-handwritten text-champagne text-lg mb-2">
                    You are invited
                  </span>
                  <p className="font-display text-xl md:text-2xl text-deep-wine font-semibold text-center leading-snug">
                    {opening.message}
                  </p>
                  <div className="mt-4 h-px w-12 bg-champagne/60" />
                  <p className="mt-3 font-handwritten text-champagne text-base">
                    {couple.firstName} &amp; {couple.secondName}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Triangular flap (top) */}
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{
                transformStyle: "preserve-3d",
                zIndex: showCard ? 0 : 10,
              }}
              animate={
                isOpen
                  ? { rotateX: -180 }
                  : { rotateX: 0 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Front of flap */}
              <div
                className="w-full"
                style={{
                  backfaceVisibility: "hidden",
                }}
              >
                <svg
                  viewBox="0 0 400 150"
                  className="w-full h-auto block"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="0,0 400,0 200,150"
                    className="fill-muted-rose"
                  />
                  <polygon
                    points="4,2 396,2 200,145"
                    className="fill-dusty-rose"
                    style={{ filter: "brightness(0.95)" }}
                  />
                </svg>
              </div>
              {/* Back of flap (visible after flip) */}
              <div
                className="absolute top-0 left-0 w-full"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateX(180deg)",
                }}
              >
                <svg
                  viewBox="0 0 400 150"
                  className="w-full h-auto block"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="0,0 400,0 200,150"
                    className="fill-ivory"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Bottom decorative V shape (behind card) */}
            <div className="absolute bottom-0 left-0 w-full z-[1]">
              <svg
                viewBox="0 0 400 100"
                className="w-full h-auto block"
                preserveAspectRatio="none"
              >
                <polygon
                  points="0,100 200,20 400,100"
                  fill="rgba(181,139,97,0.15)"
                />
              </svg>
            </div>
          </div>

          {/* Wax seal / button */}
          {!isOpen && (
            <motion.button
              onClick={handleOpen}
              className={cn(
                "absolute -bottom-5 left-1/2 -translate-x-1/2 z-20",
                "w-20 h-20 rounded-full",
                "bg-gradient-to-br from-deep-wine to-deep-wine/80",
                "flex items-center justify-center",
                "shadow-lg shadow-deep-wine/25",
                "cursor-pointer",
                "group",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={opening.buttonLabel}
            >
              {/* Seal texture rings */}
              <div className="absolute inset-1 rounded-full border border-soft-white/20" />
              <div className="absolute inset-2.5 rounded-full border border-soft-white/10" />
              <span className="font-handwritten text-soft-white text-xs text-center leading-tight px-1 select-none group-hover:scale-105 transition-transform">
                {opening.buttonLabel}
              </span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Scroll hint (visible before opening) */}
      {!isOpen && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.5, duration: 0.6 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-champagne/40 flex justify-center pt-1.5"
            animate={
              prefersReducedMotion
                ? {}
                : { y: [0, 6, 0] }
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1 h-1.5 rounded-full bg-champagne/60" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
