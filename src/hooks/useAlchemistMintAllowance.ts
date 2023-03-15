import { ethers } from "ethers"
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

export function useUpdateAlchemistMintAllowance() {
  const setToast = useToastStore((store) => store.setToast)
  const prepare = usePrepareContractWrite({
    ...alchemistConfig,
    functionName: "approveMint",
    args: [selfRepayingEnsAddress, ethers.constants.MaxUint256],
  })
  const write = useContractWrite({
    ...prepare.config,
    onError: () => setToast("Transaction failed", "error"),
    onMutate: () => setToast("Waiting for signature", "pending"),
    onSuccess: () => setToast("Waiting for confirmation", "pending"),
  })
  const wait = useWaitForTransaction({
    hash: write.data?.hash,
    onError: () => setToast("Error updating mint allowance", "error"),
    onSuccess: () => setToast("Mint allowance updated", "success"),
  })
  return {
    isError: prepare.isError || write.isError,
    isLoading: prepare.isLoading,
    isWaiting: write.isLoading || wait.isLoading,
    write: write.write,
  }
}
