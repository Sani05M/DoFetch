"use client";

import { useEffect, useRef, useCallback } from "react";

type EasingString = string;

// ─── Modal Animations ────────────────────────────────────────────────────────

/**
 * GSAP-powered modal entrance & exit.
 * Targets: backdrop (.gsap-modal-backdrop) + panel (.gsap-modal-panel)
 */
export function useGsapModal(isOpen: boolean, onExitComplete?: () => void) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const gsapRef = useRef<any>(null);
  const hasOpened = useRef(false);

  // Lazy-load GSAP to avoid SSR issues
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsapRef.current = gsap;
    });
  }, []);

  useEffect(() => {
    const gsap = gsapRef.current;
    if (!gsap || !backdropRef.current || !panelRef.current) return;

    if (isOpen) {
      hasOpened.current = true;

      // Kill any running tweens on these elements
      gsap.killTweensOf([backdropRef.current, panelRef.current]);

      // Backdrop: fast fade in
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.22, ease: "power2.out" }
      );

      // Panel: spring-like entrance from below
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 40, scale: 0.96, transformOrigin: "center bottom" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          ease: "expo.out",
          delay: 0.04,
        }
      );
    } else if (hasOpened.current) {
      gsap.killTweensOf([backdropRef.current, panelRef.current]);

      // Panel: quick exit upward
      gsap.to(panelRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.97,
        duration: 0.22,
        ease: "power3.in",
      });

      // Backdrop: fade out, then call completion
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        delay: 0.04,
        onComplete: onExitComplete,
      });
    }
  }, [isOpen]);

  return { backdropRef, panelRef };
}

// ─── Card Stagger Animations ──────────────────────────────────────────────────

/**
 * GSAP stagger animation for a list of card elements.
 * Pass the container ref; targets children matching `.gsap-card`.
 */
export function useGsapCardStagger(
  deps: any[] = [],
  options?: { stagger?: number; delay?: number; y?: number }
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { stagger = 0.06, delay = 0, y = 20 } = options ?? {};

  useEffect(() => {
    let ctx: any;
    import("gsap").then(({ gsap }) => {
      if (!containerRef.current) return;
      const cards = containerRef.current.querySelectorAll(".gsap-card");
      if (!cards.length) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          cards,
          { opacity: 0, y, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.38,
            ease: "expo.out",
            stagger,
            delay,
          }
        );
      }, containerRef);
    });

    return () => ctx?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

// ─── Hero Text Reveal ─────────────────────────────────────────────────────────

/**
 * Animates heading + badge on mount.
 * Target elements: `.gsap-hero-badge`, `.gsap-hero-title`, `.gsap-hero-actions`
 */
export function useGsapHeroReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    import("gsap").then(({ gsap }) => {
      if (!sectionRef.current) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.fromTo(
          ".gsap-hero-badge",
          { opacity: 0, y: -10, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" }
        )
          .fromTo(
            ".gsap-hero-title",
            { opacity: 0, y: 18, skewY: 2 },
            { opacity: 1, y: 0, skewY: 0, duration: 0.5, ease: "expo.out" },
            "-=0.1"
          )
          .fromTo(
            ".gsap-hero-actions",
            { opacity: 0, x: 16 },
            { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" },
            "-=0.25"
          );
      }, sectionRef);
    });

    return () => ctx?.revert();
  }, []);

  return sectionRef;
}

// ─── Stat Counter Animation ───────────────────────────────────────────────────

/**
 * Animates a numeric counter from 0 to target value.
 * Use on a ref to a span/div containing the number.
 */
export function useGsapCounter(
  target: number,
  deps: any[] = [],
  options?: { duration?: number; delay?: number }
) {
  const elRef = useRef<HTMLSpanElement>(null);
  const { duration = 1.2, delay = 0.3 } = options ?? {};

  useEffect(() => {
    let ctx: any;
    import("gsap").then(({ gsap }) => {
      if (!elRef.current) return;
      const obj = { val: 0 };
      ctx = gsap.context(() => {
        gsap.to(obj, {
          val: target,
          duration,
          delay,
          ease: "power2.out",
          roundProps: "val",
          onUpdate() {
            if (elRef.current) elRef.current.textContent = String(obj.val);
          },
        });
      });
    });
    return () => ctx?.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ...deps]);

  return elRef;
}
