import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  // const { searchParams } = new URL(request.url);
  // const slug = searchParams.get("slug");
  const { slug } = params;
  if (!slug) {
    return NextResponse.json({ success: false, error: "Slug is required." });
  }

  try {
    const singleBlog = await prisma.Blog.findFirst({
      where: {
        slug: slug,
      },
    });

    if (!singleBlog) {
      return NextResponse.json({
        success: false,
        error: "Blog is not found.",
      });
    }

    return NextResponse.json({ success: true, singleBlog });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
