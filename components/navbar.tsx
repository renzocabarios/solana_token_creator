"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

export function Navbar() {
  const [mounted, setmounted] = useState<boolean>(false);

  useEffect(() => {
    setmounted(true);
  }, [setmounted]);

  return (
    <div className="w-[85vw] bg-slate-900 h-[10vh] flex justify-between items-center px-10">
      <p className="text-xl font-semibold">Solana Meme Coin Generator</p>
      {mounted && <WalletMultiButton />}
    </div>
  );
}
