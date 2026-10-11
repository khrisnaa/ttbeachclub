"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { stories } from "@/datas/stories";
import { SectionHeader } from "@/components/ui/section-header";

const StoryText = ({
  tag,
  title,
  description,
  withPattern = false,
}: {
  tag: string;
  title: string;
  description: string;
  withPattern?: boolean;
}) => {
  return (
    <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden px-6 py-8 sm:px-12 md:h-screen md:w-[50vw] md:px-16 lg:px-24">
      {withPattern && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-5">
          <Image
            src="/patterns/pattern-full.webp"
            fill
            alt=""
            className="object-cover object-center"
          />
          <div className="from-background to-background absolute inset-0 bg-gradient-to-r via-transparent" />
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg space-y-8">
        <SectionHeader subtitle={tag} title={title} align="left" />
        <p className="text-sm leading-relaxed font-normal sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

const MobileParallaxImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-4/3 w-full overflow-hidden sm:aspect-16/9"
    >
      <motion.div
        style={{ y }}
        className="relative -top-[15%] h-[130%] w-full"
      >
        <Image
          src={src}
          fill
          alt={alt}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="bg-foreground/25 pointer-events-none absolute inset-0" />
      </motion.div>
    </div>
  );
};

export const Stories = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveStep(0);
    else if (latest < 0.5) setActiveStep(1);
    else if (latest < 0.75) setActiveStep(2);
    else setActiveStep(3);
  });

  const [s1, s2, s3, s4] = stories;

  return (
    <section id="stories" className="bg-background relative">
      {/* Mobile View: Vertical Flex Col */}
      <div className="flex flex-col gap-16 px-1 py-20 md:hidden">
        {[s1, s2, s3].map((story) => (
          <div key={story.id} className="flex flex-col gap-6">
            <div className="space-y-6 px-5 sm:px-8">
              <SectionHeader
                subtitle={story.tag}
                title={story.title}
                align="left"
              />
              <p className="text-sm leading-relaxed font-normal sm:text-base">
                {story.description}
              </p>
            </div>

            <MobileParallaxImage src={story.image} alt={story.title} />
          </div>
        ))}

        <MobileParallaxImage src={s4.image} alt={s4.title} />
      </div>

      {/* Desktop View: Horizontal Pinned Scroll */}
      <div ref={targetRef} className="relative hidden h-[400vh] md:block">
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
          <motion.div style={{ x }} className="relative flex h-full w-[400vw]">
            <div className="pointer-events-none absolute top-0 left-[25vw] z-0 h-screen w-[125vw] overflow-hidden opacity-5">
              <div
                className="h-full w-full bg-center bg-repeat-x"
                style={{
                  backgroundImage: "url('/patterns/pattern-full.webp')",
                  backgroundSize: "auto 100%",
                }}
              />
              <div className="from-background to-background absolute inset-0 bg-gradient-to-r via-transparent" />
            </div>

            <div className="relative flex h-screen w-screen shrink-0 flex-row">
              <StoryText
                tag={s1.tag}
                title={s1.title}
                description={s1.description}
              />
              <div className="relative z-10 flex h-screen w-[50vw] items-center justify-center p-16">
                <div className="relative aspect-3/4 h-full max-h-[80vh] w-full overflow-hidden">
                  <Image
                    src={s1.image}
                    fill
                    alt={s1.title}
                    priority
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="bg-foreground/25 pointer-events-none absolute inset-0" />
                </div>
              </div>
            </div>

            <div className="relative flex h-screen w-screen shrink-0 flex-row">
              <StoryText
                tag={s2.tag}
                title={s2.title}
                description={s2.description}
              />
              <div className="relative z-10 h-screen w-[50vw] overflow-hidden pr-[2px]">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={s2.image}
                    fill
                    alt={s2.title}
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="bg-foreground/25 pointer-events-none absolute inset-0" />
                </div>
              </div>
            </div>

            <div className="relative flex h-screen w-screen shrink-0 flex-row-reverse">
              <StoryText
                tag={s3.tag}
                title={s3.title}
                description={s3.description}
                withPattern
              />
              <div className="relative z-10 h-screen w-[50vw] overflow-hidden pl-[2px]">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={s3.image}
                    fill
                    alt={s3.title}
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="bg-foreground/25 pointer-events-none absolute inset-0" />
                </div>
              </div>
            </div>

            <div className="relative h-screen w-screen shrink-0 overflow-hidden">
              <Image
                src={s4.image}
                fill
                alt={s4.title}
                className="object-cover"
                sizes="100vw"
              />
              <div className="bg-foreground/25 pointer-events-none absolute inset-0" />
            </div>
          </motion.div>

          <div className="absolute bottom-8 left-6 z-30 flex items-center gap-3 sm:bottom-10 sm:left-12 md:left-24">
            {[0, 1, 2, 3].map((step) => {
              const isActive = activeStep === step;
              const isDark = activeStep === 3;

              return (
                <div
                  key={step}
                  className={`h-[2px] rounded-full transition-all duration-300 ${
                    isActive ? "w-20 sm:w-28 md:w-36" : "w-8 sm:w-12 md:w-16"
                  } ${
                    isDark
                      ? isActive
                        ? "bg-background"
                        : "bg-background/40"
                      : isActive
                        ? "bg-foreground"
                        : "bg-foreground/30"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
