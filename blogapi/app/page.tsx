"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import BlogClient from "@/components/BlogClient";
import Hero from "@/components/home/Hero";
import FeaturedBlogCard from "@/components/home/FeaturedBlogCard";
import CategoryFilters from "@/components/home/CategoryFilters";
import BlogGrid from "@/components/home/BlogGrid";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import Footer from "@/components/home/Footer";
import { categories as blogCategories } from "@/libs/categories";
import { revealUp } from "@/libs/blog-utils";
import { useBlogs } from "@/hooks/useBlogs";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const categories = ["All", ...blogCategories];

  const {
    blogs,
    filteredBlogs,
    featuredBlog,
    loading,
    error,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
    handleBlogAdded,
  } = useBlogs();

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

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-900">
      <div className="cloud-glow left-[-2rem] top-32 h-32 w-44 md:h-40 md:w-56" />
      <div className="cloud-glow right-[-1rem] top-28 h-36 w-48 md:h-44 md:w-60" />
      <div className="cloud-glow left-[18%] top-16 h-16 w-28 opacity-80" />

      <Hero
        heroRef={heroRef}
        heroTextY={heroTextY}
        heroTextOpacity={heroTextOpacity}
      />

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

          {!loading && featuredBlog && <FeaturedBlogCard blog={featuredBlog} />}
          {loading && (
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div className="flex min-h-[280px] items-center justify-center rounded-[1.75rem] bg-slate-100">
                <p className="text-sm text-slate-400">Loading...</p>
              </div>
              <div className="flex items-center justify-center rounded-[1.75rem] bg-white/40 p-6">
                <p className="text-sm text-slate-400">Loading featured...</p>
              </div>
            </div>
          )}
          {!loading && !featuredBlog && (
            <div className="mt-6 flex min-h-[200px] items-center justify-center rounded-[1.75rem] bg-white/40">
              <p className="text-sm text-slate-400">
                No blogs yet. Be the first to publish one below!
              </p>
            </div>
          )}

          <CategoryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <BlogGrid
            blogs={filteredBlogs}
            loading={loading}
            allBlogsCount={blogs.length}
          />

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">{error}</p>
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

      <WhyChooseSection />
      <Footer />
    </main>
  );
}
