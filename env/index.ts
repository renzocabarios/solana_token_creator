import { Connection } from "@solana/web3.js";

export const SOLANA_CONFIG = {
  rpc: process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com",
  connection: new Connection(
    process.env.NEXT_PUBLIC_RPC_URL ?? "https://api.devnet.solana.com"
  ),
  payer_private_key: process.env.NEXT_PUBLIC_PAYER_PRIVATE_KEY || "",
  treasury: process.env.NEXT_PUBLIC_TREASURY || "",
};
