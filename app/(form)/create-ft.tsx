"use client";
import { useState } from "react";
import useUmi from "../useUmi";
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
import { Button, ImageInput, InputField } from "@/components";

function CreateFtForm() {
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

export default CreateFtForm;
