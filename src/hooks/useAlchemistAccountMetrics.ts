import { parseUnits } from "ethers/lib/utils.js"
import { useAccount, useContractReads } from "wagmi"

import { alchemistConfig } from "@/constant"

export function useAlchemistAccountMetrics() {
  const { address = "0x" } = useAccount()
  return useContractReads({
    contracts: [
      { ...alchemistConfig, functionName: "minimumCollateralization" },
      { ...alchemistConfig, functionName: "accounts", args: [address] },
      { ...alchemistConfig, functionName: "totalValue", args: [address] },
    ],
    enabled: address !== "0x",
    select: ([minCollatRatio, [totalDebt], totalDeposited]) => {
      const currCollatRatio = totalDebt.gt(0) ? parseUnits(totalDeposited.div(totalDebt).toString()) : parseUnits("0")
      return {
        currCollatRatio,
        isCollateralized: currCollatRatio.gte(minCollatRatio) || (totalDeposited.gt(0) && totalDebt.lte(0)),
        minCollatRatio,
        totalDeposited,
        totalDebt,
      }
    },
  })
}
