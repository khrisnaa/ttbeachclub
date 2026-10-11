"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SquareLink } from "@/components/ui/square-link";
import { SectionHeader } from "@/components/ui/section-header";

const DividerLine = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.95", "start 0.65"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      ref={lineRef}
      style={{ scaleY, opacity }}
      className="bg-secondary h-[80px] w-[2px] origin-top rounded-md sm:h-[120px]"
    />
  );
};

export const Discover = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-32 text-center select-none md:min-h-screen md:py-48"
    >
      {/* Background Image Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="relative -top-[20%] h-[140%] w-full"
        >
          <Image
            src="/stories/main-hero-v1.webp"
            fill
            alt="Discover Tropical Temptation"
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Overlay bg-foreground & gradient */}
        <div className="bg-foreground/35 pointer-events-none absolute inset-0" />
        <div className="from-foreground/70 via-foreground/30 to-foreground/80 pointer-events-none absolute inset-0 bg-gradient-to-b" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-10 sm:gap-14">
        <DividerLine />

        <SectionHeader
          subtitle="Your Next Escape"
          title="Discover the Experience"
          className="text-secondary"
        />

        <SquareLink href="#">Reserve Now</SquareLink>
      </div>
    </section>
  );
};
