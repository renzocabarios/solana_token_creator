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

    setowners(
      listOfTokens.map((e: any) => {
        return e.account.data.parsed.info.owner;
      })
    );
  };

  const exportUserInfo = (userInfo: any[]) => {
    const fileData =
      "wallet \r\n" +
      userInfo.reduce((acc: any, curr: any) => curr + "\r\n" + acc, "");
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${mint}.csv`;
    link.href = url;
    link.click();
  };

  const onDowload = () => {
    exportUserInfo(owners);
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
      <Button onClick={onDowload} label="Download to CSV"></Button>
      {owners.length !== 0 && <p>Found {owners.length} wallets</p>}
    </>
  );
}
