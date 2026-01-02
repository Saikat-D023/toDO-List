import { NextResponse } from "next/server"
import connectToDB from "@/libs/db"
import Blog from "@/models/Blog"

export async function GET() {
    connectToDB()
    const blogs = await Blog.find()
    return NextResponse.json({
        message: "Welcome to the Personal Blog API!",
        status: 200,
        blogs
    })
}

export async function POST(request) {
    connectToDB()
    const data = await request.json();
    const BlogPost = new Blog(data)
    await BlogPost.save()
    return NextResponse.json({
        message: "Blog created successfully",
        status: 201
    })
}   
