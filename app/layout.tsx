import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono, Geist } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAP Agent — An AI that learned to play Super Auto Pets",
  description:
    "A reinforcement learning agent trained from scratch to play Super Auto Pets. 85.99% win rate across 46 unique pets analysed.",
  openGraph: {
    title: "SAP Agent — An AI that learned to play Super Auto Pets",
    description:
      "A reinforcement learning agent trained from scratch to play Super Auto Pets. 85.99% win rate across 46 unique pets analysed.",
    type: "website",
    url: "https://sap.paulkuehn.ch",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐟</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${ibmPlexMono.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
