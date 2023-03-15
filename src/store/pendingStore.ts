import { create } from "zustand"

type PendingStore = {
  transaction?: string
  setTransaction: (transaction: string) => void
  clearTransaction: () => void
}

export const usePendingStore = create<PendingStore>((set) => ({
  transaction: undefined,
  setTransaction: (transaction) => set({ transaction }),
  clearTransaction: () => set({ transaction: undefined }),
}))
