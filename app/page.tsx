'use client'
import Appbar from "@/components/Appbar";
import LandingPage from "@/components/Landing";
import { signIn } from "next-auth/react";

export default async function Home() {
  return (
    <div>
      <LandingPage />
    </div>
  );
}
