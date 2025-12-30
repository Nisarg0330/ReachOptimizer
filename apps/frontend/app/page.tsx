"use server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const res = await fetch("http://localhost:8000/");
  const data = await res.json();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Next.js + FastAPI</h1>
      <p className="mt-4">Backend says: {data.message}</p>
      <div className="mt-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <Link href="/">Sign-in</Link>
        </button>
      </div>
    </div>
  );
}
