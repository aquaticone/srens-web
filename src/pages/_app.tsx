import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClientProvider } from "@tanstack/react-query"
import { AppProps } from "next/app"
import { WagmiConfig } from "wagmi"

import "@rainbow-me/rainbowkit/styles.css"
import "@/styles/globals.css"

import { chains, montserrat, queryClient, wagmiClient } from "@/lib"

const alchemixTheme = {
  ...darkTheme(),
  colors: {
    ...darkTheme().colors,
    accentColor: "#2ecc94", // green
    closeButton: "#616A85", // comet-400
    closeButtonBackground: "#20242C", // comet-700
    modalBackground: "#383D4D", // comet-600
  },
  radii: {
    ...darkTheme().radii,
    actionButton: "0.25rem",
    menuButton: "0.25rem",
    modal: "0.5rem",
    modalMobile: "0.5rem",
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.variable} font-sans`}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} modalSize="compact" theme={alchemixTheme}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </div>
  )
}

export default MyApp
