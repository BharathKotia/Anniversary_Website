"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * =========================================================================
 * PRELOADER CONFIGURATION & DUMMY IMAGES
 * You can replace these dummy URLs with your own photos / couple pictures later.
 * =========================================================================
 */
export const PRELOADER_IMAGES = [
  // Item 1: Top-left floating memory
  "https://ik.imagekit.io/3gs53o1vn/WhatsApp%20Image%202026-11-24%20at%2010.42.36%20AM%20(1).jpeg?updatedAt=1795507538663",
  // Item 2: Top-right floating memory
  "https://ik.imagekit.io/3gs53o1vn/WhatsApp%20Image%202026-11-24%20at%2010.42.41%20AM%20(1).jpeg?updatedAt=1795507538848",
  // Item 3: Bottom-left floating memory
  "https://ik.imagekit.io/3gs53o1vn/WhatsApp%20Image%202026-11-24%20at%2010.42.36%20AM.jpeg?updatedAt=1795507538773",
  // Item 4: Bottom-right floating memory
  "https://ik.imagekit.io/3gs53o1vn/WhatsApp%20Image%202026-11-24%20at%2010.42.37%20AM%20(2).jpeg?updatedAt=1795507539200",
];

/**
 * Preloader Center Logo / Monogram
 * Replace this with your custom wedding emblem / monogram image when ready.
 */
export const PRELOADER_LOGO =
  "https://ik.imagekit.io/3gs53o1vn/WhatsApp%20Image%202026-11-24%20at%2010.42.35%20AM_p99MYuX_w.jpeg?updatedAt=1795507538875";
// =========================================================================

