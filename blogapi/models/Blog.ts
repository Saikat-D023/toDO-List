import mongoose from "mongoose";
import * as z from "zod";
import { categories } from "@/libs/categories";

const zodBlog = z.object({
    title: z.string().min(5, "Title is required").max(50, "Title must be less than 100 characters"),
    content: z.string().min(50, "Content is required").max(500, "Content must be less than 500 characters"),
    author: z.string().min(3, "Author is required").max(50, "Author must be less than 50 characters"),
    category: z.enum(categories, "Category must be one of the following: Technology, Health, Lifestyle, Education, Travel")
})

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    category: {
        type: String,
        enum: categories
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export { zodBlog };
export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema)

