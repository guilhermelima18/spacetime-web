import { ReactNode } from "react";
import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";
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
  return (
    <html lang="en">
      <body
        className={`${robotoFlex.variable} ${baiJamjuree.variable} font-sans bg-gray-900 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
