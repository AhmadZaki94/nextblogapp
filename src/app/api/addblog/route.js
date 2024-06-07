import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, content, metadescription } = body;

    if (!title || !metadescription || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const newBlog = await prisma.Blog.create({
      data: {
        title,
        metadescription,
        content,
        slug,
      },
    });

    return NextResponse.json({
      success: true,
      newBlog,
      message: "Blog Created",
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
