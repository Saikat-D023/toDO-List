"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use, useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  HeartPulse,
  Leaf,
  Plane,
  User,
} from "lucide-react";

const categoryIcons = {
  Technology: BookOpen,
  Health: HeartPulse,
  Lifestyle: Leaf,
  Education: BriefcaseBusiness,
  Travel: Plane,
} as const;

const categoryGradients: Record<string, string> = {
  Technology:
    "from-blue-100 via-blue-50 to-white",
  Health:
    "from-rose-100 via-rose-50 to-white",
  Lifestyle:
    "from-emerald-100 via-emerald-50 to-white",
  Education:
    "from-amber-100 via-amber-50 to-white",
  Travel:
    "from-sky-100 via-sky-50 to-white",
};

const categoryTextColors: Record<string, string> = {
  Technology: "text-blue-700",
  Health: "text-rose-700",
  Lifestyle: "text-emerald-700",
  Education: "text-amber-700",
  Travel: "text-sky-700",
};

const categoryBgColors: Record<string, string> = {
  Technology: "bg-blue-100 text-blue-700",
  Health: "bg-rose-100 text-rose-700",
  Lifestyle: "bg-emerald-100 text-emerald-700",
  Education: "bg-amber-100 text-amber-700",
  Travel: "bg-sky-100 text-sky-700",
};

type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");

  const fetchBlog = useCallback(async () => {
    console.log("[BlogPage] fetching blog with id:", id, "type:", typeof id);
    try {
      const res = await fetch(`/api/blogs/${id}`);
      console.log("[BlogPage] response status:", res.status, "url:", res.url);
      const data = await res.json();
      console.log("[BlogPage] response data:", JSON.stringify(data));
      if (res.ok && data.blog) {
        setBlog(data.blog);
      } else {
        setError(data.message || "Blog not found.");
        setDebugInfo(`URL: ${res.url} | Status: ${res.status} | ID: ${id} | Body: ${JSON.stringify(data)}`);
      }
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const Icon = blog ? categoryIcons[blog.category as keyof typeof categoryIcons] : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      {/* ── Ambient glow blobs ──────────────────────────────── */}
      <div className="cloud-glow left-[-4rem] top-20 h-48 w-64 opacity-30 md:h-64 md:w-80" />
      <div className="cloud-glow right-[-2rem] top-40 h-40 w-56 opacity-25 md:h-56 md:w-72" />
      <div className="cloud-glow left-[30%] top-[60%] h-32 w-48 opacity-20" />

      {/* ── Top nav bar ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-20 glass-panel mx-4 mt-4 rounded-[1.5rem] px-4 py-3 md:mx-8"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-white/70 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <motion.span
              whileHover={{ rotate: 8, scale: 1.08 }}
              transition={{ duration: 0.24 }}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs"
            >
              B
            </motion.span>
            <span className="text-sm">Blogspace</span>
          </div>
        </div>
      </motion.div>

      {/* ── Main content ────────────────────────────────────── */}
      <div className="mx-4 pb-16 md:mx-8">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel mt-6 rounded-[2rem] p-8 md:p-12"
          >
            <div className="mx-auto max-w-3xl animate-pulse space-y-6">
              <div className="h-8 w-48 rounded-full bg-slate-200" />
              <div className="h-14 w-full rounded-2xl bg-slate-200" />
              <div className="h-14 w-4/5 rounded-2xl bg-slate-200" />
              <div className="mt-10 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-5 w-full rounded-lg bg-slate-100"
                    style={{ width: `${85 + Math.random() * 15}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel mt-6 flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] p-12 text-center"
          >
            <p className="text-5xl">📭</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-800">
              Blog not found
            </h2>
            <p className="mt-2 max-w-sm text-slate-500">{error}</p>
            {debugInfo && (
              <pre className="mt-4 max-w-2xl rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-left text-red-700 font-mono overflow-auto">{debugInfo}</pre>
            )}
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>
          </motion.div>
        ) : blog ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            {/* ── Category & meta pill ─────────────────────────── */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium ${
                  categoryBgColors[blog.category] ?? "bg-slate-100 text-slate-600"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {blog.category}
              </span>
              <span className="text-slate-400 text-sm">
                {getReadTime(blog.content)}
              </span>
            </div>

            {/* ── Article header ──────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
              className="glass-panel overflow-hidden rounded-[2rem] shadow-[0_24px_80px_rgba(88,108,136,0.14)]"
            >
              {/* ── Decorative gradient header ────────────────── */}
              <div
                className={`relative overflow-hidden bg-gradient-to-br ${categoryGradients[blog.category] ?? "from-slate-100 via-white to-slate-50"} px-8 py-10 md:px-12 md:py-14`}
              >
                {/* Radial highlight */}
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-white/20 blur-2xl" />

                <div className="relative">
                  <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-[-0.04em] text-slate-900 md:text-5xl lg:text-6xl">
                    {blog.title}
                  </h1>
                </div>
              </div>

              {/* ── Author + date strip ───────────────────────── */}
              <div className="border-t border-slate-100 bg-white/60 px-8 py-5 md:px-12">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Author block */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.2 }}
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${
                        categoryGradients[blog.category]?.split(" ")[0] ?? "from-slate-200"
                      } to-white text-lg font-semibold shadow-sm border border-white/80 ${
                        categoryTextColors[blog.category] ?? "text-slate-700"
                      }`}
                    >
                      {getInitials(blog.author)}
                    </motion.div>
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        {blog.author}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(blog.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Read time */}
                  <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500">
                    {getReadTime(blog.content)} read
                  </div>
                </div>
              </div>

              {/* ── Content body ───────────────────────────────── */}
              <div className="bg-white/70 px-8 py-10 md:px-12 md:py-12">
                <div className="mx-auto max-w-3xl">
                  {/* Drop cap style opening */}
                  <p className="text-lg leading-8 text-slate-700 md:text-xl">
                    <span className="float-left mr-3 mt-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-white text-3xl font-serif font-semibold text-slate-800 shadow-sm border border-slate-200">
                      {getInitials(blog.author).charAt(0)}
                    </span>
                    {blog.content}
                  </p>

                  {/* ── Category footer chip ─────────────────── */}
                  <div className="mt-12 flex items-center justify-center">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium shadow-sm border ${
                        categoryBgColors[blog.category] ?? "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {blog.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Back link ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 flex justify-center"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-medium text-slate-600 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:shadow-slate-200/50"
              >
                <ArrowLeft className="h-4 w-4" />
                Explore more articles
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </div>
    </main>
  );
}
