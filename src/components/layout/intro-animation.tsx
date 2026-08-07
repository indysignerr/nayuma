"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "nayuma-intro-seen";

export function IntroAnimation() {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<SVGRectElement>(null);
  const steamRefs = useRef<(SVGPathElement | null)[]>([]);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const cupGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadySeen || reduced) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const overlay = overlayRef.current;
    const liquid = liquidRef.current;
    const wordmark = wordmarkRef.current;
    const cupGroup = cupGroupRef.current;
    const steams = steamRefs.current.filter(Boolean) as SVGPathElement[];
    if (!overlay || !liquid || !wordmark || !cupGroup) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        overlay.style.display = "none";
      },
    });

    tl.set(liquid, { attr: { height: 0, y: 46 } })
      .set(steams, { opacity: 0, y: 0 })
      .set(wordmark, { opacity: 0, y: 12 })
      .to(overlay, { opacity: 1, duration: 0.01 })
      .to(cupGroup, { opacity: 1, duration: 0.4, ease: "power2.out" })
      .to(liquid, { attr: { height: 30, y: 16 }, duration: 0.9, ease: "power2.inOut" }, "-=0.1")
      .to(
        steams,
        {
          opacity: 0.7,
          y: -22,
          duration: 1.1,
          ease: "power1.out",
          stagger: 0.15,
        },
        "-=0.7"
      )
      .to(steams, { opacity: 0, duration: 0.5, ease: "power1.in" }, "-=0.2")
      .to(cupGroup, { opacity: 0, y: -8, duration: 0.4, ease: "power2.in" }, "-=0.3")
      .to(wordmark, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.15")
      .to(wordmark, { opacity: 1, duration: 0.5 })
      .to(overlay, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "+=0.1");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink opacity-0"
    >
      <div className="flex flex-col items-center">
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
          <path
            ref={(el) => {
              steamRefs.current[0] = el;
            }}
            d="M38 34 C34 28, 42 24, 38 18"
            stroke="#d7bd85"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            ref={(el) => {
              steamRefs.current[1] = el;
            }}
            d="M48 34 C44 26, 52 22, 48 14"
            stroke="#d7bd85"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            ref={(el) => {
              steamRefs.current[2] = el;
            }}
            d="M58 34 C54 28, 62 24, 58 18"
            stroke="#d7bd85"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g ref={cupGroupRef} className="opacity-0">
            <defs>
              <clipPath id="cupClip">
                <path d="M28 40 h40 l-4 30 a6 6 0 0 1 -6 5 h-20 a6 6 0 0 1 -6 -5 z" />
              </clipPath>
            </defs>
            <rect ref={liquidRef} x="26" width="44" fill="#ab8a4d" clipPath="url(#cupClip)" />
            <path
              d="M28 40 h40 l-4 30 a6 6 0 0 1 -6 5 h-20 a6 6 0 0 1 -6 -5 z"
              stroke="#f6f0e3"
              strokeWidth="2"
              fill="none"
            />
            <path d="M68 46 q10 0 10 9 t-10 9" stroke="#f6f0e3" strokeWidth="2" fill="none" />
            <line x1="20" y1="76" x2="76" y2="76" stroke="#f6f0e3" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
        <div ref={wordmarkRef} className="mt-5 text-center opacity-0">
          <p className="font-display text-2xl tracking-[0.15em] text-cream">NAYUMA</p>
          <p className="text-[10px] tracking-[0.3em] text-cream/60 uppercase mt-1">Tea &amp; Mood</p>
        </div>
      </div>
    </div>
  );
}
