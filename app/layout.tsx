import "./globals.css";
import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Miro Store",
  description: "Shaarar linen ah oo gacanta lagu tolay. Quality You Can Feel.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="so">
      <head>
        <meta name="color-scheme" content="only light" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;700&family=Syne:wght@600;700;800&display=swap" />
      </head>
      <body><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
