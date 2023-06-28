import { cookies } from "next/headers";
import { Copyright } from "@/components/Copyright";
import { EmptyMemories } from "@/components/EmptyMemories";
import { Hero } from "@/components/Hero";
import { SignIn } from "@/components/SignIn";
import { Profile } from "@/components/Profile";

export default function Home() {
  const isAuthenticated = cookies().has("token");

  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="bg-[url(../assets/bg-stars.svg)] bg-cover flex flex-col items-start justify-between overflow-hidden px-28 py-16 relative border-r border-white/10">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full blur-full" />

        <div className="absolute right-1 top-0 bottom-0 w-2 bg-stripes" />

        {isAuthenticated ? <Profile /> : <SignIn />}
        <Hero />
        <Copyright />
      </div>

      <div className="bg-[url(../assets/bg-stars.svg)] bg-cover flex flex-col p-16">
        <EmptyMemories />
      </div>
    </main>
  );
}
