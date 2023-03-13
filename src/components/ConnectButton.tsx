import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit"
import { FC } from "react"

import { chains } from "@/lib/wagmi"

export const ConnectButton: FC = () => {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
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
                      className="focus-focus-visible:ring-bronze rounded border border-comet-600 bg-comet-700 px-3 text-sm text-comet-100 transition-colors hover:border-comet-500 hover:bg-comet-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
                      onClick={openChainModal}
                      type="button"
                    >
                      Unsupported chain
                    </button>
                  ) : (
                    <>
                      {chains.length > 1 && (
                        <button
                          className="focus-focus-visible:ring-bronze rounded border border-comet-600 bg-comet-700 text-sm text-comet-100 transition-colors hover:border-comet-500 hover:bg-comet-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
                          onClick={openChainModal}
                          type="button"
                        >
                          <div className="flex items-center gap-3 px-3 py-1.5">
                            {chain.hasIcon && chain.iconUrl && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                className="h-4 w-4"
                              />
                            )}
                            <span className="max-md:hidden">{chain.name}</span>
                          </div>
                        </button>
                      )}

                      <button
                        className="focus-focus-visible:ring-bronze group rounded border border-comet-600 bg-comet-700 text-sm text-comet-100 transition-colors hover:border-comet-500 hover:bg-comet-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
                        onClick={openAccountModal}
                        type="button"
                      >
                        <span className="px-3 py-1.5">
                          {account.displayName}
                        </span>
                        {account.displayBalance ? (
                          <span className="border-l border-inherit px-3 py-1.5">
                            {account.displayBalance}
                          </span>
                        ) : null}
                      </button>
                    </>
                  )
                ) : (
                  <button
                    className="focus-focus-visible:ring-bronze rounded border border-comet-600 bg-comet-700 px-3 py-1.5 text-sm text-comet-100 transition-colors hover:border-comet-500 hover:bg-comet-600 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
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
