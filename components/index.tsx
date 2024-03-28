"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { HTMLInputTypeAttribute } from "react";

import Image from "next/image";

interface ButtonProps {
  onClick: (e: any) => void;
  label: string;
}

export function Button({ label, onClick }: ButtonProps) {
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

export function ImageInput({ image, name, onChange }: ImageInputProps) {
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

export function InputField({ label, name, onChange, type }: InputFieldProps) {
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

export function Navbar() {
  return (
    <div className="w-full bg-slate-900 h-[10vh] flex justify-between items-center px-10">
      <p className="text-xl font-semibold">Solana Meme Coin Generator</p>
      <WalletMultiButton />
    </div>
  );
}
