import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createClient } from "wagmi"
import { foundry, mainnet } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"

const isFoundryEnabled = process.env.NEXT_PUBLIC_ENABLE_FOUNDRY === "true"

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, ...(isFoundryEnabled ? [foundry] : [])],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? "" }),
    jsonRpcProvider({ rpc: (_chain) => ({ http: "https://eth.llamarpc.com" }) }),
  ]
)

const { connectors } = getDefaultWallets({
  appName: "Self Repaying ENS",
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export { chains }
