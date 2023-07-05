import { ReactNode } from "react";
import { cookies } from "next/headers";
import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";
import { Profile } from "@/components/Profile";
import { Hero } from "@/components/Hero";
import { SignIn } from "@/components/SignIn";
import { Copyright } from "@/components/Copyright";

import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
});
const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "Spacetime Next Level Week",
  description: "Next Level Week da Rocketseat @2023",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has("token");

  return (
    <html lang="pt-BR">
      <body
        className={`${robotoFlex.variable} ${baiJamjuree.variable} font-sans bg-gray-900 text-gray-100`}
      >
        <main className="grid grid-cols-2 min-h-screen">
          <div className="bg-[url(../assets/bg-stars.svg)] bg-cover flex flex-col items-start justify-between overflow-hidden px-28 py-16 relative border-r border-white/10">
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full blur-full" />

            <div className="absolute right-1 top-0 bottom-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>

          <div className="bg-[url(../assets/bg-stars.svg)] bg-cover max-h-screen flex flex-col overflow-y-scroll">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
