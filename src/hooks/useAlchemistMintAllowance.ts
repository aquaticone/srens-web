import { ethers } from "ethers"
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  UserRejectedRequestError,
  useWaitForTransaction,
} from "wagmi"

import { useSrensStore } from "@/store"

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
  const setToast = useSrensStore((store) => store.setToast)
  const prepare = usePrepareContractWrite({
    ...alchemistConfig,
    functionName: "approveMint",
    args: [selfRepayingEnsAddress, ethers.constants.MaxUint256],
  })
  const write = useContractWrite({
    ...prepare.config,
    onError: (err) => (err instanceof UserRejectedRequestError ? null : setToast("error", "Transaction failed")),
    onMutate: () => setToast("pending", "Waiting for signature"),
    onSuccess: () => setToast("pending", "Waiting for confirmation"),
  })
  const wait = useWaitForTransaction({
    hash: write.data?.hash,
    onError: () => setToast("error", "Error updating mint allowance"),
    onSuccess: () => setToast("success", "Mint allowance updated"),
  })
  return {
    isError: prepare.isError || write.isError,
    isLoading: prepare.isLoading,
    isWaiting: write.isLoading || wait.isLoading,
    write: write.write,
  }
}
