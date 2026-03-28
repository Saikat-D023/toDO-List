import { NextResponse } from "next/server"
import connectToDB from "@/libs/db"
import Blog, { zodBlog } from "@/models/Blog"

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

    const result = zodBlog.safeParse(data)
    if (!result.success) {
        return NextResponse.json({
            message: "Invalid blog data",
            errors: result.error.errors
        }, { status: 400 })
    }

    const validateData = result.data
    const BlogPost = new Blog(validateData)
    await BlogPost.save()
    return NextResponse.json({
        message: "Blog created successfully",
        data: validateData
    }, { status: 201 })
}   
