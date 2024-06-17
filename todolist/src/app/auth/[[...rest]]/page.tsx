"use client";
import React, { useEffect } from "react";
import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Auth() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <Navbar />
      <div className="gap-y-10 w-full flex flex-col grow justify-center items-center">
        <h1 className="text-4xl">Login to the todolist</h1>
        <SignIn/>
      </div>
    </div>
  );
}
