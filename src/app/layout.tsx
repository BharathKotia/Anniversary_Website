import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&family=Jost:ital,wght@0,100..900;1,100..900&family=Pinyon+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-wine text-cream selection:bg-gold selection:text-wine antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
