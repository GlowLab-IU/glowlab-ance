import "./globals.css";
import { Toaster } from "sonner";
import { WalletProvider } from "@/components/WalletProvider";
import ClientLayout from "@/components/ClientLayout";

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
      <body>
        <WalletProvider>
          <ClientLayout>
            <Toaster />
            {children}
          </ClientLayout>
        </WalletProvider>
      </body>
    </html>
  );
}
