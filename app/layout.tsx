"use client";
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
              <main className="min-h-screen flex">
                <Sidenav />
                <div className="flex flex-col">
                  <Navbar />
                  <div className="h-[90vh] w-[85vw] p-5">
                    {mounted && children}
                  </div>
                </div>
              </main>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}

import React from "react";
import { Sidenav } from "@/components/sidenav";
