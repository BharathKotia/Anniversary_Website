"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { anniversaryContent } from "@/data/anniversary";
import { ChevronDown } from "lucide-react";

interface OpeningSectionProps {
  /** Triggered when the preloader begins fading out */
  startAnimation?: boolean;
}

export default function OpeningSection({
  startAnimation = false,
}: OpeningSectionProps) {
  const { couple, opening } = anniversaryContent;
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  const heroImageUrl =
    "https://ik.imagekit.io/3gs53o1vn/WhatsApp%20Image%202026-11-24%20at%201.14.26%20PM%20(1).jpeg";

  const handleScrollDown = () => {
    const beginningEl = document.getElementById("beginning");
    if (beginningEl) {
      beginningEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const playRevealAnimation = () => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const chars = gsap.utils.toArray<HTMLElement>(".hero-headline-char");
    const lines = gsap.utils.toArray<HTMLElement>(".hero-reveal-line");
    const sub = gsap.utils.toArray<HTMLElement>(".hero-subheadline-char");
    const cta = gsap.utils.toArray<HTMLElement>(".hero-footer-cta");

    const tl = gsap.timeline({ delay: 0.05 });

    // 1. Eyebrow slide in
    tl.to(lines, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    // 2. Headline characters elastic pop reveal (Exact curve: ease: "elastic.out(0.75, 0.25)")
    tl.to(
      chars,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.02,
        ease: "elastic.out(0.75, 0.25)",
      },
      "-=0.4"
    );

    // 3. Subheadline names & date reveal
    tl.to(
      sub,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.015,
        ease: "power3.out",
      },
      "-=0.9"
    );

    // 4. Footer message & scroll button
    tl.to(
      cta,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );
  };

  // Set initial hidden transform positions on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>(".hero-headline-char");
      const sub = gsap.utils.toArray<HTMLElement>(".hero-subheadline-char");
      const lines = gsap.utils.toArray<HTMLElement>(".hero-reveal-line");
      const cta = gsap.utils.toArray<HTMLElement>(".hero-footer-cta");

      gsap.set(chars, { y: 50, opacity: 0, scale: 0.5 });
      gsap.set(sub, { y: 30, opacity: 0 });
      gsap.set(lines, { yPercent: 100, opacity: 0 });
      gsap.set(cta, { y: 20, opacity: 0 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Trigger animation when startAnimation is true, or via fallback timer
  useEffect(() => {
    if (hasAnimatedRef.current) return;

    if (startAnimation) {
      playRevealAnimation();
    } else {
      // Safety fallback: if onComplete is delayed, trigger after 3.2s so text is NEVER stuck hidden
      const fallbackTimer = setTimeout(() => {
        if (!hasAnimatedRef.current) {
          playRevealAnimation();
        }
      }, 3200);
      return () => clearTimeout(fallbackTimer);
    }
  }, [startAnimation]);

  // Split headline title into characters
  const titleChars = couple.title.split("");
  const coupleNames = `${couple.firstName} & ${couple.secondName}`;

  return (
    <section
      ref={sectionRef}
      id="opening"
      className="relative h-screen w-full overflow-hidden flex flex-col justify-between"
      aria-label="Hero"
    >
      {/* ── Fullscreen Background Image (100vw, 100vh) ── */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src={heroImageUrl}
          alt={coupleNames}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dual overlay for pristine typography contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-black/80 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-wine/30 mix-blend-multiply pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* ── Top Header Area: Spacious breathing room between top of screen and eyebrow ── */}
      <div className="relative z-10 w-full pt-20 sm:pt-24 md:pt-28 lg:pt-2 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Eyebrow with reveal mask */}
        <div className="overflow-hidden mt-3 mb-3">
          <span className="hero-reveal-line inline-block font-body text-xs sm:text-sm  uppercase text-gold font-medium drop-shadow-md  ">
            {opening.eyebrow}
          </span>
        </div>

        {/* Headline with Elastic Character Pop Reveal */}
        <h1 className="font-display flex text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-cream tracking-tight leading-tight max-w-3xl drop-shadow-lg select-none">
          {titleChars.map((char, index) => (
            <span
              key={index}
              className="hero-headline-char font-handwritten inline-block will-change-transform"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Names & Anniversary Subheadline */}
        <div className="mt-3 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-cream/90 drop-shadow-md overflow-hidden">
          <span className="font-display text-xl sm:text-2xl md:text-3xl text-gold-bright">
            {coupleNames.split("").map((c, i) => (
              <span key={i} className="hero-subheadline-char inline-block">
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
          
      
        </div>

        {/* Delicate divider line */}
        <div className="mt-5 flex items-center justify-center w-full">
          <div className="h-px w-20 bg-gold/60 shadow-sm" />
        </div>
      </div>

      {/* ── Bottom Section with Tagline & Scroll Cue ── */}
      <div className="hero-footer-cta relative z-10 w-full pb-8 sm:pb-12 px-4 text-center flex flex-col items-center">
        <p className="hero-headline-char text-xl sm:text-2xl md:text-3xl text-cream/90 drop-shadow-md max-w-md">
          &ldquo;{opening.message}&rdquo;
        </p>

        <button
          onClick={handleScrollDown}
          className="mt-5 group flex flex-col items-center gap-1.5 text-gold/80 hover:text-gold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full p-2 cursor-pointer"
          aria-label="Scroll down to begin our story"
        >
          <span className="font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-cream/70 group-hover:text-cream">
            Explore Our Story
          </span>
          <ChevronDown className="h-5 w-5 text-gold group-hover:text-gold-bright transition-transform duration-300 group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}
