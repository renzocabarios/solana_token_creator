"use client";
import { Button, InputField } from "@/components";
import { useState } from "react";
import { SOLANA_CONFIG } from "@/env";
import { PublicKey } from "@solana/web3.js";

export default function FindByMint() {
  const [mint, setmint] = useState("");
  const [owners, setowners] = useState<any[]>([]);

  const onSearch = async () => {
    const TOKEN_PUBKEY = new PublicKey(
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
    );

    const filters = [
      {
        memcmp: {
          offset: 0,
          bytes: mint,
        },
      },
      {
        dataSize: 165,
      },
    ];

    const programAccountsConfig = {
      filters,
      encoding: "jsonParsed",
    };

    const listOfTokens =
      await SOLANA_CONFIG.connection.getParsedProgramAccounts(
        TOKEN_PUBKEY,
        programAccountsConfig
      );

    listOfTokens.forEach((e: any) => {
      console.log(e.account.data.parsed.info.owner);
    });

    setowners(
      listOfTokens.map((e: any) => {
        return e.account.data.parsed.info.owner;
      })
    );
    console.log(listOfTokens.length);
  };

  const onHandleChange = (e: any) => {
    setmint(e.target.value);
  };

  return (
    <>
      <InputField
        onChange={onHandleChange}
        name={"mint"}
        label={"Mint Address"}
        type={"test"}
      />
      <Button onClick={onSearch} label="Search"></Button>

      {owners.map((owner) => {
        return <p>{owner}</p>;
      })}
    </>
  );
}
