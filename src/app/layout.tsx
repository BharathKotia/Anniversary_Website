import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Love Story, Written in Moments",
  description:
    "A personal anniversary celebration — a journey through our most meaningful moments together.",
  openGraph: {
    title: "A Love Story, Written in Moments",
    description:
      "A personal anniversary celebration — a journey through our most meaningful moments together.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${playfair.variable} ${dmSans.variable} ${caveat.variable}`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
