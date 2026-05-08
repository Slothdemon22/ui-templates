import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AgencyFooter } from "@/components/agency/custom/AgencyFooter";
import { AgencyNavbar } from "@/components/agency/custom/AgencyNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agency",
  description: "Agency landing page",
};

export default function AgencyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="min-h-screen w-full">
        <AgencyNavbar />
        {children}
        <AgencyFooter />
      </div>
    </div>
  );
}

