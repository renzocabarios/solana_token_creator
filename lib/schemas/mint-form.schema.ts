import { z } from "zod";

export const MintFormSchema = z.object({
  name: z.string().min(3),
  symbol: z.string().min(1),
  description: z.string().min(5),
  amount: z.coerce.number(),
  decimals: z.coerce.number(),
});

export type MintFormSchema = z.infer<typeof MintFormSchema>;

export const MintFormSchemaDefaults: MintFormSchema = {
  name: "",
  symbol: "",
  description: "",
  amount: 0,
  decimals: 0,
};
