"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SOLANA_CONFIG } from "@/env";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
require("@solana/wallet-adapter-react-ui/styles.css");
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setmounted] = useState<boolean>(false);

  useEffect(() => {
    setmounted(true);
  }, [setmounted]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectionProvider endpoint={SOLANA_CONFIG.rpc}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <main className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex">
                  <div className="h-[90vh] w-[15vw] flex flex-col p-3 gap-3 bg-slate-900">
                    <Link href={"/"}>Mint Tokens</Link>
                    <Link href={"/nft"}>Mint NFT</Link>
                    <Link href={"/find-by-mint"}>Find By Mint</Link>
                  </div>
                  <div className="h-[90vh] w-[85vw]">{mounted && children}</div>
                </div>
              </main>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
