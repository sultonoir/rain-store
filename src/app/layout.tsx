import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: {
    template: "%s • Rizal Official Store",
    default: "Rizal Official Store",
  },
  description:
    "Rizal is a modern fashion brand offering stylish and high-quality apparel for every occasion. Discover trendsetting designs and timeless elegance that redefine your wardrobe.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://rizal-store.vercel.app/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    title: {
      template: "%s • Rizal Official Store",
      default: "Rizal Official Store",
    },
    description:
      "Rizal is a modern fashion brand offering stylish and high-quality apparel for every occasion. Discover trendsetting designs and timeless elegance that redefine your wardrobe.",
    url: "https://rizal-store.vercel.app/",
    siteName: "Rizal Official Store",
    images: [
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 800,
        height: 600,
      },
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: {
      template: "%s • Rizal store",
      default: "Rizal Official Store",
    },
    description:
      "Rizal store is a modern fashion brand offering stylish and high-quality apparel for every occasion. Discover trendsetting designs and timeless elegance that redefine your wardrobe.",
    site: "https://rizal-store.vercel.app/",
    images: [
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 800,
        height: 600,
      },
      {
        url: "https://utfs.io/f/0vsSPX9AUvOHeSXoWVN7hsiRrPmF5cQkfzEWqV093Hj7NbJv",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
