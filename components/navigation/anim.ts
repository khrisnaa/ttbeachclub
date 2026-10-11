import { type Transition, type Variants } from "framer-motion";

export const easeCurve = [0.76, 0, 0.24, 1] as const;

export const transition: Transition = {
  duration: 1,
  ease: easeCurve,
};

export const buttonTransition: Transition = {
  duration: 0.35,
  ease: easeCurve,
};

export const topBarVariants: Variants = {
  closed: { rotate: 0, y: -4, transition: buttonTransition },
  open: { rotate: 45, y: 0.75, transition: buttonTransition },
};

export const bottomBarVariants: Variants = {
  closed: { rotate: 0, y: 4, transition: buttonTransition },
  open: { rotate: -45, y: -0.75, transition: buttonTransition },
};

export const opacityVariants: Variants = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.35 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.35 },
  },
};
export const opacity = opacityVariants;

export const blurVariants: Variants = {
  initial: {
    filter: "blur(0px)",
    opacity: 1,
  },
  open: {
    filter: "blur(4px)",
    opacity: 0.6,
    transition: { duration: 0.3 },
  },
  closed: {
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.3 },
  },
};
export const blur = blurVariants;

export const translateVariants: Variants = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  enter: (i: [number, number] = [0, 0]) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: easeCurve, delay: i[0] },
  }),
  exit: (i: [number, number] = [0, 0]) => ({
    y: "100%",
    opacity: 0,
    transition: { duration: 0.7, ease: easeCurve, delay: i[1] },
  }),
};
export const translate = translateVariants;

export const heightVariants: Variants = {
  initial: {
    height: 0,
  },
  enter: {
    height: "60vh",
    transition,
  },
  exit: {
    height: 0,
    transition,
  },
};
export const height = heightVariants;

export const backgroundVariants: Variants = {
  initial: {
    height: 0,
  },
  open: {
    height: "100vh",
    transition,
  },
  closed: {
    height: 0,
    transition,
  },
};
export const background = backgroundVariants;
