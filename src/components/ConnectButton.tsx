import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit"
import { FC, useEffect } from "react"
import { useNetwork } from "wagmi"

import { chains } from "@/lib"

import { useQueueStore } from "@/store"

export const ConnectButton: FC = () => {
  const { chain } = useNetwork()
  const removeAllCalls = useQueueStore((store) => store.removeAllCalls)
  useEffect(() => {
    removeAllCalls()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id])

  return (
    <RainbowConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const connected = mounted && account && chain
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => (
              <div className="flex gap-3">
                {connected ? (
                  chain.unsupported ? (
                    <button
                      className="rounded border border-comet-600 bg-comet-700 px-3 py-1.5 text-sm text-comet-100 transition-colors hover:border-comet-500 hover:bg-comet-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
                      onClick={openChainModal}
                      type="button"
                    >
                      Unsupported chain
                    </button>
                  ) : (
                    <>
                      {chains.length > 1 && (
                        <button
                          className="rounded border border-comet-600 bg-comet-700 text-sm text-comet-100 transition-colors hover:border-comet-500 hover:bg-comet-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
                          onClick={openChainModal}
                          type="button"
                        >
                          <div className="flex items-center gap-3 px-3 py-1.5">
                            {chain.hasIcon && chain.iconUrl && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} className="h-4 w-4" />
                            )}
                            <span className="max-md:hidden">{chain.name}</span>
                          </div>
                        </button>
                      )}

                      <button
                        className="rounded border border-comet-600 bg-comet-700 px-3 py-1.5 text-sm text-comet-100 transition-colors hover:border-comet-500 hover:bg-comet-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
                        onClick={openAccountModal}
                        type="button"
                      >
                        {account.displayName}
                      </button>
                    </>
                  )
                ) : (
                  <button
                    className="rounded border border-comet-600 bg-comet-700 px-3 py-1.5 text-sm text-comet-100 transition-colors hover:border-comet-500 hover:bg-comet-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            ))()}
          </div>
        )
      }}
    </RainbowConnectButton.Custom>
  )
}
