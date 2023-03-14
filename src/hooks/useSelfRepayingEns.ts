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

import { QueuedCall } from "@/store"

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

export function useWriteSubscriptions(changes: Array<QueuedCall>, onSuccess: () => void) {
  const contractInterface = new ethers.utils.Interface(selfRepayingEnsConfig.abi)
  const calldata = changes.map(
    (change) => contractInterface.encodeFunctionData(change.type, [subscriptionName(change.name)]) as Address
  )
  const prepare = usePrepareContractWrite({
    ...selfRepayingEnsConfig,
    functionName: "multicall",
    args: [calldata],
    enabled: !!calldata.length,
  })
  const write = useContractWrite(prepare.config)
  const wait = useWaitForTransaction({ hash: write.data?.hash, onSuccess })
  return {
    isError: prepare.isError || write.isError,
    isLoading: prepare.isLoading,
    isWaiting: write.isLoading || wait.isLoading,
    isSuccess: write.isSuccess,
    write: write.write,
  }
}
