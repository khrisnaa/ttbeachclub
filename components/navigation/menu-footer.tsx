"use client";

import { motion } from "framer-motion";
import { translateVariants } from "./anim";

export const MenuFooter = () => {
  return (
    <div className="flex flex-wrap items-center gap-8 pt-3 text-xs uppercase sm:text-sm md:gap-16">
      <div className="overflow-hidden">
        <motion.span
          custom={[0.25, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="text-primary inline-block transform-gpu font-semibold"
        >
          Jl. Melasti Beach 88, Ungasan, Bali
        </motion.span>
      </div>

      <div className="overflow-hidden">
        <motion.span
          custom={[0.3, 0]}
          variants={translateVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="text-primary inline-block transform-gpu font-semibold"
        >
          Open Daily 7 AM – 9 PM
        </motion.span>
      </div>
    </div>
  );
};
