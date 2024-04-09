import { createSelectors } from "@/lib/zustand/createSelectors";
import { create } from "zustand";

interface CreateTokenState {
  page: number;
}

interface CreateTokenActions {
  setPage: (page: number) => void;
  handleNextPage: () => void;
  handleBackPage: () => void;
}

type CreateTokenStore = CreateTokenState & CreateTokenActions;

const initialState: CreateTokenState = {
  page: 0,
};

const useCreateTokenStoreBase = create<CreateTokenStore>((set) => ({
  setPage: (page: number) => set(() => ({ page })),
  handleNextPage: () => set((state) => ({ page: state.page + 1 })),
  handleBackPage: () => set((state) => ({ page: state.page - 1 })),
  ...initialState,
}));

export const useCreateToken = createSelectors(useCreateTokenStoreBase);
