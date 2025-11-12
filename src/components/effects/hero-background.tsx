'use client';

import { useVantaWaves } from "@/hooks/use-vanta-waves";
import { clsx } from "clsx";

type HeroBackgroundProps = {
  className?: string;
};

export function HeroBackground({ className }: HeroBackgroundProps) {
  const { containerRef } = useVantaWaves();
  return <div ref={containerRef} className={clsx("min-h-[300px]", className)} />;
}
