"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type Blog } from "@/libs/types";
import {
  getInitials,
  formatDate,
  categoryGradientsHome,
  categoryTextColors,
  cardHover,
} from "@/libs/blog-utils";

interface BlogGridProps {
  blogs: Blog[];
  loading: boolean;
  allBlogsCount: number;
}

export default function BlogGrid({ blogs, loading, allBlogsCount }: BlogGridProps) {
  if (loading) {
    return (
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[1, 2].map((n) => (
          <div
            key={n}
            className="flex h-40 animate-pulse items-center justify-center rounded-[1.5rem] bg-white/60"
          >
            <p className="text-sm text-slate-400">Loading...</p>
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="mt-6 flex min-h-[160px] items-center justify-center rounded-[1.5rem] bg-white/40">
        <p className="text-sm text-slate-400">
          {allBlogsCount === 0
            ? "No blogs published yet."
            : "No blogs match your search."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {blogs.map((blog) => (
        <Link key={blog._id} href={`/blog/${blog._id}`} className="block">
          <motion.article
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardHover}
            className="flex gap-4 rounded-[1.5rem] bg-white/72 p-4 shadow-[0_10px_35px_rgba(88,108,136,0.08)]"
          >
            <div
              className={`flex h-28 w-32 shrink-0 items-center justify-center rounded-[1.25rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${categoryGradientsHome[blog.category] ?? "bg-slate-100"
                }`}
            >
              <div className="w-20 rounded-2xl border border-white/70 bg-white/85 p-3 text-center shadow-sm">
                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-300">
                  Preview
                </p>
                <div className="mt-3 text-xs font-medium text-slate-600">
                  {getInitials(blog.author)}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h4 className="text-xl leading-tight font-medium tracking-[-0.03em] text-slate-800">
                {blog.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {blog.content.slice(0, 80)}
                {blog.content.length > 80 ? "…" : ""}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span
                  className={`font-medium ${categoryTextColors[blog.category] ?? "text-slate-500"
                    }`}
                >
                  {blog.category}
                </span>
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </div>
          </motion.article>
        </Link>
      ))}
    </div>
  );
}
