import { createSelectors } from "@/lib/zustand/createSelectors";
import { create } from "zustand";
import { MetadataSchema, metadataDefaults } from "../schemas/metadata.schema";

interface CreateTokenState {
  page: number;
  metadata: MetadataSchema;
}

interface CreateTokenActions {
  setPage: (page: number) => void;
  setMetadata: (data: MetadataSchema) => void;
  handleNextPage: () => void;
  handleBackPage: () => void;
}

type CreateTokenStore = CreateTokenState & CreateTokenActions;

const initialState: CreateTokenState = {
  page: 0,
  metadata: metadataDefaults,
};

const useCreateTokenStoreBase = create<CreateTokenStore>((set) => ({
  setPage: (page: number) => set(() => ({ page })),
  setMetadata: (data) => set(() => ({ metadata: data })),
  handleNextPage: () => set((state) => ({ page: state.page + 1 })),
  handleBackPage: () => set((state) => ({ page: state.page - 1 })),
  ...initialState,
}));

export const useCreateToken = createSelectors(useCreateTokenStoreBase);
