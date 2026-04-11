"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { revealUp } from "@/libs/blog-utils";

interface HeroProps {
  heroRef: React.RefObject<HTMLElement | null>;
  heroTextY: MotionValue<number>;
  heroTextOpacity: MotionValue<number>;
}

export default function Hero({ heroRef, heroTextY, heroTextOpacity }: HeroProps) {
  return (
    <motion.section
      ref={heroRef}
      {...revealUp}
      className="relative px-4 pb-16 pt-4 md:px-6 md:pb-24"
    >
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/40 bg-white/10 shadow-[0_24px_90px_rgba(88,108,136,0.15)] backdrop-blur-sm"
      >
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="relative px-5 pb-60 pt-18 text-center md:px-8 md:pb-[22rem] md:pt-24"
        >
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl leading-none font-semibold tracking-[-0.04em] text-white md:text-7xl">
            Inspiration from
            <span className="block font-serif text-[1.03em] font-semibold italic">
              real journeys
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm font-sans leading-6 text-white/75 md:text-base">
            Essays, tools, and field notes for building standout careers and
            thoughtful creative work.
          </p>
        </motion.div>

        <div className="hero-fade absolute inset-x-0 bottom-0 h-64" />
      </motion.div>
    </motion.section>
  );
}
