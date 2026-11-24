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
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Instrument+Serif:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-wine text-cream selection:bg-gold selection:text-wine antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
