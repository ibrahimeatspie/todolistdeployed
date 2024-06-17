"use client";
import React, { useEffect } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Auth() {
  return <SignInButton />;
}
