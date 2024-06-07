import pool from "@/utils/postgres";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, metadescription, content } = body;
    console.log(body, " :req body");

    if (!title || !metadescription || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const client = await pool.connect();
    const queryText = `
      INSERT INTO public.blogs (title, metadescription, content, slug)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;

    const values = [title, metadescription, content, slug];
    const result = await client.query(queryText, values);
    const newBlog = result.rows[0];
    client.release();

    return NextResponse.json({
      data: newBlog,
      success: true,
      message: "Blog Created",
    });
  } catch (err) {
    console.log("Error inserting data:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// const getDataFromPG = async () => {
//   try {
//     const client = await pool.connect();
//     console.log("Connecting to the Database!");

//     const res = await client.query("INSERT INTO public.blogs");
//     const data = res.rows;
//     console.log("Fetched Data: " + data);

//     client.release();
//   } catch (err) {
//     console.log("Error Fetching Data: ", err);
//     throw err;
//   }
// };

// getDataFromPG()
//   .then((data) => {
//     console.log("Recieved Data: " + data);
//   })
//   .catch((err) => {
//     console.log("Error Fetching Data: ", err);
//   });
