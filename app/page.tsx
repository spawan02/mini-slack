import Appbar from "@/components/Appbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <div>
      <Appbar />
    </div>
  );
}
