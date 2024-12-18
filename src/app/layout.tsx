import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/provider/theme-provider";
import { validateRequest } from "@/lib/auth/validate-request";
import { SessionProvider } from "@/provider/session-provider";

export const metadata: Metadata = {
  title: {
    template: "%s • Rainame",
    default: "Rainame",
  },
  description:
    "Rainame is a leading online fashion retailer that offers the latest trends and styles in clothing, shoes, and accessories for men and women. Our mission is to provide our customers with a seamless and enjoyable shopping experience, allowing them to stay ahead of the fashion curve without breaking the bank.",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, session } = await validateRequest();
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider value={{ user, session }}>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
