import { z } from "zod";

export const metadataSchema = z.object({
  name: z.string().min(3),
  symbol: z.string().min(1),
  description: z.string().min(5),
});

export type MetadataSchema = z.infer<typeof metadataSchema>;

export const metadataDefaults: MetadataSchema = {
  name: "",
  symbol: "",
  description: "",
};
