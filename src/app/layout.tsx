import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AudioProvider } from "@/components/AudioProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanecraft | Sustainable Bagasse Paper Stationery",
  description: "Report-ready ESG data. Drop-in replacement. Same cost. Bigger impact. Kanecraft provides premium sustainable stationery for forward-thinking enterprises.",
};

import { Chatbot } from "@/components/Chatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>
            <AudioProvider>
              {children}
            </AudioProvider>
          </SmoothScroll>
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
