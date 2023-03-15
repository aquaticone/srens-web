import { BigNumber } from "ethers"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"

import { useToastStore } from "@/store"

import { alchemistConfig, selfRepayingEnsAddress } from "@/constant"

export function useReadAlchemistMintAllowance() {
  const { address } = useAccount()
  return useContractRead({
    ...alchemistConfig,
    functionName: "mintAllowance",
    args: [address ?? "0x", selfRepayingEnsAddress],
    enabled: !!address,
    select: (data) => data.gt(0),
    watch: true,
  })
}

export function useWriteAlchemistMintAllowance(amount: BigNumber, onSuccess?: (data: unknown) => void) {
  const setToast = useToastStore((store) => store.setToast)
  const prepare = usePrepareContractWrite({
    ...alchemistConfig,
    functionName: "approveMint",
    args: [selfRepayingEnsAddress, amount],
  })
  const write = useContractWrite({
    ...prepare.config,
    onError: () => setToast("Transaction rejected", "error"),
    onMutate: () => setToast("Waiting for signature", "pending"),
    onSuccess: () => setToast("Mint allowance updated", "success"),
  })
  const wait = useWaitForTransaction({ hash: write.data?.hash, onSuccess })
  return {
    isError: prepare.isError || write.isError,
    isLoading: prepare.isLoading,
    isWaiting: write.isLoading || wait.isLoading,
    write: write.write,
  }
}
