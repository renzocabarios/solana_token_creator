"use client";
import { Button } from "@/components/ui/button";

import { useCreateToken } from "@/lib/zustand/create-token.store";

export default function ReviewDetails() {
  const { metadata, mint, handleBackPage } = useCreateToken();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 text-white">
        <p className="text-2xl font-bold">Metadata Details</p>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Name</p>
            <p>{metadata.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Symbol</p>
            <p>{metadata.symbol}</p>
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <p className="text-xl font-semibold">Description</p>
            <p>{metadata.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-white">
        <p className="text-2xl font-bold">Mint Details</p>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Name</p>
            <p>{mint.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Symbol</p>
            <p>{mint.symbol}</p>
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <p className="text-xl font-semibold">Description</p>
            <p>{mint.description}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Amount</p>
            <p>{mint.amount}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Decimals</p>
            <p>{mint.decimals}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Seller Fee Basis Points</p>
            <p>{mint.sellerFeeBasisPoints}</p>
          </div>
        </div>
      </div>

      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="flex justify-between items-center">
        <Button
          onClick={() => {
            handleBackPage();
          }}
        >
          Back
        </Button>
        <Button>Create</Button>
      </div>
    </div>
  );
}
