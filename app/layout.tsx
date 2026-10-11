import type { Metadata } from "next";
import { Fahkwang } from "next/font/google";
import LenisProvider from "@/components/lenis-provider";
import "./globals.css";
import { Header } from "@/components/navigation/header";

const fahkwang = Fahkwang({
  variable: "--font-fahkwang",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tropical Temptation Beach Club",
  description: "Tropical Temptation Beach Club",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fahkwang.variable} h-full font-sans antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <LenisProvider>
          <Header />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
