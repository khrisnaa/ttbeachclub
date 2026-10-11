"use client";

import { motion } from "framer-motion";
import { translateVariants } from "./anim";
import { UnderlineLink } from "../ui/underline-link";

export const MenuFooter = () => {
  return (
    <div className="flex flex-col items-start gap-2.5 pt-3 text-xs uppercase sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:text-sm md:gap-8 lg:gap-16">
      <div>
        <UnderlineLink href="#">Get Voucher</UnderlineLink>
      </div>

      <div className="overflow-hidden">
        <motion.span
          custom={[0.3, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="text-primary inline-block font-medium"
        >
          Open Daily 7 AM – 9 PM
        </motion.span>
      </div>

      <div className="overflow-hidden">
        <motion.span
          custom={[0.25, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="text-primary inline-block font-medium"
        >
          Jl. Melasti Beach 88, Ungasan, Bali
        </motion.span>
      </div>
    </div>
  );
};
