import { create } from "zustand"

import { Maybe } from ".graphclient"

export type QueuedCall = {
  name: Maybe<string> | undefined
  type: "subscribe" | "unsubscribe"
}

type QueueStore = {
  calls: Array<QueuedCall>
  addCall: (call: QueuedCall) => void
  removeCall: (name: QueuedCall["name"]) => void
  removeAllCalls: () => void
}

export const useQueueStore = create<QueueStore>()((set) => ({
  calls: [],
  addCall: (call) => set((state) => ({ calls: [...state.calls, call] })),
  removeCall: (name) => set((state) => ({ calls: state.calls.filter((c) => c.name !== name) })),
  removeAllCalls: () => set({ calls: [] }),
}))
