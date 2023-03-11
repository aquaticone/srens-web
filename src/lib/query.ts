import { createQueryKeyStore } from "@lukemorales/query-key-factory"
import { QueryClient } from "@tanstack/react-query"
import { Address } from "wagmi"

import { getBuiltGraphSDK } from "../../.graphclient"

export const queryClient = new QueryClient()

const sdk = getBuiltGraphSDK()

export const queries = createQueryKeyStore({
  user: {
    domains: (address: Address) => ({
      queryKey: [address],
      queryFn: () => sdk.getDomainsForOwner({ address: address.toLowerCase() }),
    }),
  },
})
