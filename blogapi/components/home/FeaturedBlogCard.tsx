"use client";

import Link from "next/link";
import { type Blog } from "@/libs/types";
import { getReadTime, getInitials, formatDate, categoryTextColors, categoryGradientsHome } from "@/libs/blog-utils";

interface FeaturedBlogCardProps {
  blog: Blog;
}

export default function FeaturedBlogCard({ blog }: FeaturedBlogCardProps) {
  return (
    <Link href={`/blog/${blog._id}`} className="block mt-6 rounded-[1.75rem] hover:opacity-90 transition-opacity">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-[280px] overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,_#e9f5c6,_#d7ecbd_35%,_#c8dfb1_72%,_#bdd59f_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.5),_transparent_55%)]" />
          <div className="relative mx-auto mt-10 w-full max-w-[260px] rounded-[1.7rem] border border-white/60 bg-white/78 p-5 shadow-[0_18px_45px_rgba(100,128,96,0.25)] backdrop-blur">
            <div className="rounded-[1.25rem] border border-slate-100 bg-white px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <p className="text-xs text-slate-400">{getReadTime(blog.content)}</p>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">{getInitials(blog.author)}</p>
                  <p className="text-lg text-slate-700">{blog.author}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#e8f0ff,_#fff0c4_65%,_#ffd8df)] text-lg shadow-sm">
                  {getInitials(blog.author)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <article className="flex flex-col justify-center rounded-[1.75rem] bg-white/55 p-2">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Featured
          </p>
          <h3 className="mt-3 max-w-md text-3xl leading-tight font-semibold tracking-[-0.04em] text-slate-900 md:text-4xl">
            {blog.title}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-500 md:text-base">
            {blog.content.slice(0, 160)}
            {blog.content.length > 160 ? "…" : ""}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span
              className={`rounded-full bg-slate-100 px-3 py-1.5 font-medium ${categoryTextColors[blog.category] ?? "text-slate-600"
                }`}
            >
              {blog.category}
            </span>
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </article>
      </div>
    </Link>
  );
}
