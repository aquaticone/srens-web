import { createQueryKeyStore } from "@lukemorales/query-key-factory"
import { QueryClient } from "@tanstack/react-query"
import { Address } from "wagmi"

import { getBuiltGraphSDK } from "../../.graphclient"

export const queryClient = new QueryClient()

const sdk = getBuiltGraphSDK()

export const queries = createQueryKeyStore({
  domains: {
    user: (address: Address) => ({
      queryKey: [address],
      queryFn: () =>
        sdk.getDomainsForAddress({ address: address.toLowerCase() }),
    }),
    lookup: (name: string) => ({
      queryKey: [name],
      queryFn: () => sdk.getDomainByName({ name }),
    }),
  },
})
