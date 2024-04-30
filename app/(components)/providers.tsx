"use client";
import { useEffect, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SOLANA_CONFIG } from "@/env";
import Warning from "./warning";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
require("@solana/wallet-adapter-react-ui/styles.css");

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setmounted] = useState<boolean>(false);
  const [queryClient, setqueryClient] = useState<QueryClient>(
    new QueryClient()
  );

  useEffect(() => {
    setmounted(true);
  }, [setmounted]);

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider endpoint={SOLANA_CONFIG.rpc}>
        <WalletProvider wallets={[new SolflareWalletAdapter()]} autoConnect>
          <WalletModalProvider>
            <main className="bg-primary-foreground min-h-screen">
              <Warning />
              <div className="min-h-[95vh]">{mounted && children}</div>
            </main>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
}
