import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"

import { selfRepayingEnsConfig } from "@/constant"

import { Maybe } from ".graphclient"

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

export function useWriteSubscription(
  name: Maybe<string> | undefined,
  subscribed: boolean,
  onSettled?: (data: unknown) => void
) {
  const prepare = usePrepareContractWrite({
    ...selfRepayingEnsConfig,
    functionName: subscribed ? "subscribe" : "unsubscribe",
    args: [name ?? ""],
    enabled: !!name,
  })
  const write = useContractWrite(prepare.config)
  const wait = useWaitForTransaction({ hash: write.data?.hash, onSettled })
  return {
    isError: prepare.isError || write.isError,
    isLoading: prepare.isLoading,
    isWaiting: write.isLoading || wait.isLoading,
    isSuccess: write.isSuccess,
    write: write.write,
  }
}
