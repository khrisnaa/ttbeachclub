"use client";

import {
  useScroll,
  useTransform,
  motion,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";

const PHILOSOPHY_TEXT =
  "Beneath the same sun, Tropical Temptation celebrates the interconnectedness of life, embodied in a gathering place at Melasti—an alluring beach club in Uluwatu where people come together beneath the same sun. At this Uluwatu beach club, the rhythms of nature shape the day’s atmosphere, flowing from the serene light of day to the shared moments of sunset. That sense of togetherness lingers long after the sun has vanished beyond the horizon.";

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char = ({ children, progress, range }: CharProps) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
};

const PhilosophyText = () => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "start 0.4"],
  });

  const wordData = useMemo(() => {
    const words = PHILOSOPHY_TEXT.split(" ");
    const totalChars = PHILOSOPHY_TEXT.replace(/\s+/g, "").length;
    let currentIdx = 0;

    return words.map((word) => {
      return word.split("").map((char) => {
        const start = currentIdx / totalChars;
        const end = Math.min(1, start + 0.035);
        currentIdx++;
        return { char, range: [start, end] as [number, number] };
      });
    });
  }, []);

  return (
    <p
      ref={containerRef}
      className="text-left text-lg leading-relaxed font-medium sm:text-center sm:text-xl md:text-2xl"
    >
      {wordData.map((wordChars, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {wordChars.map((item, charIdx) => (
            <Char key={charIdx} progress={scrollYProgress} range={item.range}>
              {item.char}
            </Char>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

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
      className="bg-foreground h-[80px] w-[2px] origin-top rounded-md sm:h-[120px]"
    />
  );
};

export const Philosophy = () => {
  const containerDiv = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerDiv,
    offset: ["start start", "end end"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0.92, 0.5]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.86, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);

  return (
    <section className="relative">
      <div
        ref={containerDiv}
        className="relative -mt-[130vh] h-[220vh] lg:-mt-[120vh]"
      >
        <div className="bg-background absolute bottom-0 left-0 h-[80dvh] w-full p-4 sm:py-6 md:py-16 lg:hidden">
          <div className="relative h-full w-full overflow-hidden sm:mx-auto sm:aspect-3/4 sm:w-auto">
            <motion.div
              style={{ y }}
              className="absolute top-[-50%] h-full w-full"
            >
              <Image
                src="/stories/main-hero-v1.webp"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Tropical Temptation Beach Club Melasti Bali Philosophy"
                className="object-cover object-center"
              />
              <div className="bg-foreground/20 absolute inset-0" />
            </motion.div>
          </div>
        </div>

        <div className="bg-background absolute bottom-0 left-0 hidden h-screen w-full overflow-hidden lg:flex">
          <motion.div
            style={{ scaleX, scaleY, x: "-50%", y: "-50%" }}
            className="absolute top-1/2 left-1/2 z-10 aspect-[6/3] h-[900px] overflow-hidden"
          >
            <motion.div
              style={{ y }}
              className="relative top-[-60%] h-[140%] w-full"
            >
              <Image
                src="/stories/main-hero-v1.webp"
                fill
                sizes="(min-width: 1024px) 1400px, 100vw"
                alt="Tropical Temptation Beach Club Melasti Bali Philosophy"
                className="object-cover object-center"
              />
              <div className="bg-foreground/20 absolute inset-0" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-10 px-6 pb-32 sm:gap-16 sm:px-16 sm:pb-64">
        <DividerLine />
        <PhilosophyText />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[calc(100vh+20rem)] w-full overflow-hidden opacity-5">
        <Image
          src="/patterns/pattern-full-new.webp"
          fill
          alt="Tropical Temptation Background Pattern"
          className="object-cover object-bottom"
        />
        <div className="from-background absolute inset-0 bg-gradient-to-b via-transparent to-transparent" />
      </div>
    </section>
  );
};
