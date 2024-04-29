"use client";
import { Button } from "@/components/ui/button";

import { useCreateToken } from "@/lib/zustand/create-token.store";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import {
  SystemProgram,
  Transaction,
  Keypair,
  TransactionMessage,
  VersionedTransaction,
  Signer,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function ReviewDetails() {
  const { metadata, mint, handleBackPage } = useCreateToken();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  const onCreate = async () => {
    console.log({ metadata, mint });

    if (publicKey && signTransaction) {
      const mintKeypair = Keypair.generate();
      const lamports = await getMinimumBalanceForRentExemptMint(connection);

      const associatedToken = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        publicKey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );
      let blockhash = await connection
        .getLatestBlockhash()
        .then((res) => res.blockhash);
      const transaction = new Transaction()
        .add(
          SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
          })
        )
        .add(
          createInitializeMint2Instruction(
            mintKeypair.publicKey,
            mint.decimals,
            publicKey,
            publicKey,
            TOKEN_PROGRAM_ID
          )
        )
        .add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            associatedToken,
            publicKey,
            mintKeypair.publicKey,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
          )
        );

      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;
      const signed = await signTransaction(transaction);

      const tx = sendAndConfirmTransaction(connection, signed, [mintKeypair]);
      console.log(mintKeypair.publicKey.toString());
      console.log(tx.toString());
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <WalletMultiButton />
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
        <Button onClick={onCreate}>Create</Button>
      </div>
    </div>
  );
}
