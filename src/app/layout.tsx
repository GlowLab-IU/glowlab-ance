import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { WalletProvider } from "@/components/WalletProvider";
import Header from "@/components/Header";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GlowChain - AI & Blockchain Powered Acne Treatment Platform",
  description:
    "Harnessing AI & Blockchain to Deliver Transparent, Personalized Acne Treatment Solutions",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <WalletProvider>
            <Toaster />
            <Header />
            <main className="pt-15">{children}</main>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
