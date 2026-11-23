"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { anniversaryContent } from "@/data/anniversary";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Petal / confetti element types                                     */
/* ------------------------------------------------------------------ */

interface FloatingElement {
  id: number;
  x: number; // start x (%)
  size: number; // px
  delay: number; // seconds
  duration: number; // seconds
  drift: number; // horizontal drift px
  rotation: number; // degrees
  kind: "circle" | "heart";
  color: string;
}

const PETAL_COLORS = [
  "rgba(232,201,193,0.7)", // dusty-rose
  "rgba(181,139,97,0.45)", // champagne
  "rgba(118,45,60,0.35)", // deep-wine
  "rgba(212,166,154,0.6)", // muted-rose
  "rgba(247,240,232,0.8)", // ivory
];

function generateElements(count: number): FloatingElement[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 6 + Math.random() * 12,
    delay: Math.random() * 6,
    duration: 5 + Math.random() * 7,
    drift: (Math.random() - 0.5) * 80,
    rotation: Math.random() * 360,
    kind: Math.random() > 0.5 ? "heart" : "circle",
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  }));
}

/* ------------------------------------------------------------------ */
/*  Heart SVG (pure CSS/SVG shape)                                     */
/* ------------------------------------------------------------------ */

function HeartShape({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Single floating element                                            */
/* ------------------------------------------------------------------ */

function FloatingPetal({ el }: { el: FloatingElement }) {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-0"
      style={{ left: `${el.x}%` }}
      initial={{ y: 0, x: 0, opacity: 0, rotate: el.rotation }}
      animate={{
        y: [0, -600, -1000],
        x: [0, el.drift * 0.5, el.drift],
        opacity: [0, 0.9, 0],
        rotate: [el.rotation, el.rotation + 120, el.rotation + 200],
      }}
      transition={{
        duration: el.duration,
        delay: el.delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
      aria-hidden="true"
    >
      {el.kind === "heart" ? (
        <HeartShape color={el.color} size={el.size} />
      ) : (
        <div
          className="rounded-full"
          style={{
            width: el.size,
            height: el.size,
            backgroundColor: el.color,
          }}
        />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export default function CelebrationSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { title, message } = anniversaryContent.finalReveal;
  const { anniversaryDate } = anniversaryContent.couple;

  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    setFloatingElements(generateElements(28));
  }, []);

  /* Handle audio setup */
  useEffect(() => {
    const audio = new Audio("/audio/anniversary-song.mp3");
    audio.loop = true;
    audio.preload = "none";

    const handleError = () => {
      setAudioAvailable(false);
    };

    audio.addEventListener("error", handleError);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  /* Play / pause toggle */
  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setAudioAvailable(false));
    }
  }, [isPlaying]);

  /* Pause audio when section leaves viewport */
  useEffect(() => {
    if (!isInView && isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isInView, isPlaying]);

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" as const },
      };

  return (
    <section
      id="celebration"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-ivory to-dusty-rose/20 px-6 py-24 md:py-32 lg:py-40"
      aria-label="Anniversary celebration"
    >
      {/* Floating petals / confetti — only when in view & motion OK */}
      {isInView && !prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          {floatingElements.map((el) => (
            <FloatingPetal key={el.id} el={el} />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        {/* Date eyebrow */}
        <motion.span
          {...fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 font-handwritten text-xl text-champagne md:text-2xl"
        >
          {anniversaryDate}
        </motion.span>

        {/* Main title */}
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="mb-6 font-display text-5xl font-bold tracking-tight text-deep-wine sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {title}
        </motion.h2>

        {/* Decorative divider */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mb-8 h-px w-24 bg-champagne/60"
          aria-hidden="true"
        />

        {/* Message */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-xl font-body text-lg leading-relaxed text-deep-brown/80 md:text-xl"
        >
          {message}
        </motion.p>

        {/* Music control */}
        <AnimatePresence>
          {audioAvailable && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-12"
            >
              <button
                type="button"
                onClick={toggleAudio}
                className={cn(
                  "group relative flex items-center gap-2 rounded-full px-5 py-2.5",
                  "border border-champagne/40 bg-soft-white/80 backdrop-blur-sm",
                  "font-body text-sm text-deep-brown/70 transition-all duration-300",
                  "hover:border-champagne/60 hover:bg-soft-white hover:text-deep-brown",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                )}
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? (
                  <Volume2
                    size={18}
                    className="text-champagne transition-colors group-hover:text-deep-wine"
                  />
                ) : (
                  <VolumeX
                    size={18}
                    className="text-champagne/60 transition-colors group-hover:text-champagne"
                  />
                )}
                <span>{isPlaying ? "Pause music" : "Play our song"}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
