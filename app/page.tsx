import LandingPage from "@/components/Landing";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session?.user) {
    redirect('/home')
  }

  return (
    <div>
      {new Promise(r => setTimeout(r, 1000))}
      <LandingPage />
    </div>
  );
}
