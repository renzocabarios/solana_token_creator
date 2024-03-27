"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import useUmi from "./useUmi";
import {
  createGenericFileFromBrowserFile,
  generateSigner,
  percentAmount,
  publicKey,
  sol,
  transactionBuilder,
} from "@metaplex-foundation/umi";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  TokenStandard,
  createAndMint,
} from "@metaplex-foundation/mpl-token-metadata";
import { transferSol } from "@metaplex-foundation/mpl-toolbox";
import { SOLANA_CONFIG } from "@/env";
import { toWeb3JsLegacyTransaction } from "@metaplex-foundation/umi-web3js-adapters";
import { Connection, LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";

export default function Home() {
  const umi = useUmi();
  const wallet = useWallet();
  const [form, setform] = useState({
    name: "",
    description: "",
    symbol: "",
    sellerFeeBasisPoints: 0,
    amount: 0,
    decimals: 0,
  });

  const [receipt, setreceipt] = useState({
    image: 0,
    transaction: 0,
  });

  const [current, setcurrent] = useState<null | any>(null);

  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setform((state) => ({ ...state, [name]: value }));
  };

  const onFileChange = async (e: any) => {
    setcurrent(e.target.files[0]);
  };
  function LamportstoSOL(value: number): number {
    return value / LAMPORTS_PER_SOL;
  }

  async function getEstimatedFee(
    transaction: Transaction
  ): Promise<number | null> {
    const CONNECTION = new Connection(umi.rpc.getEndpoint());
    const { blockhash, lastValidBlockHeight } =
      await CONNECTION.getLatestBlockhash();
    return LamportstoSOL(
      Number((await transaction.getEstimatedFee(CONNECTION)) ?? 0)
    );
  }

  // TODO: Change the approach when caluclating/getting uploading costs
  const onUpload = async () => {
    const file = await createGenericFileFromBrowserFile(current);

    const [imageUri] = await umi.uploader.upload([file]);
    const amount = await umi.uploader.getUploadPrice([file]);

    const response = await umi.uploader.uploadJson({
      name: form.name,
      symbol: form.symbol,
      description: form.description,
      image: imageUri,
    });

    setreceipt((state) => ({
      ...state,
      image: Number(amount.basisPoints) / 10 ** amount.decimals,
    }));

    const mint = generateSigner(umi);

    const mintInstruction = createAndMint(umi, {
      mint,
      name: form.name,
      uri: response,
      symbol: form.symbol,
      decimals: form.decimals,
      amount: form.amount * 10 ** form.decimals,
      tokenOwner: umi.identity.publicKey,
      tokenStandard: TokenStandard.Fungible,
      sellerFeeBasisPoints: percentAmount(form.sellerFeeBasisPoints),
    });

    const transferInstruction = transferSol(umi, {
      source: umi.identity,
      destination: publicKey(SOLANA_CONFIG.treasury),
      amount: sol(0.001),
    });

    const BEFORE = await umi.rpc.getBalance(umi.identity.publicKey);

    const builder = transactionBuilder()
      .add(mintInstruction)
      .add(transferInstruction);

    const transactionFee = await getEstimatedFee(
      toWeb3JsLegacyTransaction(await builder.buildWithLatestBlockhash(umi))
    );

    setreceipt((state) => ({
      ...state,
      transaction: transactionFee ?? 0,
    }));

    await builder.sendAndConfirm(umi);
  };

  return (
    <main className="min-h-screen flex flex-col ">
      <div className="w-full  bg-slate-900 h-[10vh] flex items-center">
        <WalletMultiButton />
      </div>
      <div className="flex justify-center items-center h-[90vh] gap-10">
        <div className="grid grid-cols-2 gap-4 p-7 max-w-96 max-h-96 bg-slate-900 rounded-lg">
          <div className="flex flex-col col-span-2">
            <p className="text-xs">image</p>
            <input type="file" onChange={onFileChange} className="text-black" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs">name</p>
            <input
              name="name"
              type="text"
              onChange={onInputChange}
              className="text-black"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs">symbol</p>
            <input
              name="symbol"
              type="text"
              onChange={onInputChange}
              className="text-black"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs">description</p>
            <input
              name="description"
              type="text"
              onChange={onInputChange}
              className="text-black"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs">seller fee basis points</p>
            <input
              name="sellerFeeBasisPoints"
              type="number"
              onChange={onInputChange}
              className="text-black"
            />
          </div>{" "}
          <div className="flex flex-col">
            <p className="text-xs">amount</p>
            <input
              name="amount"
              type="number"
              onChange={onInputChange}
              className="text-black"
            />
          </div>{" "}
          <div className="flex flex-col">
            <p className="text-xs">decimals</p>
            <input
              name="decimals"
              type="number"
              onChange={onInputChange}
              className="text-black"
            />
          </div>
          {wallet.connected && (
            <button className="col-span-2" onClick={onUpload}>
              Create Mint
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <p>Upload Image Cost:</p>
          <p className="text-end"> {receipt.image} SOL</p>
          <p>Transaction Cost: </p>
          <p className="text-end">{receipt.transaction * 2} SOL</p>
          <p>Upload JSON Cost:</p>
          <p className="text-end">{receipt.image} SOL</p>
          <p>Service Cost:</p>
          <p className="text-end">0.001 SOL</p>
          <p>Total Cost:</p>
          <p className="text-end">
            {receipt.transaction * 2 + receipt.image * 2 + 0.001} SOL
          </p>
        </div>
      </div>
    </main>
  );
}
