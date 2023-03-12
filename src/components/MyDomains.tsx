import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { useAccount } from "wagmi"

import { queries } from "@/lib/query"
import { useIsClientReady } from "@/hooks"

import { Domain } from "@/components/Domain"
import { Spinner } from "@/components/Spinner"

export const MyDomains: FC = () => {
  const isClientReady = useIsClientReady()
  const { address, isConnected } = useAccount()
  const { data, isLoading } = useQuery({
    ...queries.domains.user(address ?? "0x"),
    enabled: !!address,
  })

  return (
    <div className="min-h-[4.5rem] grid">
      {!isConnected && isClientReady ? (
        <div className="flex h-full w-full items-center text-gray-400 justify-center">
          Connect your wallet to view your domains
        </div>
      ) : isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      ) : data?.account?.registrations?.length ? (
        <div className="divide-y divide-gray-800">
          {data.account.registrations.map((registration) => (
            <Domain
              key={registration.domain.id}
              name={registration.domain.name}
              expiryDate={registration.expiryDate}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center text-gray-400 justify-center">
          You don't own any domains yet
        </div>
      )}
    </div>
  )
}
