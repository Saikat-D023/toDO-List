import Image from "next/image";
import BlogClient from "@/components/BlogClient";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-3xl text-fuchsia-500">brain dump{">"}</h1>
        <BlogClient />
      </div>
    </div>
  );
}
