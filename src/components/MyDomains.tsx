import { useQuery } from "@tanstack/react-query"
import { FC, useMemo } from "react"
import { useAccount } from "wagmi"

import { queries } from "@/lib"
import { useIsClientReady, useReadSubscriptions } from "@/hooks"

import { Domain } from "@/components/Domain"
import { FallbackMessage } from "@/components/FallbackMessage"
import { Spinner } from "@/components/Spinner"

type MyDomainsProps = {
  include: "all" | "subscribed" | "unsubscribed"
}

export const MyDomains: FC<MyDomainsProps> = ({ include }) => {
  const isClientReady = useIsClientReady()
  const { address, isConnected } = useAccount()

  const ownedDomains = useQuery({
    ...queries.domains.user(address ?? "0x"),
    enabled: !!address,
  })

  const subscribedDomains = useReadSubscriptions()

  const visibleDomains = useMemo(() => {
    const registrations = ownedDomains.data?.account?.registrations ?? []
    if (include !== "all" && registrations.length) {
      return registrations.filter(
        (r) => r.domain.name && subscribedDomains.data?.includes(r.domain.name)
      )
    }
    return registrations
  }, [
    include,
    ownedDomains.data?.account?.registrations,
    subscribedDomains.data,
  ])

  return (
    <>
      {!isConnected && isClientReady ? (
        <FallbackMessage variant="black">
          Connect your wallet to view your domains
        </FallbackMessage>
      ) : ownedDomains.isLoading || subscribedDomains.isLoading ? (
        <FallbackMessage variant="transparent">
          <Spinner className="h-8 w-8" />
        </FallbackMessage>
      ) : !visibleDomains?.length ? (
        <FallbackMessage variant="black">
          You don't own any domains
        </FallbackMessage>
      ) : (
        visibleDomains.map((registration) => (
          <Domain
            key={registration.domain.id}
            name={registration.domain.name}
            expiryDate={registration.expiryDate}
            registrationDate={registration.registrationDate}
            renewalEvents={registration.events}
          />
        ))
      )}
    </>
  )
}
