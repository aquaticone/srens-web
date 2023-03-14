import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { QueryClientProvider } from "@tanstack/react-query"
import { AppProps } from "next/app"
import { WagmiConfig } from "wagmi"

import "@rainbow-me/rainbowkit/styles.css"
import "@/styles/globals.css"

import { chains, montserrat, queryClient, wagmiClient } from "@/lib"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.variable} font-sans`}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            modalSize="compact"
            theme={darkTheme({
              accentColor: "#37485D",
              borderRadius: "small",
            })}
          >
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </div>
  )
}

export default MyApp
