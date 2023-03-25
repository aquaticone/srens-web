import { create } from "zustand"
import { persist } from "zustand/middleware"

import { Maybe } from ".graphclient"

type QueuedCall = {
  name: Maybe<string> | undefined
  type: "subscribe" | "unsubscribe"
}

type Toast = {
  status: "error" | "pending" | "success"
  message: string
}

type SrensStore = {
  showExplainer: boolean
  setShowExplainer: (showExplainer: boolean) => void
  queuedCalls: Array<QueuedCall>
  enqueueCall: (call: QueuedCall) => void
  dequeueCall: (name: QueuedCall["name"]) => void
  dequeueAllCalls: () => void
  toast?: Toast
  setToast: (status: Toast["status"], message: Toast["message"]) => void
  unsetToast: () => void
}

export const useSrensStore = create<SrensStore>()(
  persist(
    (set) => ({
      showExplainer: true,
      setShowExplainer: (showExplainer) => set({ showExplainer }),
      queuedCalls: [],
      enqueueCall: (call) => set((state) => ({ queuedCalls: [...state.queuedCalls, call] })),
      dequeueCall: (name) => set((state) => ({ queuedCalls: state.queuedCalls.filter((c) => c.name !== name) })),
      dequeueAllCalls: () => set({ queuedCalls: [] }),
      toast: undefined,
      setToast: (status, message) => set({ toast: { status, message } }),
      unsetToast: () => set({ toast: undefined }),
    }),
    {
      name: "srens-store",
      partialize: (state) => ({
        // persist only the following properties
        showExplainer: state.showExplainer,
      }),
    }
  )
)
