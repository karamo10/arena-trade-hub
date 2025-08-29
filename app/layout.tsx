import type { Metadata } from "next";
import "./globals.css";
import { roboto } from "@/components/fonts";
import Footer from "@/components/footer/footer";
import Head from "@/components/Header/header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




export const metadata: Metadata = {
  title: "Arena Trade Hub",
  description: "Arena Trade Hub and Logistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased bg-white/50`}
      >
        <Head />
        {children}
        <Footer />
      </body>
    </html>
  );
}
