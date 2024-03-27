"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import useUmi from "./useUmi";
import {
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
import axios from "axios";

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

  const [totalCost, settotalCost] = useState(0);
  const [mint, setmint] = useState("");

  const [current, setcurrent] = useState<null | any>(null);

  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setform((state) => ({ ...state, [name]: value }));
  };

  const onFileChange = async (e: any) => {
    setcurrent(e.target.files[0]);
  };

  const uploadOffChain = async () => {
    const request = new FormData();
    request.append("image", current);
    request.append(
      "metadata",
      JSON.stringify({
        name: form.name,
        symbol: form.symbol,
        description: form.description,
      })
    );
    const {
      data: { costs, uri },
    } = await axios.post("api/irys", request);

    return { costs, uri };
  };

  // TODO: Change the approach when caluclating/getting uploading costs
  const onCreateMint = async () => {
    const BEFORE = await umi.rpc.getBalance(umi.identity.publicKey);
    const { costs, uri } = await uploadOffChain();

    const mint = generateSigner(umi);
    const mintInstruction = createAndMint(umi, {
      mint,
      name: form.name,
      uri: uri,
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
      amount: sol(0.001 + costs + costs),
    });

    const builder = transactionBuilder()
      .add(mintInstruction)
      .add(transferInstruction);

    await builder.sendAndConfirm(umi);
    const AFTER = await umi.rpc.getBalance(umi.identity.publicKey);

    settotalCost(
      Number(BEFORE.basisPoints) / 10 ** BEFORE.decimals -
        Number(AFTER.basisPoints) / 10 ** AFTER.decimals
    );
    setmint(mint.publicKey.toString());
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
            <button className="col-span-2" onClick={onCreateMint}>
              Create Mint
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <p>Total Cost:</p>
          <p className="text-end">{totalCost} SOL</p>
          <p>MINT ID:</p>
          <p className="text-end">{mint}</p>
        </div>
      </div>
    </main>
  );
}
