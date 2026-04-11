"use client";

import { motion } from "framer-motion";
import { revealUp, cardHover } from "@/libs/blog-utils";

const comparisonCards = [
  {
    eyebrow: "Writer-first",
    title: "A cleaner reading canvas",
    body: "Your stories stay front and center instead of competing with noise, recommendations, and crowded side rails.",
    className:
      "md:col-span-2 bg-[linear-gradient(135deg,_rgba(255,255,255,0.78),_rgba(232,242,255,0.86))]",
  },
  {
    eyebrow: "Publishing",
    title: "Direct blog control",
    body: "Publish, shape, and iterate on your own terms without platform friction.",
    className:
      "bg-[linear-gradient(180deg,_rgba(244,251,232,0.88),_rgba(223,241,196,0.92))]",
  },
  {
    eyebrow: "Identity",
    title: "Your brand, not theirs",
    body: "Build a recognizable space with your own voice, categories, visuals, and pacing.",
    className:
      "bg-[linear-gradient(180deg,_rgba(255,247,232,0.92),_rgba(255,232,205,0.9))]",
  },
  {
    eyebrow: "Speed",
    title: "Faster idea to publish loop",
    body: "Draft, review, and send live posts in one lightweight flow.",
    className:
      "md:col-span-2 bg-[linear-gradient(135deg,_rgba(236,242,250,0.92),_rgba(255,255,255,0.72))]",
  },
];

export default function WhyChooseSection() {
  return (
    <motion.section className="px-4 pb-8 md:px-6" {...revealUp}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 md:max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Why Choose Blogspace
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900 md:text-4xl">
            A bento layout built around why this feels better than Medium
          </h2>
          <p className="text-sm leading-6 text-slate-500 md:text-base">
            Less platform noise, more control over presentation, and a faster
            path from idea to published post.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {comparisonCards.map((card) => (
            <motion.article
              key={card.title}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardHover}
              className={`glass-panel rounded-[1.75rem] p-6 ${card.className}`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {card.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-900">
                {card.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
                {card.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
