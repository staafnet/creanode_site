'use client';

import { useEffect, useRef, useState } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldInit, setShouldInit] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldInit(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldInit || !ref.current) return;

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    const loadGsap = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !ref.current) return;
      if (!(gsap as unknown as { plugins: Record<string, unknown> }).plugins.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      ctx = gsap.context(() => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
            },
          },
        );
      }, ref.current);
    };

    loadGsap();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [shouldInit]);

  return { ref };
}
