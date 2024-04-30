import useUmi from "@/hooks/useUmi";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { MintFormSchema } from "@/lib/schemas/mint-form.schema";
import {
  TokenStandard,
  createAndMint,
} from "@metaplex-foundation/mpl-token-metadata";
import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function createToken({ formData, values, umi }: any) {
  const {
    data: { uri },
  } = await axios.post("/api/irys", formData);
  const mint = generateSigner(umi);

  const tx = await createAndMint(umi, {
    mint,
    authority: umi.identity,
    name: values.name,
    symbol: values.symbol,
    uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: values.decimals,
    amount: values.amount,
    tokenOwner: umi.identity.publicKey,
    tokenStandard: TokenStandard.Fungible,
  }).sendAndConfirm(umi);

  const [signature, _] = base58.deserialize(tx.signature);
  return signature;
}

function useCreateToken() {
  const { toast } = useToast();
  const umi = useUmi();

  const uploadMetadata = useMutation({
    mutationFn: createToken,
    onSuccess(data, variables, context) {
      toast({
        title: "Transaction Success",
        action: (
          <ToastAction
            altText="View on SolScan"
            onClick={() => {
              window.open(
                `https://solscan.io/tx/${data}?cluster=devnet`,
                "_blank",
                "noopener"
              );
            }}
          >
            View on SolScan
          </ToastAction>
        ),
      });
    },
  });

  function handleCreateToken(values: MintFormSchema, formData: FormData) {
    uploadMetadata.mutate({ formData, values, umi });
  }

  return { handleCreateToken };
}

export default useCreateToken;
