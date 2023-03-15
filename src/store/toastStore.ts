import { create } from "zustand"

type ToastStatus = "error" | "pending" | "success"

type ToastStore = {
  message?: string
  status?: ToastStatus
  setToast: (message: string, status: ToastStatus) => void
  clearToast: () => void
}

export const useToastStore = create<ToastStore>((set) => ({
  message: undefined,
  status: undefined,
  setToast: (message, status) => set({ message, status }),
  clearToast: () => set({ message: undefined, status: undefined }),
}))
