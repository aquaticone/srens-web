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

import { useSrensStore } from "@/store"

import { selfRepayingEnsConfig } from "@/constant"

export function useReadSubscriptions() {
  const { address } = useAccount()
  const setToast = useSrensStore((store) => store.setToast)
  return useContractReads({
    contracts: [
      { ...selfRepayingEnsConfig, functionName: "subscribedNames", args: [address ?? "0x"] },
      { ...selfRepayingEnsConfig, functionName: "getTaskId", args: [address ?? "0x"] },
    ],
    enabled: !!address,
    watch: true,
    select: ([subscribedNames, taskId]) => ({ subscribedNames: subscribedNames.map((name) => `${name}.eth`), taskId }),
    onError: () => setToast("error", "Error fetching subscriptions"),
  })
}

export function useUpdateSubscriptions(onSuccess?: () => void) {
  const queuedCalls = useSrensStore((store) => store.queuedCalls)
  const dequeueAllCalls = useSrensStore((store) => store.dequeueAllCalls)
  const setToast = useSrensStore((store) => store.setToast)

  const contractInterface = useMemo(() => new ethers.utils.Interface(selfRepayingEnsConfig.abi), [])
  const calldata = useMemo(
    () =>
      queuedCalls.map(
        (change) =>
          contractInterface.encodeFunctionData(change.type, [
            change.name?.substring(0, change.name.indexOf(".eth")).toLowerCase(),
          ]) as Address
      ),
    [queuedCalls, contractInterface]
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
      setToast("error", err instanceof UserRejectedRequestError ? "Request rejected" : "Transaction failed"),
    onMutate: () => setToast("pending", "Waiting for signature"),
    onSuccess: () => setToast("pending", "Waiting for confirmation"),
  })
  const wait = useWaitForTransaction({
    hash: write.data?.hash,
    onError: () => setToast("error", "Error updating subscriptions"),
    onSuccess: () => {
      setToast("success", "Subscriptions updated")
      dequeueAllCalls()
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
