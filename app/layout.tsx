// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// Font Awesome
import "../public/css/plugins/fontawesome-all.min.css";

// SCSS Styles
import "../public/scss/style.scss";

import { headers } from "next/headers";
import ContextProvider from "@/context";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer2";

export const metadata: Metadata = {
  title: "LightDex — Community DEX on Lightchain",
  description:
    "Swap tokens and manage liquidity on Lightchain AI. Community DEX by KeikoDev — not affiliated with Lightchain Protocol.",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookies = headersList.get("cookie");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ContextProvider cookies={cookies}>
            <main className="flex flex-col min-h-dvh">
              <Header />
              <div className="flex-1 bg-[url(/images/bg/bg-light.png)] dark:bg-[url(/images/bg/bg.png)] bg-cover bg-center bg-no-repeat">
                {children}
              </div>
              <Footer />
            </main>
          </ContextProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
