import pool from "@/utils/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // console.log("Connecting to the Database...");
    const client = await pool.connect();
    // console.log("Connected to the Database!");

    const result = await client.query(
      "SELECT title, metadescription, content, slug FROM public.blogs"
    );
    client.release();
    console.log("Fetched Data:", result.rows);

    return NextResponse.json(
      {
        data: result.rows,
        success: true,
        message: "Successfully fetched blogs",
      },
      { status: 200 }
    );
  } catch (err) {
    // console.log("Error fetching blogs:", err);
    return NextResponse.json(
      { error: "Error fetching blogs" },
      { status: 500 }
    );
  }
}
