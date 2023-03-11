import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { AppProps } from "next/app"
import { WagmiConfig } from "wagmi"

import "@rainbow-me/rainbowkit/styles.css"
import "@/styles/globals.css"

import { montserrat } from "@/lib/font"
import { chains, wagmiClient } from "@/lib/wagmi"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.variable} font-sans`}>
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
    </div>
  )
}

export default MyApp
