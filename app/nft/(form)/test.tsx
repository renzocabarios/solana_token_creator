// "use client";
// import { useState } from "react";
// import useUmi from "../../useUmi";
// import {
//   generateSigner,
//   percentAmount,
//   publicKey,
//   sol,
//   transactionBuilder,
// } from "@metaplex-foundation/umi";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { createNft } from "@metaplex-foundation/mpl-token-metadata";
// import { transferSol } from "@metaplex-foundation/mpl-toolbox";
// import { SOLANA_CONFIG } from "@/env";
// import axios from "axios";
// import { Button, ImageInput, InputField } from "@/components";

// export default function CreateNftForm() {
//   const umi = useUmi();
//   const wallet = useWallet();
//   const [form, setform] = useState({
//     name: "",
//     description: "",
//     symbol: "",
//     sellerFeeBasisPoints: 0,
//   });

//   const [current, setcurrent] = useState<null | any>(null);

//   const onInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setform((state) => ({ ...state, [name]: value }));
//   };

//   const onFileChange = async (e: any) => {
//     setcurrent(e.target.files[0]);
//   };

//   const uploadOffChain = async () => {
//     const request = new FormData();
//     request.append("image", current);
//     request.append(
//       "metadata",
//       JSON.stringify({
//         name: form.name,
//         symbol: form.symbol,
//         description: form.description,
//       })
//     );
//     const {
//       data: { costs, uri },
//     } = await axios.post("api/irys", request);

//     return { costs, uri };
//   };

//   // TODO: Change the approach when caluclating/getting uploading costs
//   const onCreateMint = async () => {
//     const { costs, uri } = await uploadOffChain();

//     const mint = generateSigner(umi);

//     const mintInstruction = await createNft(umi, {
//       mint,
//       name: form.name,
//       symbol: form.symbol,
//       uri,
//       sellerFeeBasisPoints: percentAmount(form.sellerFeeBasisPoints),
//     });

//     const transferInstruction = transferSol(umi, {
//       source: umi.identity,
//       destination: publicKey(SOLANA_CONFIG.treasury),
//       amount: sol(0.001 + costs + costs),
//     });

//     const builder = transactionBuilder()
//       .add(mintInstruction)
//       .add(transferInstruction);

//     await builder.sendAndConfirm(umi);
//   };

//   const parseFileToString = () => {
//     let image: null | string;
//     try {
//       image = URL.createObjectURL(current);
//     } catch (_) {
//       image = null;
//     }
//     return image;
//   };

//   return (
//     <div className="flex flex-col gap-5 ">
//       <div className="flex gap-10">
//         <div className="col-span-2">
//           <ImageInput
//             image={parseFileToString()}
//             onChange={onFileChange}
//             label="name"
//             name="name"
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4 p-2">
//           <InputField
//             type={"text"}
//             onChange={onInputChange}
//             label="name"
//             name="name"
//           />
//           <InputField
//             type={"text"}
//             onChange={onInputChange}
//             label="symbol"
//             name="symbol"
//           />
//           <InputField
//             type={"text"}
//             onChange={onInputChange}
//             label="description"
//             name="description"
//           />
//           <InputField
//             type={"number"}
//             onChange={onInputChange}
//             label="sellerFeeBasisPoints"
//             name="sellerFeeBasisPoints"
//           />
//         </div>
//       </div>
//       <div className="flex justify-end">
//         {wallet.connected && (
//           <Button onClick={onCreateMint} label="Create Mint" />
//         )}
//       </div>
//     </div>
//   );
// }
import React from "react";

function page() {
  return <div>page</div>;
}

export default page;
