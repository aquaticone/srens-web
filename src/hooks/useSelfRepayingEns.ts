import { ethers } from "ethers"
import { useMemo } from "react"
import {
  Address,
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  UserRejectedRequestError,
  useWaitForTransaction,
} from "wagmi"

import { useQueueStore, useToastStore } from "@/store"

import { selfRepayingEnsConfig } from "@/constant"

export function useReadSubscriptions() {
  const { address } = useAccount()
  const setToast = useToastStore((store) => store.setToast)
  return useContractReads({
    contracts: [
      { ...selfRepayingEnsConfig, functionName: "subscribedNames", args: [address ?? "0x"] },
      { ...selfRepayingEnsConfig, functionName: "getTaskId", args: [address ?? "0x"] },
    ],
    enabled: !!address,
    watch: true,
    select: ([subscribedNames, taskId]) => ({ subscribedNames: subscribedNames.map((name) => `${name}.eth`), taskId }),
    onError: () => setToast("Error fetching subscriptions", "error"),
  })
}

export function useUpdateSubscriptions(onSuccess?: () => void) {
  const calls = useQueueStore((store) => store.calls)
  const removeAllCalls = useQueueStore((store) => store.removeAllCalls)
  const setToast = useToastStore((store) => store.setToast)

  const contractInterface = useMemo(() => new ethers.utils.Interface(selfRepayingEnsConfig.abi), [])
  const calldata = useMemo(
    () =>
      calls.map(
        (change) =>
          contractInterface.encodeFunctionData(change.type, [
            change.name?.substring(0, change.name.indexOf(".eth")).toLowerCase(),
          ]) as Address
      ),
    [calls, contractInterface]
  )

  const prepare = usePrepareContractWrite({
    ...selfRepayingEnsConfig,
    functionName: "multicall",
    args: [calldata],
    enabled: !!calldata.length,
  })
  const write = useContractWrite({
    ...prepare.config,
    onError: (err) =>
      setToast(err instanceof UserRejectedRequestError ? "Request rejected" : "Transaction failed", "error"),
    onMutate: () => setToast("Waiting for signature", "pending"),
    onSuccess: () => setToast("Waiting for confirmation", "pending"),
  })
  const wait = useWaitForTransaction({
    hash: write.data?.hash,
    onError: () => setToast("Error updating subscriptions", "error"),
    onSuccess: () => {
      setToast("Subscriptions updated", "success")
      removeAllCalls()
      onSuccess?.()
    },
  })

  return {
    isError: prepare.isError || write.isError,
    isLoading: prepare.isLoading,
    isWaiting: write.isLoading || wait.isLoading,
    write: write.write,
  }
}
