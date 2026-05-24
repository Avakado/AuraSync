"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Wires modern scroll-driven choreography on top of the existing page:
 *  • `data-reveal` elements fade + slide in once they enter the viewport
 *  • `data-parallax="<speed>"` elements drift while scrolling (negative speeds
 *    slow them down, positive speeds push them past the scroll)
 *  • `data-section-pin` headlines stay pinned briefly while their stat cards
 *    scrub past
 *
 * Mobile-friendly: ScrollTrigger handles touch scroll natively, and we cap the
 * parallax range so iOS Safari rubber-banding never produces huge offsets.
 *
 * All triggers respect `prefers-reduced-motion` and pause when the page is
 * hidden (battery friendly).
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ---- Reveals -------------------------------------------------------
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        const direction = el.dataset.revealFrom ?? "up";
        const delay = parseFloat(el.dataset.revealDelay ?? "0");
        const distance = parseFloat(el.dataset.revealDistance ?? "32");

        const fromVars: gsap.TweenVars = { opacity: 0 };
        if (direction === "up") fromVars.y = distance;
        if (direction === "down") fromVars.y = -distance;
        if (direction === "left") fromVars.x = -distance;
        if (direction === "right") fromVars.x = distance;
        if (direction === "scale") {
          fromVars.scale = 0.94;
          fromVars.y = distance * 0.4;
        }

        gsap.fromTo(el, fromVars, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // ---- Staggered children -------------------------------------------
      const staggers = gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]");
      staggers.forEach((parent) => {
        const distance = parseFloat(parent.dataset.revealDistance ?? "28");
        const children = Array.from(parent.children) as HTMLElement[];
        if (!children.length) return;

        gsap.fromTo(
          children,
          { opacity: 0, y: distance },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: parent,
              start: "top 85%",
              end: "top 55%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // ---- Parallax drift -----------------------------------------------
      const parallax = gsap.utils.toArray<HTMLElement>("[data-parallax]");
      parallax.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax ?? "0.15");
        // Clamp the effective range so the element never drifts more than this
        // many pixels in either direction (prevents jumping over neighbouring
        // titles, especially on tall sections).
        const maxRange = parseFloat(el.dataset.parallaxMax ?? "80");
        const distance = Math.max(-maxRange, Math.min(maxRange, speed * 400));

        gsap.fromTo(
          el,
          { y: -distance },
          {
            y: distance,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });

      // ---- Section eyebrow pin micro-effect -----------------------------
      const pins = gsap.utils.toArray<HTMLElement>("[data-section-pin]");
      pins.forEach((el) => {
        gsap.fromTo(
          el,
          { letterSpacing: "0.3em", opacity: 0.6 },
          {
            letterSpacing: "0.45em",
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 40%",
              scrub: 0.6,
            },
          },
        );
      });
    });

    // Refresh on font load (icons / fonts can shift trigger positions)
    if ("fonts" in document) {
      (document as Document & { fonts: { ready: Promise<void> } }).fonts.ready
        .then(() => ScrollTrigger.refresh())
        .catch(() => {});
    }

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
