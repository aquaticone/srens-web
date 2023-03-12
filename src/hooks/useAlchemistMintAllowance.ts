import { BigNumber } from "ethers"
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi"

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

export function useWriteAlchemistMintAllowance(amount: BigNumber) {
  const prepare = usePrepareContractWrite({
    ...alchemistConfig,
    functionName: "approveMint",
    args: [selfRepayingEnsAddress, amount],
  })
  const write = useContractWrite(prepare.config)
  const wait = useWaitForTransaction(write.data?.hash)
  return {
    isError: prepare.isError || write.isError,
    isLoading: prepare.isLoading,
    isWaiting: write.isLoading || wait.isLoading,
    write: write.write,
  }
}
