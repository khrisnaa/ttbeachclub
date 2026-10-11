"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "@/datas/events";
import { UnderlineLink } from "@/components/ui/underline-link";
import { SectionHeader } from "@/components/ui/section-header";

export const Events = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleEvent = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="flex flex-col gap-8 md:gap-12">
      <SectionHeader subtitle="What's On" title="See What's Happening" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1">
        {events.map((item, index) => {
          const isOpen = activeId === item.id;
          const isFullWidth = index === 2;

          return (
            <div
              key={item.id}
              onClick={() => toggleEvent(item.id)}
              className={`group relative flex h-screen cursor-pointer flex-col justify-end overflow-hidden ${
                isFullWidth ? "md:col-span-2" : ""
              }`}
            >
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  fill
                  alt={`${item.category} - ${item.title}`}
                  className={`object-cover ${
                    isOpen ? "hidden" : "group-hover:hidden"
                  }`}
                  sizes={
                    isFullWidth ? "100vw" : "(max-width: 768px) 100vw, 50vw"
                  }
                />

                <Image
                  src={item.hoverImage}
                  fill
                  alt={`${item.category} - ${item.title} Detail`}
                  className={`object-cover ${
                    isOpen ? "block" : "hidden group-hover:block"
                  }`}
                  sizes={
                    isFullWidth ? "100vw" : "(max-width: 768px) 100vw, 50vw"
                  }
                />

                <div className="bg-foreground/30 absolute inset-0" />
                <div className="from-foreground/85 via-foreground/40 to-background/15 absolute inset-0 bg-gradient-to-t" />
              </div>

              <div className="text-secondary relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center gap-1 px-4 py-12 text-center select-none">
                <span className="text-sm font-medium uppercase">
                  {item.category}
                </span>
                <h4 className="text-3xl font-medium uppercase">{item.title}</h4>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="flex flex-col items-center gap-4 overflow-hidden pt-3"
                    >
                      <p
                        className="text-secondary max-w-lg text-sm leading-relaxed font-normal text-balance"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                      {item.detail && (
                        <div
                          className="text-secondary max-w-md text-xs leading-relaxed font-medium tracking-wider text-balance uppercase sm:text-sm"
                          dangerouslySetInnerHTML={{ __html: item.detail }}
                        />
                      )}
                      <UnderlineLink
                        href={item.href}
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
    </section>
  );
};

export default Events;
