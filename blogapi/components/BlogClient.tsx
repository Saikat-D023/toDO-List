"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/libs/categories";
import { motion } from "framer-motion";
import {
  BookOpen,
  BriefcaseBusiness,
  HeartPulse,
  Leaf,
  Plane,
} from "lucide-react";
import { useState } from "react";

const categoryIcons = {
  Technology: BookOpen,
  Health: HeartPulse,
  Lifestyle: Leaf,
  Education: BriefcaseBusiness,
  Travel: Plane,
} as const;

type BlogClientProps = {
  onBlogAdded?: () => void;
};

const BlogClient = ({ onBlogAdded }: BlogClientProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Technology");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleWriteBlog = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author, category }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.errors ? JSON.stringify(data.errors, null, 2) : data.message);
        return;
      }

      setSuccess("Blog created successfully!");
      setTitle("");
      setContent("");
      setAuthor("");
      setCategory("Technology");
      onBlogAdded?.();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[1.75rem] bg-[linear-gradient(180deg,_rgba(255,255,255,0.72),_rgba(244,248,252,0.92))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Editor</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-900">
          Publish a fresh story in minutes
        </h3>
        <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
          Draft directly from this landing page and push your next blog without
          fighting a cluttered editor.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/75 px-4 py-4">
            <p className="text-2xl font-semibold text-slate-800">Fast</p>
            <p className="mt-1 text-sm text-slate-500">Simple authoring flow</p>
          </div>
          <div className="rounded-2xl bg-white/75 px-4 py-4">
            <p className="text-2xl font-semibold text-slate-800">Clean</p>
            <p className="mt-1 text-sm text-slate-500">No distracting chrome</p>
          </div>
          <div className="rounded-2xl bg-white/75 px-4 py-4">
            <p className="text-2xl font-semibold text-slate-800">Direct</p>
            <p className="mt-1 text-sm text-slate-500">Your work goes live quickly</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[1.75rem] bg-white/72 p-5 shadow-[0_20px_50px_rgba(88,108,136,0.1)]"
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <motion.input
              type="text"
              placeholder="Designing a writing practice that lasts"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.18 }}
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Content
            </label>
            <motion.textarea
              placeholder="Write your blog content here..."
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.18 }}
              className="min-h-36 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-300"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Author
            </label>
            <motion.input
              type="text"
              placeholder="Your name"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.18 }}
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-300"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Category
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-2xl border-slate-200 px-4 py-3"
                >
                  <span className="flex items-center gap-2">
                    {(() => {
                      const Icon = categoryIcons[category];
                      return <Icon className="h-4 w-4 text-slate-500" />;
                    })()}
                    {category}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-64">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={category}
                    onValueChange={(value) =>
                      setCategory(value as (typeof categories)[number])
                    }
                  >
                    {categories.map((item) => {
                      const Icon = categoryIcons[item];

                      return (
                        <DropdownMenuRadioItem key={item} value={item}>
                          <Icon className="h-4 w-4 text-slate-500" />
                          {item}
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="cursor-pointer rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            onClick={handleWriteBlog}
          >
            {loading ? "Publishing..." : "Publish blog"}
          </motion.button>

          {error && (
            <div className="rounded-2xl bg-red-50 p-3 text-sm whitespace-pre-wrap text-red-600">
              {error}
              <p className="mt-2 text-xs">Check browser console for details (F12)</p>
            </div>
          )}

          {success && (
            <div className="rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-700">
              {success}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogClient;
