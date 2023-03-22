import { BigNumber } from "ethers"
import { formatUnits } from "ethers/lib/utils.js"

export function formatLocaleUnits(value: BigNumber) {
  return Intl.NumberFormat("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 3, notation: "compact" })
    .format(Number(formatUnits(value)))
    .toLocaleUpperCase()
}
