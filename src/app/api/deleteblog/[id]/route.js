import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  console.log(params, ": params in delete request");
  const { id } = params;

  try {
    const deleteBlog = await prisma.Blog.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({
      success: true,
      deleteBlog,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
