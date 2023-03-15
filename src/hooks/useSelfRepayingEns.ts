import { ethers } from "ethers"
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"

import { subscriptionName } from "@/lib"

import { useQueueStore, useToastStore } from "@/store"
import { usePendingStore } from "@/store"

import { selfRepayingEnsConfig } from "@/constant"

export function useReadSubscriptions() {
  const { address } = useAccount()
  return useContractRead({
    ...selfRepayingEnsConfig,
    functionName: "subscribedNames",
    args: [address ?? "0x"],
    enabled: !!address,
    watch: true,
  })
}

export function useWriteSubscriptions(onSuccess?: () => void) {
  const [calls, removeAllCalls] = useQueueStore((store) => [store.calls, store.removeAllCalls])
  const [setTransaction, clearTransaction] = usePendingStore((store) => [store.setTransaction, store.clearTransaction])
  const setToast = useToastStore((store) => store.setToast)

  const contractInterface = new ethers.utils.Interface(selfRepayingEnsConfig.abi)
  const calldata = calls.map(
    (change) => contractInterface.encodeFunctionData(change.type, [subscriptionName(change.name)]) as Address
  )

  const prepare = usePrepareContractWrite({
    ...selfRepayingEnsConfig,
    functionName: "multicall",
    args: [calldata],
    enabled: !!calldata.length,
  })
  const write = useContractWrite({
    ...prepare.config,
    onError: () => setToast("Transaction rejected", "error"),
    onMutate: () => setToast("Waiting for signature", "pending"),
    onSuccess: () => {
      setToast("Waiting for confirmation", "pending")
      setTransaction("updating subscriptions")
    },
  })
  const wait = useWaitForTransaction({
    hash: write.data?.hash,
    onError: () => setToast("Error updating subscriptions", "error"),
    onSuccess: () => {
      setToast("Subscriptions updated", "success")
      clearTransaction()
      removeAllCalls()
      onSuccess?.()
    },
  })

  return {
    isError: prepare.isError || write.isError,
    isLoading: prepare.isLoading,
    isWaiting: write.isLoading || wait.isLoading,
    isSuccess: write.isSuccess,
    write: write.write,
  }
}
