import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { SocialSidebar } from "@/components/SocialSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Pritam Verma — Developer & AI Automation",
  description: "Portfolio of Pritam Verma — Full-Stack Developer specialising in web, app development, and AI automation.",
  keywords: ["Pritam Verma", "React Developer Portfolio 2026", "Next.js 14", "Full Stack Developer", "AI Automation"],
  openGraph: {
    title: "Pritam Verma",
    description: "Full-Stack Developer & AI Automation specialist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <CustomCursor />
          <SocialSidebar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
