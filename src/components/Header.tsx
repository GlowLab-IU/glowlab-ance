"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full px-4 py-3 bg-white border-b shadow-sm fixed top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-primary">
          GlowChain
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/camera">Scan</Link>
          <Link href="/result-medical">Result</Link>
          <WalletMultiButton />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <WalletMultiButton />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t mt-2">
          <nav className="flex flex-col items-start px-4 py-2 space-y-2">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/camera" onClick={() => setIsMobileMenuOpen(false)}>
              Scan
            </Link>
            <Link
              href="/result-medical"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Result
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
