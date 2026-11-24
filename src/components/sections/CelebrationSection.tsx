"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { anniversaryContent } from "@/data/anniversary";
import { cn } from "@/lib/utils";

interface FloatingElement {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotation: number;
  kind: "circle" | "heart";
  color: string;
}

const PETAL_COLORS = [
  "rgba(201,168,108,0.7)",  // gold
  "rgba(247,234,215,0.7)",  // cream
  "rgba(226,196,141,0.6)",  // gold-bright
  "rgba(237,217,187,0.5)",  // cream-dim
];

function generateElements(count: number): FloatingElement[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 7,
    drift: (Math.random() - 0.5) * 80,
    rotation: Math.random() * 360,
    kind: Math.random() > 0.5 ? "heart" : "circle",
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  }));
}

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
      className="relative min-h-screen w-full overflow-hidden bg-wine px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 flex flex-col items-center justify-center text-center"
      aria-label="Anniversary celebration"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(201,168,108,0.15) 0%, transparent 65%)",
        }}
      />

      {/* Floating petals */}
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
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Date eyebrow */}
        <motion.span
          {...fadeUp}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-gold"
        >
          {anniversaryDate}
        </motion.span>

        {/* Main title */}
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="mb-6 font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-cream"
        >
          {title}
        </motion.h2>

        {/* Decorative divider */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mb-8 h-px w-24 bg-gold/60"
          aria-hidden="true"
        />

        {/* Message */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-xl font-body text-lg sm:text-xl leading-relaxed text-cream/80"
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
                  "group relative flex items-center gap-2 px-6 py-3",
                  "border border-gold/40 bg-wine/80 backdrop-blur-sm",
                  "font-body text-sm text-cream transition-all duration-300",
                  "hover:border-gold hover:bg-wine hover:shadow-lg hover:shadow-gold/15",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                )}
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? (
                  <Volume2 size={18} className="text-gold" />
                ) : (
                  <VolumeX size={18} className="text-gold/60" />
                )}
                <span className="tracking-wider uppercase text-xs">
                  {isPlaying ? "Pause Music" : "Play Our Song"}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
