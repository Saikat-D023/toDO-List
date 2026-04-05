"use client";

import BlogClient from "@/components/BlogClient";
import { categories as blogCategories } from "@/libs/categories";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const revealUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.01,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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

type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
};

type SortOrder = "newest" | "oldest";

const categoryGradients: Record<string, string> = {
  Technology: "bg-[linear-gradient(180deg,_#e8f0ff,_#d0e4ff_55%,_#c4d9f5_100%)]",
  Health: "bg-[linear-gradient(180deg,_#ffe8f0,_#ffd0dd_55%,_#ffc5d3_100%)]",
  Lifestyle: "bg-[linear-gradient(180deg,_#f0ffe8,_#d9f5d0_55%,_#c8ecc0_100%)]",
  Education: "bg-[linear-gradient(180deg,_#fff8e8,_#ffecc0_55%,_#ffe3ad_100%)]",
  Travel: "bg-[linear-gradient(180deg,_#f0f8ff,_#d8ecff_55%,_#c8e0f8_100%)]",
};

const categoryTextColors: Record<string, string> = {
  Technology: "text-blue-700",
  Health: "text-rose-700",
  Lifestyle: "text-emerald-700",
  Education: "text-amber-700",
  Travel: "text-sky-700",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);

  // ── Blog data state ──────────────────────────────────────────
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogsError, setBlogsError] = useState("");

  // ── Filter / sort state ──────────────────────────────────────
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  // ── Categories list ─────────────────────────────────────────
  const categories = ["All", ...blogCategories];

  // ── Fetch blogs from API ─────────────────────────────────────
  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (res.ok) {
        setBlogs(data.blogs || []);
      } else {
        setBlogsError(data.message || "Failed to load blogs.");
      }
    } catch {
      setBlogsError("Could not connect to the server.");
    } finally {
      setLoadingBlogs(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // ── Derived: featured (most recent) ──────────────────────────
  const sortedForFeatured = [...blogs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const featuredBlog = sortedForFeatured[0] ?? null;

  // ── Derived: filtered + sorted grid ─────────────────────────
  const filteredBlogs = blogs
    .filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.content.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return sortOrder === "newest" ? diff : -diff;
    });

  // ── Scroll animations ────────────────────────────────────────
  const { scrollY } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rawArticlesY = useTransform(scrollY, [0, 700], [220, -40]);
  const rawArticlesOpacity = useTransform(scrollY, [0, 180, 520], [0.45, 0.85, 1]);
  const rawArticlesScale = useTransform(scrollY, [0, 500], [0.92, 1]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, -110]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.75, 1], [1, 0.55, 0.2]);

  const articlesY = useSpring(rawArticlesY, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  const articlesOpacity = useSpring(rawArticlesOpacity, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  const articlesScale = useSpring(rawArticlesScale, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  // ── Reset filters when a new blog is added ───────────────────
  const handleBlogAdded = useCallback(() => {
    fetchBlogs();
    setSearch("");
    setSelectedCategory("All");
    setSortOrder("newest");
  }, [fetchBlogs]);

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-900">
      <div className="cloud-glow left-[-2rem] top-32 h-32 w-44 md:h-40 md:w-56" />
      <div className="cloud-glow right-[-1rem] top-28 h-36 w-48 md:h-44 md:w-60" />
      <div className="cloud-glow left-[18%] top-16 h-16 w-28 opacity-80" />

      {/* ── Hero ─────────────────────────────────────────────── */}
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
          <header className="flex items-center justify-between px-5 py-4 text-sm text-white/92 md:px-7">
            <div className="flex items-center gap-2 font-medium tracking-wide">
              <motion.span
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ duration: 0.24 }}
                className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/35 bg-white/18 text-xs"
              >
                B
              </motion.span>
              <span>Blogspace</span>
            </div>

            <motion.button
              whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.26)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="rounded-full border border-white/25 bg-white/16 px-4 py-2 text-xs font-medium text-white/90 transition"
            >
              Menu
            </motion.button>
          </header>

          <motion.div
            style={{ y: heroTextY, opacity: heroTextOpacity }}
            className="relative px-5 pb-60 pt-18 text-center md:px-8 md:pb-[22rem] md:pt-24"
          >
            <p className="text-sm text-white/70">Blog</p>
            <h1 className="mx-auto mt-4 max-w-3xl text-5xl leading-none font-semibold tracking-[-0.04em] text-white md:text-7xl">
              Inspiration from
              <span className="block font-serif text-[1.03em] font-semibold italic">
                real journeys
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/75 md:text-base">
              Essays, tools, and field notes for building standout careers and
              thoughtful creative work.
            </p>
          </motion.div>

          <div className="hero-fade absolute inset-x-0 bottom-0 h-64" />
        </motion.div>
      </motion.section>

      {/* ── Articles ──────────────────────────────────────────── */}
      <motion.section
        style={{ y: articlesY, opacity: articlesOpacity, scale: articlesScale }}
        className="relative z-10 -mt-64 px-4 pb-16 will-change-transform md:-mt-[19rem] md:px-6"
        {...revealUp}
      >
        <div className="glass-panel mx-auto max-w-6xl rounded-[2rem] p-4 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Articles</h2>
            <label className="flex h-12 w-full items-center gap-3 rounded-full bg-white/80 px-4 text-sm text-slate-400 shadow-inner md:max-w-xs">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent text-slate-600 outline-none placeholder:text-slate-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>

          {/* ── Featured blog card (most recent) ─────────────── */}
          {loadingBlogs ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div className="flex min-h-[280px] items-center justify-center rounded-[1.75rem] bg-slate-100">
                <p className="text-sm text-slate-400">Loading...</p>
              </div>
              <div className="flex items-center justify-center rounded-[1.75rem] bg-white/40 p-6">
                <p className="text-sm text-slate-400">Loading featured...</p>
              </div>
            </div>
          ) : featuredBlog ? (
            <Link href={`/blog/${featuredBlog._id}`} className="block mt-6 rounded-[1.75rem] hover:opacity-90 transition-opacity">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div className="relative min-h-[280px] overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,_#e9f5c6,_#d7ecbd_35%,_#c8dfb1_72%,_#bdd59f_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.5),_transparent_55%)]" />
                <div className="relative mx-auto mt-10 w-full max-w-[260px] rounded-[1.7rem] border border-white/60 bg-white/78 p-5 shadow-[0_18px_45px_rgba(100,128,96,0.25)] backdrop-blur">
                  <div className="rounded-[1.25rem] border border-slate-100 bg-white px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <p className="text-xs text-slate-400">{getReadTime(featuredBlog.content)}</p>
                    <div className="mt-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold">{getInitials(featuredBlog.author)}</p>
                        <p className="text-lg text-slate-700">{featuredBlog.author}</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_#e8f0ff,_#fff0c4_65%,_#ffd8df)] text-lg shadow-sm">
                        *
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
                  {featuredBlog.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-500 md:text-base">
                  {featuredBlog.content.slice(0, 160)}
                  {featuredBlog.content.length > 160 ? "…" : ""}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span
                    className={`rounded-full bg-slate-100 px-3 py-1.5 font-medium ${categoryTextColors[featuredBlog.category] ?? "text-slate-600"
                      }`}
                  >
                    {featuredBlog.category}
                  </span>
                  <span>{formatDate(featuredBlog.createdAt)}</span>
                </div>
              </article>
            </div>
            </Link>
          ) : (
            <div className="mt-6 flex min-h-[200px] items-center justify-center rounded-[1.75rem] bg-white/40">
              <p className="text-sm text-slate-400">
                No blogs yet. Be the first to publish one below!
              </p>
            </div>
          )}

          {/* ── Category filter pills ─────────────────────────── */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm transition ${selectedCategory === category
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
                setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
              }
              className="w-fit rounded-full bg-white/80 px-4 py-2 text-sm text-slate-600"
            >
              {sortOrder === "newest" ? "↓ Newest" : "↑ Oldest"}
            </motion.button>
          </div>

          {/* ── Blog grid ─────────────────────────────────────── */}
          {loadingBlogs ? (
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
          ) : filteredBlogs.length === 0 ? (
            <div className="mt-6 flex min-h-[160px] items-center justify-center rounded-[1.5rem] bg-white/40">
              <p className="text-sm text-slate-400">
                {blogs.length === 0
                  ? "No blogs published yet."
                  : "No blogs match your search."}
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {filteredBlogs.map((blog) => (
                <Link key={blog._id} href={`/blog/${blog._id}`} className="block">
                <motion.article
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={cardHover}
                  className="flex gap-4 rounded-[1.5rem] bg-white/72 p-4 shadow-[0_10px_35px_rgba(88,108,136,0.08)]"
                >
                  <div
                    className={`flex h-28 w-32 shrink-0 items-center justify-center rounded-[1.25rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${categoryGradients[blog.category] ?? "bg-slate-100"
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
          )}

          {blogsError && (
            <p className="mt-4 text-center text-sm text-red-500">{blogsError}</p>
          )}
        </div>
      </motion.section>

      {/* ── Add Blog ───────────────────────────────────────────── */}
      <motion.section className="px-4 pb-8 md:px-6" {...revealUp}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel mx-auto max-w-6xl rounded-[2rem] p-5 md:p-8"
        >
          <div className="mb-8 flex flex-col gap-3 md:max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Add Blogs
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900 md:text-4xl">
              Add a blog without leaving the landing page
            </h2>
            <p className="text-sm leading-6 text-slate-500 md:text-base">
              This section turns the homepage into an active publishing surface,
              not just a static showcase.
            </p>
          </div>

          <BlogClient onBlogAdded={handleBlogAdded} />
        </motion.div>
      </motion.section>

      {/* ── Why Blogspace ──────────────────────────────────────── */}
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

      {/* ── Footer ─────────────────────────────────────────────── */}
      <motion.footer className="px-4 pb-10 pt-6 md:px-6" {...revealUp}>
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.24 }}
          className="glass-panel mx-auto flex max-w-6xl flex-col gap-6 rounded-[1.75rem] px-6 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-8"
        >
          <div>
            <p className="text-base font-semibold text-slate-800">Blogspace</p>
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
            <span className="text-slate-400">(c) 2026 Blogspace</span>
          </div>
        </motion.div>
      </motion.footer>
    </main>
  );
}
