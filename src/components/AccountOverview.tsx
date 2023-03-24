import { formatUnits } from "ethers/lib/utils.js"
import Link from "next/link"
import { FC } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import { useAccount } from "wagmi"

import { clsxm } from "@/lib"
import { formatLocaleUnits } from "@/lib/formatLocaleUnits"
import { useAlchemistAccountMetrics, useIsClientReady, useReadSubscriptions } from "@/hooks"

import { SectionTitle } from "@/components/SectionTitle"

export const AccountOverview: FC = () => {
  const isClientReady = useIsClientReady()
  const { isConnected } = useAccount()
  const accountMetrics = useAlchemistAccountMetrics()
  const subscriptions = useReadSubscriptions()

  return (
    <section>
      <div className="flex items-baseline justify-between">
        <SectionTitle className="max-md:text-white">Account</SectionTitle>
        <Link
          className="inline-flex items-center gap-1 rounded text-sm text-bronze underline focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800 md:text-xs"
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
          <dt className="text-comet-50">Subscriptions</dt>
          <dd className="text-right">
            {isClientReady && subscriptions.data?.subscribedNames ? subscriptions.data.subscribedNames.length : "–"}
          </dd>
          <dt className="text-comet-50">Renewal task</dt>
          <dd className="text-right">
            {isClientReady &&
            subscriptions.data?.taskId &&
            subscriptions.data.taskId !== "0x0000000000000000000000000000000000000000000000000000000000000000" ? (
              <Link
                className="-mx-1.5 inline-flex items-center justify-end gap-1 rounded-lg px-1.5 text-bronze underline focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze"
                href={`https://app.gelato.network/task/${subscriptions.data.taskId}?chainId=1`}
                target="_blank"
              >
                <span className="sr-only">Gelato task</span>
                <span>Gelato</span>
                <FaExternalLinkAlt className="h-3 w-3" />
              </Link>
            ) : (
              "–"
            )}
          </dd>
        </dl>
        {isClientReady && accountMetrics.isSuccess && !accountMetrics.data?.isCollateralized && (
          <p className="my-1 text-sm text-red md:text-xs">
            Auto-renewals will not be processed if your collateralization ratio is below{" "}
            {formatUnits(accountMetrics.data?.minCollatRatio ?? "2")}
          </p>
        )}
      </div>
    </section>
  )
}
