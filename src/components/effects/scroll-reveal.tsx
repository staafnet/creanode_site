'use client';

import type { ReactNode } from "react";
import { clsx } from "clsx";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const { ref } = useScrollReveal();
  return (
    <div ref={ref} className={clsx("opacity-0 will-change-transform", className)}>
      {children}
    </div>
  );
}
