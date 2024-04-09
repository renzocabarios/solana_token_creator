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
import Warning from "./(components)/warning";

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
              <main className="bg-slate-800 min-h-screen">
                <Warning />
                <div className="h-[95vh]">{mounted && children}</div>
              </main>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
