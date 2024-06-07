import Image from "next/image";
import pool from "../utils/postgres";
const getDataFromPG = async () => {
  try {
    const client = await pool.connect();
    console.log("Connecting to the Database!");

    const res = await client.query("SELECT * FROM public.blogs");
    const data = res.rows;
    // console.log("Fetched Data: " + data);
    console.log("Fetched Data: ", JSON.stringify(data, null, 2));
    client.release();
    return data;
  } catch (err) {
    console.log("Error Fetching Data: ", err);
    throw err;
  }
};

getDataFromPG()
  .then((data) => {
    // console.log("Recieved Data: " + data);
    console.log("Recieved Data: ", JSON.stringify(data, null, 2));
  })
  .catch((err) => {
    console.log("Error Fetching Data: ", err);
  });
export default function Home() {
  return (
    <>
      <h1>Hello World!!!!</h1>
    </>
  );
}
