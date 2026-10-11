"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { programs } from "@/datas/programs";
import { SectionHeader } from "@/components/ui/section-header";

export const Programs = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <section className="px-1">
      <div className="flex flex-col gap-12 py-12 md:hidden">
        <div className="px-4">
          <SectionHeader
            as="h2"
            subtitle="Find Your Place"
            title="Find Your Own Rhythm"
            align="left"
          />
        </div>

        <div className="flex flex-col gap-10">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={program.href || "#"}
              className="border-foreground/20 flex flex-col gap-4 border-b pb-8 last:border-b-0"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={program.image}
                  fill
                  alt={program.title}
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="bg-foreground/25 pointer-events-none absolute inset-0" />
              </div>

              <div className="flex flex-col gap-1.5 px-4">
                <h3 className="text-xl font-medium uppercase">
                  {program.title}
                </h3>
                <p className="text-sm font-medium">{program.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden grid-cols-2 gap-1 md:grid">
        <div className="flex items-center justify-center px-6 py-16 sm:px-12 md:py-0">
          <div className="flex w-full max-w-lg flex-col gap-32">
            <SectionHeader
              as="h2"
              subtitle="Find Your Place"
              title="Find Your Own Rhythm"
              align="left"
            />

            <div
              className="border-foreground flex flex-col border-t"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {programs.map((program, index) => {
                const isBlurred =
                  hoveredIndex !== null && hoveredIndex !== index;

                return (
                  <Link
                    key={program.id}
                    href={program.href || "#"}
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      setActiveImageIndex(index);
                    }}
                    className={`border-foreground block cursor-pointer space-y-1 border-b py-5 transition-all duration-300 select-none ${
                      isBlurred ? "blur-[2px]" : "blur-0"
                    }`}
                  >
                    <h3 className="text-xl font-medium uppercase">
                      {program.title}
                    </h3>
                    <p className="text-sm font-medium">{program.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative h-[60vh] w-full overflow-hidden md:h-screen">
          {programs.map((program, index) => {
            const isActive = activeImageIndex === index;

            return (
              <Image
                key={program.id}
                src={program.image}
                fill
                alt={program.title}
                priority={index === 0}
                className={`object-cover transition-opacity duration-500 ease-in-out ${
                  isActive ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            );
          })}
          <div className="bg-foreground/25 pointer-events-none absolute inset-0" />
        </div>
      </div>
    </section>
  );
};
