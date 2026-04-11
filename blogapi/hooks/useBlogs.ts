import { useState, useCallback, useEffect } from "react";
import { type Blog, type SortOrder } from "@/libs/types";

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (res.ok) {
        setBlogs(data.blogs || []);
      } else {
        setError(data.message || "Failed to load blogs.");
      }
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleBlogAdded = useCallback(() => {
    fetchBlogs();
    setSearch("");
    setSelectedCategory("All");
    setSortOrder("newest");
  }, [fetchBlogs]);

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

  const featuredBlog = [...blogs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0] ?? null;

  return {
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
  };
}
