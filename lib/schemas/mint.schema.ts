import { z } from "zod";

export const mintSchema = z.object({
  name: z.string().min(3),
  symbol: z.string().min(1),
  description: z.string().min(5),
  amount: z.number(),
  sellerFeeBasisPoints: z.number(),
  decimals: z.number(),
});

export type MintSchema = z.infer<typeof mintSchema>;

export const mintDefaults: MintSchema = {
  name: "",
  symbol: "",
  description: "",
  amount: 0,
  sellerFeeBasisPoints: 0,
  decimals: 0,
};