// Module-level guard: ensures preloader runs strictly ONCE per page load
let hasPreloaderAlreadyRun = false;

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the preloader has already executed in this session/page load, don't run again!
    if (hasPreloaderAlreadyRun) {
      if (preloaderRef.current) {
        preloaderRef.current.style.display = "none";
      }
      if (onComplete) onComplete();
      return;
    }
    hasPreloaderAlreadyRun = true;

    const ctx = gsap.context(() => {
      const itemTargets = [
        { x: "-20vw", y: "-30vh", rotation: -20 },
        { x: "25vw", y: "-20vh", rotation: 15 },
        { x: "-32vw", y: "30vh", rotation: 12 },
        { x: "15vw", y: "25vh", rotation: -15 },
      ];

      const EXIT_DISTANCE = 3.5;
      const itemExits = itemTargets.map((target) => ({
        x: parseFloat(target.x) * EXIT_DISTANCE + "vw",
        y: parseFloat(target.y) * EXIT_DISTANCE + "vh",
        rotation: target.rotation * 2.5,
      }));

      const items = gsap.utils.toArray<HTMLElement>(".preloader-item");
      const floatingTweens: gsap.core.Tween[] = [];

      const tl = gsap.timeline({
        delay: 0.15,
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = "none";
          }
        },
      });

      // 1. Circular expanding revealers (staggered waves)
      tl.to(".preloader-revealer", {
        clipPath: "circle(100% at 50% 50%)",
        duration: 0.9,
        stagger: 0.2,
        ease: "power2.inOut",
      });

      // Hide revealers 1, 2, 3 under revealer 4; KEEP revealer 4 and preloader-bg solid maroon!
      tl.set(
        ".preloader-revealer-1, .preloader-revealer-2, .preloader-revealer-3",
        { display: "none" }
      );

      // 2. 4 items pop out to coordinates and float
      items.forEach((item, i) => {
        const target = itemTargets[i];
        const image = item.querySelector("img");

        tl.to(
          item,
          {
            x: target.x,
            y: target.y,
            scale: 1,
            rotation: target.rotation,
            duration: 0.85,
            ease: "power3.out",
            onStart: () => {
              if (image) {
                floatingTweens[i] = gsap.to(image, {
                  y: gsap.utils.random(-15, -25),
                  duration: gsap.utils.random(1.5, 2.5),
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                  delay: gsap.utils.random(0, 0.4),
                });
              }
            },
          },
          i === 0 ? "-=0.5" : "<0.075"
        );
      });

      // 3. Central logo appears in center
      tl.to(
        ".preloader-logo",
        { scale: 1, opacity: 1, duration: 0.85, ease: "power3.out" },
        "<"
      );

      // 4. Showcase pause — solid maroon background stays 100% opaque!
      tl.to({}, { duration: 0.8 });

      // 5. Kill float tweens and EXIT all 5 images COMPLETELY while maroon background remains solid
      tl.add(() => floatingTweens.forEach((tween) => tween.kill()));

      // 4 corner items scale up and fly off-screen
      items.forEach((item, i) => {
        const exit = itemExits[i];
        tl.to(
          item,
          {
            x: exit.x,
            y: exit.y,
            scale: 2.4,
            rotation: exit.rotation,
            opacity: 0,
            duration: 0.7,
            ease: "power2.in",
          },
          i === 0 ? ">" : "<0.06"
        );
      });

      // Central logo flies up and vanishes
      tl.to(
        ".preloader-logo",
        { y: "-120vh", scale: 2.2, opacity: 0, duration: 0.7, ease: "power2.in" },
        "<"
      );

      // 6. Explicitly hide all 5 images now that they have exited
      tl.set(".preloader-item, .preloader-logo, .items", { display: "none" });

      // 7. NOW AND ONLY NOW: Fade out the maroon curtain to reveal the Hero Section!
      tl.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut",
        onStart: () => {
          // Trigger the hero text reveal animation as the curtain begins fading
          if (onComplete) onComplete();
        },
      });
    }, preloaderRef);

    return () => {
      // Do not reset hasPreloaderAlreadyRun on StrictMode unmount
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="preloader fixed inset-0 w-full h-[100svh] overflow-hidden z-50 pointer-events-auto"
      style={{
        ["--base-200" as string]: "#c49241",
        ["--base-300" as string]: "#f75828",
        ["--base-400" as string]: "#8A1C2E",
        ["--base-500" as string]: "#580B1B",
      }}
    >
      {/* Solid Maroon background layer — stays opaque behind the animations */}
      <div className="preloader-bg absolute inset-0 w-full h-full bg-[#580B1B]" />

      {/* 4 Circular ripple revealers */}
      <div
        className="preloader-revealer preloader-revealer-1 absolute inset-0 w-full h-full bg-[#c49241]"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />
      <div
        className="preloader-revealer preloader-revealer-2 absolute inset-0 w-full h-full bg-[#f75828]"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />
      <div
        className="preloader-revealer preloader-revealer-3 absolute inset-0 w-full h-full bg-[#8A1C2E]"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />
      <div
        className="preloader-revealer preloader-revealer-4 absolute inset-0 w-full h-full bg-[#580B1B]"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />

      {/* 4 Corner floating image items */}
      <div className="items absolute inset-0 w-full h-full pointer-events-none">
        {PRELOADER_IMAGES.map((imgSrc, idx) => (
          <div
            key={idx}
            className={`preloader-item item item-${idx + 1} absolute top-1/2 left-1/2 w-[35vw] sm:w-[22vw] md:w-[16vw] aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/40`}
            style={{
              transform: "translate(-50%, -50%) scale(0)",
              willChange: "transform, opacity",
            }}
          >
            {/* Dummy Image — replace imgSrc with your own photo later */}
            <img
              src={imgSrc}
              alt={`Preloader Memory ${idx + 1}`}
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>

      {/* Central Logo / Monogram */}
      <div
        className="preloader-logo absolute top-1/2 left-1/2 w-[22vw] sm:w-[15vw] md:w-[10vw] max-w-[140px] aspect-square rounded-full flex items-center justify-center p-3 bg-wine/90 border-2 border-gold shadow-2xl backdrop-blur-sm"
        style={{
          transform: "translate(-50%, -50%) scale(0.5)",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        <img
          src={PRELOADER_LOGO}
          alt="Anniversary Logo"
          className="w-full h-auto object-contain rounded-full"
        />
      </div>
    </div>
  );
}
