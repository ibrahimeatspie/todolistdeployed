"use client";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// interface Todo {
//   content: string;
//   preCondition: string;
//   acceptanceCriteria: string;
//   date: string;
//   id: string;
// }

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <Navbar />
      <div className="gap-y-10 w-full flex flex-col grow justify-center items-center">
        <h1 className="text-4xl">Welcome to your todo list</h1>
        <Link href="/dashboard">
          <Button>Take me there</Button>
        </Link>
      </div>
    </div>
  );
}
