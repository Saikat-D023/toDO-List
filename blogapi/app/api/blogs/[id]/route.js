import { NextResponse } from "next/server";
import connectToDB from "@/libs/db";
import mongoose from "mongoose";
import Blog from "@/models/Blog";

export async function GET(
  request,
  { params }
) {
  const { id } = params;
  console.log("[GET /api/blogs/[id]] id received:", id, "type:", typeof id);

  // Validate MongoDB ObjectId format (24-char hex string)
  // Using a regex instead of mongoose.Types.ObjectId.isValid() because
  // Mongoose's isValid does byte-level timestamp checks and rejects IDs
  // where timestamp bytes are >= 0x80 (e.g. "9c" in "69d26bef47a331ebcf9c9a29").
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    console.log("[GET /api/blogs/[id]] Invalid ObjectId format:", id);
    return NextResponse.json(
      { message: "Invalid blog ID format.", receivedId: id },
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    const blog = await Blog.findById(id);
    console.log("[GET /api/blogs/[id]] blog found:", blog ? "yes" : "no", blog?._id);
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found." },
        { status: 404 }
      );
    }
    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/blogs/[id]] Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog. Please try again." },
      { status: 500 }
    );
  }
}
