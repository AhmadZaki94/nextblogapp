import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const { title, description, content } = body;

  try {
    const existingBlog = await prisma.Blog.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingBlog) {
      return NextResponse.json({
        success: false,
        error: "id is not found.",
      });
    }

    const editBlog = await prisma.Blog.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        description,
        content,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
      },
    });

    return NextResponse.json({
      success: true,
      editBlog,
      messgae: "Blog Update successfully!!",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
