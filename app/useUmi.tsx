import { SOLANA } from "@/config";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";

function useUmi() {
  const wallet = useWallet();

  const umi = createUmi(SOLANA.rpc);
  umi.use(walletAdapterIdentity(wallet)).use(irysUploader()).use(mplToolbox());

  return umi;
}

export default useUmi;
