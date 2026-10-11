"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu } from "./menu";
import {
  topBarVariants,
  bottomBarVariants,
  opacityVariants,
  backgroundVariants,
} from "./anim";
import { navLinks } from "@/datas/navigation";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isColorActive, setIsColorActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHiddenInStories, setIsHiddenInStories] = useState(false);
  const lastScrollY = useRef(0);
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const heroThreshold = window.innerHeight - 80;
      setIsScrolled(currentScroll >= heroThreshold);

      const storiesEl = document.getElementById("stories");
      if (storiesEl) {
        const rect = storiesEl.getBoundingClientRect();
        const isInStories = rect.top <= 0 && rect.bottom >= 80;

        if (isInStories) {
          if (
            currentScroll > lastScrollY.current &&
            currentScroll - lastScrollY.current > 5
          ) {
            setIsHiddenInStories(true);
          } else if (currentScroll < lastScrollY.current) {
            setIsHiddenInStories(false);
          }
        } else {
          setIsHiddenInStories(false);
        }
      }

      lastScrollY.current = currentScroll;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleToggle = () => {
    if (!isOpen) {
      setIsColorActive(true);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const isLight = isColorActive || isScrolled;
  const isHidden = isHiddenInStories && !isOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-transform duration-500 ease-in-out ${
          isHidden ? "pointer-events-none -translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`relative flex w-full items-center justify-between px-4 transition-all duration-300 md:px-16 ${
            isScrolled ? "h-16 shadow-xs" : "h-25"
          } ${isLight ? "bg-background text-primary" : "text-secondary"}`}
        >
          <button
            type="button"
            tabIndex={0}
            onClick={handleToggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleToggle();
              }
            }}
            className="group flex cursor-pointer items-center justify-center gap-2.5 py-1 select-none md:px-3"
          >
            <div className="pointer-events-none relative flex h-3.5 w-5 flex-col items-center justify-center">
              <motion.span
                variants={topBarVariants}
                animate={isOpen ? "open" : "closed"}
                className={`block h-[1.5px] w-full transition-colors duration-300 ${
                  isLight ? "bg-foreground" : "bg-background"
                }`}
              />
              <motion.span
                variants={bottomBarVariants}
                animate={isOpen ? "open" : "closed"}
                className={`block h-[1.5px] w-full transition-colors duration-300 ${
                  isLight ? "bg-foreground" : "bg-background"
                }`}
              />
            </div>

            <div className="relative hidden items-center sm:flex">
              <motion.p
                variants={opacityVariants}
                animate={!isOpen ? "open" : "closed"}
                className={`text-sm font-medium uppercase transition-colors duration-300 ${
                  isLight ? "text-primary" : "text-secondary"
                }`}
              >
                Menu
              </motion.p>
              <motion.p
                variants={opacityVariants}
                animate={isOpen ? "open" : "closed"}
                className={`absolute text-sm font-medium uppercase transition-colors duration-300 ${
                  isLight ? "text-primary" : "text-secondary"
                }`}
              >
                Close
              </motion.p>
            </div>
          </button>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="inline-block">
              <Image
                src={
                  isLight
                    ? "/logos/logo-primary.webp"
                    : "/logos/logo-white.webp"
                }
                alt="Tropical Temptation Beach Club"
                width={180}
                height={70}
                className={`w-auto object-contain transition-all duration-300 ${
                  isScrolled ? "h-8 md:h-11" : "h-10 md:h-16"
                }`}
                priority
              />
            </Link>
          </div>

          <Link
            href="#"
            className={`text-sm font-medium uppercase transition-colors duration-300 ${
              isLight ? "text-primary" : "text-secondary"
            }`}
          >
            Reserve
          </Link>
        </div>

        <AnimatePresence
          mode="wait"
          onExitComplete={() => setIsColorActive(false)}
        >
          {isOpen && <Menu links={navLinks} onClose={handleClose} />}
        </AnimatePresence>

        <motion.div
          variants={backgroundVariants}
          initial="initial"
          animate={isOpen ? "open" : "closed"}
          onClick={handleClose}
          className={`absolute top-full left-0 w-full cursor-pointer overflow-hidden bg-black/50 ${
            isOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        />
      </header>
    </>
  );
};
