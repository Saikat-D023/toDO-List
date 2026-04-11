"use client";

import { motion } from "framer-motion";
import { type SortOrder } from "@/libs/types";

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: (prev: SortOrder) => SortOrder) => void;
}

export default function CategoryFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
}: CategoryFiltersProps) {
  return (
    <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              selectedCategory === category
                ? "bg-slate-800 text-white"
                : "bg-white/78 text-slate-600 hover:bg-white"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.18 }}
        onClick={() =>
          setSortOrder((prev: SortOrder) => (prev === "newest" ? "oldest" : "newest"))
        }
        className="w-fit rounded-full bg-white/80 px-4 py-2 text-sm text-slate-600"
      >
        {sortOrder === "newest" ? "↓ Newest" : "↑ Oldest"}
      </motion.button>
    </div>
  );
}
