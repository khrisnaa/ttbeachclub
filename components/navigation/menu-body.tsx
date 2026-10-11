"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { blurVariants, translateVariants } from "./anim";
import type { NavLinkItem } from "@/types/navigation";

export interface SelectedLinkState {
  isActive: boolean;
  index: number;
}

interface MenuBodyProps {
  links: NavLinkItem[];
  selectedLink: SelectedLinkState;
  setSelectedLink: React.Dispatch<React.SetStateAction<SelectedLinkState>>;
  onClose?: () => void;
}

export const MenuBody = ({
  links,
  selectedLink,
  setSelectedLink,
  onClose,
}: MenuBodyProps) => {
  const getChars = (word: string) => {
    return word.split("").map((char, i) => (
      <motion.span
        key={`${char}-${i}`}
        custom={[i * 0.02, (word.length - i) * 0.01]}
        variants={translateVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="inline-block transform-gpu"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <div className="flex flex-1">
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-6 sm:gap-y-2.5 md:gap-x-8 md:gap-y-3 lg:gap-x-6 lg:gap-y-2 xl:gap-x-8 xl:gap-y-3">
        {links.map((link, index) => {
          const isBlurred =
            selectedLink.isActive && selectedLink.index !== index;

          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="group text-primary inline-block"
            >
              <motion.div
                onMouseEnter={() => setSelectedLink({ isActive: true, index })}
                onMouseLeave={() => setSelectedLink({ isActive: false, index })}
                variants={blurVariants}
                animate={isBlurred ? "open" : "closed"}
                className="flex items-baseline overflow-hidden py-0.5"
              >
                <div className="text-primary flex flex-wrap overflow-hidden text-2xl leading-tight font-medium uppercase sm:text-3xl md:text-[2rem] lg:text-[1.625rem] xl:text-[1.875rem] 2xl:text-[2.25rem]">
                  {getChars(link.label)}
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
