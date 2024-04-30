import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Connection, clusterApiUrl } from "@solana/web3.js";

export const SOLANA_CONFIG = {
  rpc:
    process.env.NEXT_PUBLIC_RPC_URL ||
    clusterApiUrl(WalletAdapterNetwork.Mainnet),
  connection: new Connection(
    process.env.NEXT_PUBLIC_RPC_URL ??
      clusterApiUrl(WalletAdapterNetwork.Mainnet)
  ),
  payer_private_key: process.env.NEXT_PUBLIC_PAYER_PRIVATE_KEY || "",
  treasury: process.env.NEXT_PUBLIC_TREASURY || "",
};
