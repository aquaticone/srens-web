import { useQuery } from "@tanstack/react-query"
import { useAccount } from "wagmi"

import { queries } from "@/lib"
import { useReadSubscriptions } from "@/hooks/useSelfRepayingEns"

import { useToastStore } from "@/store"

export function useAllDomains() {
  const { address } = useAccount()
  const setToast = useToastStore((store) => store.setToast)

  // get subscribed domains from contract
  const subscribedDomains = useReadSubscriptions()

  // get owned domains from subgraph
  const ownedDomainNames = useQuery({
    ...queries.domains.user(address ?? "0x"),
    enabled: !!address,
    onError: () => setToast("Error fetching owned domains", "error"),
    keepPreviousData: true,
  })

  // merge subscribed + owned into unique array of names
  const allDomainNames = Array.from(
    new Set([
      ...(subscribedDomains.data ?? []),
      ...(ownedDomainNames.data?.account?.registrations?.map((r) => r.domain.name) ?? []),
    ])
  ).filter((name) => !!name) as Array<string>

  // request full domain data from subgraph once unique list is ready
  const allDomains = useQuery({
    ...queries.domains.list(allDomainNames),
    enabled: subscribedDomains.isFetchedAfterMount && ownedDomainNames.isFetchedAfterMount && allDomainNames.length > 0,
    onError: () => setToast("Error fetching domain data", "error"),
    keepPreviousData: true,
  })

  // return domains sorted by ascending expiryDate
  return {
    data: allDomains.data?.domains.sort(
      (a, b) => Number(a.registration?.expiryDate ?? "0") - Number(b.registration?.expiryDate ?? "0")
    ),
    isLoading: subscribedDomains.isLoading || ownedDomainNames.isInitialLoading || allDomains.isInitialLoading,
  }
}
