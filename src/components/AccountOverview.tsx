import { BigNumber } from "ethers"
import { formatUnits } from "ethers/lib/utils.js"
import { FC } from "react"
import { useAccount } from "wagmi"

import { clsxm } from "@/lib"
import { formatLocaleUnits } from "@/lib/formatLocaleUnits"
import { useAlchemistAccountMetrics, useIsClientReady, useReadSubscriptions } from "@/hooks"

import { PrettyLink } from "@/components/PrettyLink"
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
        <PrettyLink className="text-xs text-bronze" href="https://alchemix.fi/vaults" external>
          Alchemix
        </PrettyLink>
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
              ? accountMetrics.data.totalDebt.gte(0)
                ? `${formatLocaleUnits(accountMetrics.data.totalDebt)} ETH`
                : `${formatLocaleUnits(BigNumber.from(0))} ETH`
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
              ? accountMetrics.data.totalDebt.gte(0) && accountMetrics.data.totalDeposited.gt(0)
                ? formatLocaleUnits(accountMetrics.data.currCollatRatio)
                : accountMetrics.data.totalDeposited.gt(0)
                ? "∞"
                : "0.0"
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
              <PrettyLink
                className="text-xs text-bronze"
                href={`https://app.gelato.network/task/${subscriptions.data.taskId}?chainId=1`}
                external
              >
                Gelato
              </PrettyLink>
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
