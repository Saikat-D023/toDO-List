export type Blog = {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
};

export type SortOrder = "newest" | "oldest";
