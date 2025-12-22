import Image from "next/image";

export default async function Home() {
  const res = await fetch("http://localhost:8000/");
  const data = await res.json();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Next.js + FastAPI</h1>
      <p className="mt-4">Backend says: {data.message}</p>
    </div>
  );
}
