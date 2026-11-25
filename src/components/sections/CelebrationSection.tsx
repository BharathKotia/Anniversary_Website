"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import { Volume2, VolumeX, Sparkles, Eye } from "lucide-react";
import { anniversaryContent } from "@/data/anniversary";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface CelebrationParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
  rotation: number;
  kind: "heart" | "flower" | "sparkle";
  color: string;
}

const CELEBRATION_COLORS = [
  "#E2C48D", // gold-bright
  "#C9A86C", // gold
  "#F7EAD7", // cream
  "#E893A5", // soft rose
  "#D96B82", // warm rose
  "#FFFBF5", // off-white
];

function generateCelebrationParticles(count: number): CelebrationParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    size: 16 + Math.random() * 20,
    delay: Math.random() * 2.4,
    duration: 4.5 + Math.random() * 4.5,
    driftX: (Math.random() - 0.5) * 120,
    driftY: 110 + Math.random() * 20,
    rotation: Math.random() * 360,
    kind: i % 3 === 0 ? "heart" : i % 3 === 1 ? "flower" : "sparkle",
    color: CELEBRATION_COLORS[i % CELEBRATION_COLORS.length],
  }));
}

function generateBurstParticles(count: number): CelebrationParticle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
    const distance = 120 + Math.random() * 260;
    return {
      id: 1000 + i,
      x: 50,
      y: 50,
      size: 18 + Math.random() * 18,
      delay: Math.random() * 0.15,
      duration: 1.6 + Math.random() * 0.9,
      driftX: Math.cos(angle) * distance,
      driftY: Math.sin(angle) * distance,
      rotation: Math.random() * 360,
      kind: i % 2 === 0 ? "heart" : "flower",
      color: CELEBRATION_COLORS[i % CELEBRATION_COLORS.length],
    };
  });
}

