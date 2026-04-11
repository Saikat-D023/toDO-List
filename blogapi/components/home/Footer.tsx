"use client";

import { motion } from "framer-motion";
import { revealUp } from "@/libs/blog-utils";

export default function Footer() {
  return (
    <motion.footer className="px-4 pb-10 pt-6 md:px-6" {...revealUp}>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.24 }}
        className="glass-panel mx-auto flex max-w-6xl flex-col gap-6 rounded-[1.75rem] px-6 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-8"
      >
        <div>
          <p className="text-base italic font-serif text-slate-800">real Journeys</p>
          <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
            Stories, practical guides, and calm design for people building
            better work.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-slate-500">
          <motion.a
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18 }}
            className="transition hover:text-slate-800"
            href="#"
          >
            About
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18 }}
            className="transition hover:text-slate-800"
            href="#"
          >
            Articles
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18 }}
            className="transition hover:text-slate-800"
            href="#"
          >
            Contact
          </motion.a>
          <span className="text-slate-400">(c) 2026 real Journeys</span>
        </div>
      </motion.div>
    </motion.footer>
  );
}
