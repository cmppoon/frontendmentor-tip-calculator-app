import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const space_mono = Space_Mono({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Frontend Mentor | Tip calculator app",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="flex min-h-screen items-center justify-center bg-light-grayish-cyan"
    >
      <body className={`${space_mono.className} flex-grow`}>{children}</body>
    </html>
  );
}