/* ─── SVG Shapes ─────────────────────────────────────────────────────────── */
function HeartShape({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function FlowerShape({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="16"
          cy="8"
          rx="4.5"
          ry="7"
          fill={color}
          opacity="0.92"
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="3.6" fill="#C9A86C" />
    </svg>
  );
}

function SparkleShape({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
    </svg>
  );
}

function FallingCelebrationParticle({ p }: { p: CelebrationParticle }) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0"
      style={{ left: `${p.x}%` }}
      initial={{ y: "-10vh", x: 0, opacity: 0, rotate: p.rotation, scale: 0.7 }}
      animate={{
        y: [" -10vh", "55vh", "110vh"],
        x: [0, p.driftX * 0.5, p.driftX],
        opacity: [0, 0.95, 0.9, 0],
        rotate: [p.rotation, p.rotation + 160, p.rotation + 320],
        scale: [0.7, 1.05, 0.9],
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      {p.kind === "heart" ? (
        <HeartShape color={p.color} size={p.size} />
      ) : p.kind === "flower" ? (
        <FlowerShape color={p.color} size={p.size} />
      ) : (
        <SparkleShape color={p.color} size={p.size * 0.75} />
      )}
    </motion.div>
  );
}

function BurstParticle({ p }: { p: CelebrationParticle }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ x: 0, y: 0, opacity: 1, scale: 0.3, rotate: 0 }}
      animate={{
        x: p.driftX,
        y: p.driftY,
        opacity: [1, 1, 0],
        scale: [0.3, 1.25, 0.8],
        rotate: p.rotation,
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-hidden="true"
    >
      {p.kind === "heart" ? (
        <HeartShape color={p.color} size={p.size} />
      ) : (
        <FlowerShape color={p.color} size={p.size} />
      )}
    </motion.div>
  );
}

/* ─── Scratch-to-Reveal 100vh Photo ─────────────────────────────────────── */
function ScratchRevealPhoto({
  imageSrc,
  coupleNames,
  prefersReducedMotion,
  onComplete,
}: {
  imageSrc: string;
  coupleNames: string;
  prefersReducedMotion: boolean | null;
  onComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const moveCounterRef = useRef(0);
  const hasTriggeredRevealRef = useRef(false);

  const [scratchPercent, setScratchPercent] = useState(0);
  const [isFullyScratched, setIsFullyScratched] = useState(false);
  const [fallingParticles, setFallingParticles] = useState<CelebrationParticle[]>([]);
  const [burstParticles, setBurstParticles] = useState<CelebrationParticle[]>([]);

  /* Paint luxurious metallic gold/wine scratchable foil */
  const paintFoil = useCallback((canvas: HTMLCanvasElement, w: number, h: number) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* Deep romantic wine + gold shimmer foil gradient */
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, "#430714");
    bgGrad.addColorStop(0.35, "#6b1124");
    bgGrad.addColorStop(0.55, "#875c2b");
    bgGrad.addColorStop(0.75, "#580b1b");
    bgGrad.addColorStop(1, "#380510");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    /* Subtle metallic diagonal sheen stripes */
    ctx.save();
    ctx.strokeStyle = "rgba(226, 196, 141, 0.08)";
    ctx.lineWidth = 2;
    for (let x = -h; x < w + h; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }
    ctx.restore();

    /* Ornamental inner gold frame */
    const inset = Math.min(28, w * 0.05);
    ctx.strokeStyle = "rgba(201, 168, 108, 0.55)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(inset, inset, w - inset * 2, h - inset * 2);

    /* Center invitation prompt */
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "rgba(226, 196, 141, 0.9)";
    ctx.font = `600 ${Math.max(11, Math.min(14, w * 0.015))}px sans-serif`;
    ctx.fillText("A SPECIAL SURPRISE AWAITS", w / 2, h / 2 - 42);

    ctx.fillStyle = "#F7EAD7";
    ctx.font = `400 ${Math.max(26, Math.min(52, w * 0.045))}px Georgia, serif`;
    ctx.fillText("Scratch Here to Reveal", w / 2, h / 2 + 4);

    ctx.fillStyle = "rgba(201, 168, 108, 0.8)";
    ctx.font = `italic ${Math.max(15, Math.min(22, w * 0.02))}px Georgia, serif`;
    ctx.fillText("Swipe or drag across the screen ✨", w / 2, h / 2 + 50);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || isFullyScratched) return;

    const init = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      /* Avoid resetting scratches on minor mobile address-bar height jitters */
      if (
        lastSizeRef.current.w > 0 &&
        Math.abs(w - lastSizeRef.current.w) < 30 &&
        Math.abs(h - lastSizeRef.current.h) < 120
      ) {
        return;
      }
      lastSizeRef.current = { w, h };
      paintFoil(canvas, w, h);
    };

    init();
    const ro = new ResizeObserver(init);
    ro.observe(container);
    return () => ro.disconnect();
  }, [paintFoil, isFullyScratched]);

  const triggerFullReveal = useCallback(() => {
    if (hasTriggeredRevealRef.current) return;
    hasTriggeredRevealRef.current = true;
    setIsFullyScratched(true);
    setScratchPercent(100);
    setBurstParticles(generateBurstParticles(28));
    setFallingParticles(generateCelebrationParticles(36));
    onComplete?.();
  }, [onComplete]);

  const calculateProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isFullyScratched) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = canvas;
    if (width === 0 || height === 0) return;

    const imageData = ctx.getImageData(0, 0, width, height).data;
    const step = 32; // Sample every 32nd pixel for instant performance
    let transparent = 0;
    let total = 0;

    for (let i = 3; i < imageData.length; i += 4 * step) {
      total++;
      if (imageData[i] < 128) transparent++;
    }

    const pct = total > 0 ? Math.round((transparent / total) * 100) : 0;
    setScratchPercent(pct);

    if (pct >= 55) {
      triggerFullReveal();
    }
  }, [isFullyScratched, triggerFullReveal]);

  const scratchAt = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isFullyScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const radius = Math.max(36, Math.min(58, rect.width * 0.045));

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = radius * 2;

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    lastPointRef.current = { x, y };

    moveCounterRef.current++;
    if (moveCounterRef.current % 8 === 0) {
      calculateProgress();
    }
  }, [isFullyScratched, calculateProgress]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isFullyScratched) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    lastPointRef.current = null;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isFullyScratched) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    calculateProgress();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none bg-wine"
    >
      {/* Underlying Full-Screen 100vh Couple Image */}
      <img
        src={imageSrc}
        alt={`Anniversary surprise for ${coupleNames}`}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out",
          isFullyScratched ? "scale-100" : "scale-105"
        )}
      />

      {/* Subtle warm vignette over revealed photo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(88,11,27,0.28) 0%, transparent 25%, transparent 65%, rgba(88,11,27,0.72) 100%)",
        }}
      />

      {/* Interactive Scratch Foil Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: isFullyScratched ? "auto" : "none" }}
        className={cn(
          "absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-1000 ease-out",
          isFullyScratched ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      />

      {/* Scratch Progress & Skip Controls (shown while scratching) */}
      {!isFullyScratched && (
        <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-4 px-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-wine/85 backdrop-blur-md px-4 py-2 text-xs font-body tracking-widest uppercase text-cream shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" />
            <span>{scratchPercent}% Revealed</span>
          </div>

          <button
            type="button"
            onClick={triggerFullReveal}
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-cream/90 hover:bg-cream px-4 py-2 text-xs font-body font-medium tracking-wider uppercase text-wine shadow-lg transition-transform hover:scale-105 cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Reveal All</span>
          </button>
        </div>
      )}

      {/* Hearts & Flowers Celebration Animation on Full Scratch */}
      {isFullyScratched && !prefersReducedMotion && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
          {burstParticles.map((p) => (
            <BurstParticle key={p.id} p={p} />
          ))}
          {fallingParticles.map((p) => (
            <FallingCelebrationParticle key={p.id} p={p} />
          ))}
        </div>
      )}

      {/* Celebratory Caption Banner after Full Reveal */}
      <AnimatePresence>
        {isFullyScratched && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="pointer-events-none absolute bottom-10 left-0 right-0 z-30 flex flex-col items-center justify-center px-4 text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-wine/80 backdrop-blur-md px-5 py-2 mb-3">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="font-body text-xs tracking-[0.28em] uppercase text-gold-bright">
                Forever &amp; Always
              </span>
              <Sparkles className="h-4 w-4 text-gold" />
            </div>
            <p className="font-display text-3xl sm:text-5xl text-cream drop-shadow-lg">
              {coupleNames}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Celebration Section ───────────────────────────────────────────── */
export default function CelebrationSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { title, message, image } = anniversaryContent.finalReveal;
  const { anniversaryDate, firstName, secondName } = anniversaryContent.couple;
  const surpriseImage = image || anniversaryContent.beginning.image;

  /* Handle audio setup */
  useEffect(() => {
    const audio = new Audio("/song.mp3");
    audio.loop = true;
    audio.preload = "auto";

    const handleError = () => setAudioAvailable(false);
    audio.addEventListener("error", handleError);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const playSong = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setAudioAvailable(true);
        setIsPlaying(true);
      })
      .catch(() => {
        /* Ignore autoplay restriction errors if browser blocks mid-drag */
      });
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
    <motion.section
      id="celebration"
      ref={sectionRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="relative w-full overflow-hidden bg-wine flex flex-col items-center text-center"
      aria-label="Anniversary celebration"
    >
      {/* Headline & Intro Block */}
      <div className="relative w-full py-24 md:py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(201,168,108,0.15) 0%, transparent 65%)",
          }}
        />

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

      
        </div>
      </div>

      {/* Full 100vh Scratch-to-Reveal Image */}
      <ScratchRevealPhoto
        imageSrc={surpriseImage}
        coupleNames={`${firstName} & ${secondName}`}
        prefersReducedMotion={prefersReducedMotion}
        onComplete={playSong}
      />
    </motion.section>
  );
}
