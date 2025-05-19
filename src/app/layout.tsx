import { Toaster } from "sonner";
import "./globals.css";
import { WalletProvider } from "@/components/WalletProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "GlowChain",
  description: "Acne AI + Web3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <WalletProvider>
          <Toaster />
          <Header />
          <main className="pt-20 px-4">{children}</main>
        </WalletProvider>
      </body>
    </html>
  );
}
