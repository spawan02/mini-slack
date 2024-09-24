import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div>


    </div>
  );
}
