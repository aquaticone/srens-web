import { formatUnits } from "ethers/lib/utils.js"
import Link from "next/link"
import { FC } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import { useAccount } from "wagmi"

import { clsxm } from "@/lib"
import { formatLocaleUnits } from "@/lib/formatLocaleUnits"
import { useAlchemistAccountMetrics, useIsClientReady } from "@/hooks"

import { SectionTitle } from "@/components/SectionTitle"

export const AccountOverview: FC = () => {
  const isClientReady = useIsClientReady()
  const { isConnected } = useAccount()
  const accountMetrics = useAlchemistAccountMetrics()

  return (
    <section>
      <div className="flex items-baseline justify-between">
        <SectionTitle className="max-md:text-white">Account</SectionTitle>
        <Link
          className="flex items-center gap-1 text-sm text-bronze underline md:text-xs"
          href="https://alchemix.fi/vaults"
          target="_blank"
        >
          Alchemix
          <FaExternalLinkAlt className="h-3 w-3" />
        </Link>
      </div>

      <div className="rounded md:border md:border-comet-600 md:bg-comet-700 md:py-1 md:px-2">
        <dl className="grid grid-cols-[1fr,max-content] text-sm leading-loose">
          <dt className="text-comet-50">Total deposit</dt>
          <dd className="text-right font-mono">
            {isClientReady && accountMetrics.data?.totalDeposited
              ? `${formatLocaleUnits(accountMetrics.data.totalDeposited)} ETH`
              : "–"}
          </dd>
          <dt className="text-comet-50">Current debt</dt>
          <dd className="text-right font-mono">
            {isClientReady && accountMetrics.data?.totalDebt
              ? `${formatLocaleUnits(accountMetrics.data.totalDebt)} ETH`
              : "–"}
          </dd>
          <dt className="text-comet-50">Collateralization</dt>
          <dd
            className={clsxm("text-right font-mono", {
              "text-green": isClientReady && accountMetrics.data?.isCollateralized,
              "text-red": isClientReady && isConnected && !accountMetrics.data?.isCollateralized,
            })}
          >
            {isClientReady && accountMetrics.data?.currCollatRatio
              ? formatLocaleUnits(accountMetrics.data.currCollatRatio)
              : "–"}
          </dd>
        </dl>
        {isClientReady && isConnected && !accountMetrics.data?.isCollateralized && (
          <p className="text-xs text-red">
            Auto-renewals will not be processed if your collateralization ratio is below{" "}
            {formatUnits(accountMetrics.data?.minCollatRatio ?? "2")}
          </p>
        )}
      </div>
    </section>
  )
}
