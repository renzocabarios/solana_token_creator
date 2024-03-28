"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { HTMLInputTypeAttribute, useState } from "react";
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
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex">
        <div className="h-[90vh] w-[15vw] bg-slate-900"></div>
        <div className="flex justify-center items-center h-[90vh] w-[85vw] gap-10 ">
          <CreateMintForm />
        </div>
      </div>
    </main>
  );
}

function CreateMintForm() {
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
  };

  const parseFileToString = (file: Blob | MediaSource) => {
    let image: null | string;
    try {
      image = URL.createObjectURL(current);
    } catch (_) {
      image = null;
    }
    return image;
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-7 rounded-lg ">
      <div className="col-span-2">
        <ImageInput
          image={parseFileToString(current)}
          onChange={onFileChange}
          label="name"
          name="name"
        />
      </div>

      <InputField
        type={"text"}
        onChange={onInputChange}
        label="name"
        name="name"
      />
      <InputField
        type={"text"}
        onChange={onInputChange}
        label="symbol"
        name="symbol"
      />
      <InputField
        type={"text"}
        onChange={onInputChange}
        label="description"
        name="description"
      />
      <InputField
        type={"number"}
        onChange={onInputChange}
        label="sellerFeeBasisPoints"
        name="sellerFeeBasisPoints"
      />
      <InputField
        type={"number"}
        onChange={onInputChange}
        label="amount"
        name="amount"
      />
      <InputField
        type={"number"}
        onChange={onInputChange}
        label="decimals"
        name="decimals"
      />
      {wallet.connected && (
        <div className="col-span-2">
          <Button onClick={onCreateMint} label="Create Mint" />
        </div>
      )}
    </div>
  );
}
interface ButtonProps {
  onClick: (e: any) => void;
  label: string;
}

function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-slate-900 py-3 px-4 rounded-md text-medium w-full"
    >
      {label}
    </button>
  );
}

interface ImageInputProps {
  onChange: (e: any) => void;
  name: string;
  label: string;
  image: string | null;
}

function ImageInput({ image, name, onChange }: ImageInputProps) {
  return (
    <label className="flex justify-center gap-2 w-full">
      <Image
        src={image ?? "https://placehold.co/300x300.png?text=Upload+Image"}
        alt={image ?? "https://placehold.co/300x300.png?text=Upload+Image"}
        height={300}
        width={300}
        className="rounded-2xl h-64 w-64"
      />
      <input
        name={name}
        type={"file"}
        onChange={onChange}
        className="text-black rounded-md px-2 py-1 bg-slate-700 hidden"
      />
    </label>
  );
}

interface InputFieldProps {
  onChange: (e: any) => void;
  name: string;
  label: string;
  type: HTMLInputTypeAttribute | undefined;
}

function InputField({ label, name, onChange, type }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <p className=" text-gray-200">{label}</p>
      <input
        name={name}
        type={type}
        onChange={onChange}
        className="text-gray-300 rounded-md px-2 py-1 bg-slate-700"
      />
    </div>
  );
}

function Navbar() {
  return (
    <div className="w-full bg-slate-900 h-[10vh] flex justify-between items-center px-10">
      <p className="text-xl font-semibold">Solana Meme Coin Generator</p>
      <WalletMultiButton />
    </div>
  );
}
