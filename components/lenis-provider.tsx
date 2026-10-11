"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { ReactNode } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
