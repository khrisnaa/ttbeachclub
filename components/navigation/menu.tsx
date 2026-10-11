"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { heightVariants } from "./anim";
import { MenuBody, type SelectedLinkState } from "./menu-body";
import { MenuFooter } from "./menu-footer";
import type { NavLinkItem } from "@/types/navigation";

interface MenuProps {
  links: NavLinkItem[];
  onClose: () => void;
}

export const Menu = ({ links, onClose }: MenuProps) => {
  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: false,
    index: 0,
  });

  const activeItem = selectedLink.isActive ? links[selectedLink.index] : null;

  return (
    <motion.div
      variants={heightVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="bg-background relative overflow-hidden"
    >
      <div className="flex h-full flex-col justify-between px-4 pt-4 pb-6 md:px-16 md:pt-6 md:pb-8">
        <div className="flex min-h-0 flex-1 flex-col-reverse justify-between gap-6 lg:flex-row lg:items-stretch lg:gap-10">
          <div className="flex flex-1 items-center">
            <MenuBody
              links={links}
              selectedLink={selectedLink}
              setSelectedLink={setSelectedLink}
              onClose={onClose}
            />
          </div>

          <div className="hidden h-full shrink-0 lg:block lg:w-[380px] xl:w-[440px] 2xl:w-[480px]">
            <div className="relative h-full w-full overflow-hidden">
              {activeItem && (
                <Image
                  src={activeItem.image_url}
                  alt={activeItem.label}
                  fill
                  sizes="(min-width: 1536px) 480px, (min-width: 1280px) 440px, 380px"
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        <MenuFooter />
      </div>
    </motion.div>
  );
};

export default Menu;
