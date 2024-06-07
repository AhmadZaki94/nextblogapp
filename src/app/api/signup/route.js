import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password, email } = body;

    if (!username || !password || !email) {
      console.error("Username, email, or password missing");
      return NextResponse.json(
        { error: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.User.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error("User already exists:", email);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.User.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "user", // default role
      },
    });

    return NextResponse.json(
      {
        success: true,
        user,
        message: "User registered successfully!!!",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error during user signup:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
