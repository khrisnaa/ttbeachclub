"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import { places } from "@/datas/places";
import { UnderlineLink } from "@/components/ui/underline-link";
import { SectionHeader } from "@/components/ui/section-header";
import { CircleButton } from "@/components/ui/circle-button";

export const Places = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const startY = useRef(0);
  const startScrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const isHorizontalDrag = useRef(false);

  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const duplicatedPlaces = [...places, ...places, ...places];

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const setInitialPosition = () => {
      const singleSetWidth = el.scrollWidth / 3;
      if (singleSetWidth > 0) {
        el.scrollLeft = singleSetWidth;
      }
    };

    setInitialPosition();
    const timer = setTimeout(setInitialPosition, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    isScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
    }, 150);

    const el = scrollContainerRef.current;
    if (!el) return;

    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth > 0) {
      if (el.scrollLeft >= 2 * singleSetWidth) {
        el.scrollLeft -= singleSetWidth;
      } else if (el.scrollLeft <= 5) {
        el.scrollLeft += singleSetWidth;
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (e.button !== 0) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    isMouseDown.current = true;
    hasDragged.current = false;
    isHorizontalDrag.current = false;
    startX.current = e.pageX;
    currentX.current = e.pageX;
    startY.current = e.pageY;
    startScrollLeft.current = el.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isMouseDown.current || !scrollContainerRef.current) return;
    const deltaX = e.pageX - startX.current;
    const deltaY = e.pageY - startY.current;

    if (!isHorizontalDrag.current) {
      if (Math.abs(deltaX) > 6 && Math.abs(deltaX) > Math.abs(deltaY)) {
        isHorizontalDrag.current = true;
        hasDragged.current = true;
      } else if (Math.abs(deltaY) > 6) {
        isMouseDown.current = false;
        return;
      }
    }

    if (isHorizontalDrag.current) {
      currentX.current = e.pageX;
      scrollContainerRef.current.scrollLeft = startScrollLeft.current - deltaX;
    }
  };

  const handlePointerUp = () => {
    if (!isMouseDown.current) return;
    isMouseDown.current = false;

    const el = scrollContainerRef.current;
    if (el && hasDragged.current && isHorizontalDrag.current) {
      const firstCard = el.querySelector(".group") as HTMLElement | null;
      const cardWidth = firstCard ? firstCard.offsetWidth + 4 : 400;
      const singleSetWidth = el.scrollWidth / 3;

      const deltaX = currentX.current - startX.current;
      const dragThreshold = 40;

      let steps = 0;
      if (Math.abs(deltaX) >= dragThreshold) {
        const numCards = Math.max(1, Math.round(Math.abs(deltaX) / cardWidth));
        steps = deltaX < 0 ? numCards : -numCards;
      }

      const rawTarget = startScrollLeft.current + steps * cardWidth;
      let targetScroll = Math.round(rawTarget / cardWidth) * cardWidth;

      if (singleSetWidth > 0) {
        if (targetScroll >= 2 * singleSetWidth) {
          targetScroll -= singleSetWidth;
          el.scrollLeft -= singleSetWidth;
        } else if (targetScroll <= 0) {
          targetScroll += singleSetWidth;
          el.scrollLeft += singleSetWidth;
        }
      }

      el.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const togglePlace = (key: string) => {
    if (hasDragged.current || isScrolling.current) return;
    setActiveKey((prev) => (prev === key ? null : key));
  };

  const scrollByDirection = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const firstCard = el.querySelector(".group") as HTMLElement | null;
    const scrollAmount = firstCard ? firstCard.offsetWidth + 4 : 400;
    const singleSetWidth = el.scrollWidth / 3;

    if (singleSetWidth > 0) {
      if (direction === "left" && el.scrollLeft - scrollAmount <= 10) {
        el.scrollLeft += singleSetWidth;
      } else if (
        direction === "right" &&
        el.scrollLeft + scrollAmount >= 2 * singleSetWidth - 10
      ) {
        el.scrollLeft -= singleSetWidth;
      }
    }

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative flex flex-col gap-8 overflow-hidden pt-44 md:gap-12">
      <SectionHeader as="h2" subtitle="Find Your Place" title="Find Your Own Rhythm" />

      <div className="px-1">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex cursor-grab touch-pan-y [scrollbar-width:none] gap-1 overflow-x-auto select-none active:cursor-grabbing [&::-webkit-scrollbar]:hidden snap-x snap-mandatory md:snap-none"
        >
          {duplicatedPlaces.map((place, index) => {
            const uniqueKey = `${place.id}-${index}`;
            const isOpen = activeKey === uniqueKey;

            return (
              <div
                key={uniqueKey}
                onClick={() => togglePlace(uniqueKey)}
                className="group relative flex w-[85vw] h-[70dvh] shrink-0 cursor-pointer snap-start snap-always flex-col justify-end overflow-hidden p-6 sm:h-[75dvh] md:w-auto md:aspect-[2/3] md:h-[80dvh] md:snap-align-none"
              >
                <Image
                  src={place.image_url}
                  fill
                  alt={place.name}
                  draggable={false}
                  className="pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, 500px"
                />

                <div className="bg-foreground/25 absolute inset-0" />
                <div className="from-foreground/90 via-foreground/45 to-background/10 absolute inset-0 bg-gradient-to-t" />

                <div className="text-secondary relative z-10 flex w-full flex-col items-start gap-1 text-left">
                  <h3 className="font-medium uppercase sm:text-lg">
                    {place.name}
                  </h3>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        className="flex w-full flex-col items-start gap-3 overflow-hidden pt-3 text-left"
                      >
                        <p
                          className="text-secondary text-sm leading-relaxed font-normal"
                          dangerouslySetInnerHTML={{
                            __html: place.description,
                          }}
                        />

                        <div className="text-secondary text-xs leading-relaxed font-medium uppercase">
                          {place.capacity && (
                            <>
                              <span>
                                Capacity: Up to {place.capacity} Guests
                              </span>
                              <br />
                            </>
                          )}
                          <span>
                            {place.minimumSpend
                              ? `Min. Spend IDR ${place.minimumSpend.toLocaleString("id-ID")}++`
                              : "No Minimum Spend"}
                          </span>
                        </div>

                        <UnderlineLink
                          href="#reserve"
                          withUnderline
                          onClick={(e) => e.stopPropagation()}
                          className="text-secondary"
                        >
                          Discover More
                        </UnderlineLink>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 px-4 md:px-16">
        <CircleButton onClick={() => scrollByDirection("left")}>
          <MoveLeft className="h-5 w-5" />
        </CircleButton>
        <CircleButton onClick={() => scrollByDirection("right")}>
          <MoveRight className="h-5 w-5" />
        </CircleButton>
      </div>
    </section>
  );
};
