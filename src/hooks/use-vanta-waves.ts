'use client';

import { useEffect, useRef, useState } from "react";

type VantaInstance = {
  destroy?: () => void;
};

export function useVantaWaves() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldInit, setShouldInit] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
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
    if (!shouldInit || !containerRef.current) return;

    let instance: VantaInstance | null = null;
    let cancelled = false;

    const loadVanta = async () => {
      const [{ default: VANTA }, THREE] = await Promise.all([
        import("vanta/dist/vanta.waves.min"),
        import("three"),
      ]);

      if (cancelled || !containerRef.current) return;

      instance = VANTA({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x1e3a8a,
        shininess: 45,
        waveHeight: 20,
        waveSpeed: 0.7,
        zoom: 0.8,
      });
    };

    loadVanta();

    return () => {
      cancelled = true;
      instance?.destroy?.();
    };
  }, [shouldInit]);

  return { containerRef };
}
