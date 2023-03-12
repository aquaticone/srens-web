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
                      className="bg-grey-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze transition-colors border px-3 border-grey-300 hover:border-grey-200 text-sm text-grey-100 hover:text-silver hover:bg-grey-300 rounded"
                      onClick={openChainModal}
                      type="button"
                    >
                      Unsupported chain
                    </button>
                  ) : (
                    <>
                      {chains.length > 1 && (
                        <button
                          className="bg-grey-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze transition-colors border border-grey-300 hover:border-grey-200 text-sm text-grey-100 hover:text-silver hover:bg-grey-300 rounded"
                          onClick={openChainModal}
                          type="button"
                        >
                          <div className="flex items-center gap-3 px-3 py-1.5">
                            {chain.hasIcon && chain.iconUrl && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                className="w-4 h-4"
                              />
                            )}
                            <span className="max-md:hidden">{chain.name}</span>
                          </div>
                        </button>
                      )}

                      <button
                        className="bg-grey-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze transition-colors group border border-grey-300 hover:border-grey-200 text-sm text-grey-100 hover:text-silver hover:bg-grey-300 rounded"
                        onClick={openAccountModal}
                        type="button"
                      >
                        <span className="px-3 py-1.5">
                          {account.displayName}
                        </span>
                        {account.displayBalance ? (
                          <span className="px-3 py-1.5 border-l group-hover:border-l-grey-200 border-l-grey-300 transition-colors">
                            {account.displayBalance}
                          </span>
                        ) : null}
                      </button>
                    </>
                  )
                ) : (
                  <button
                    className="bg-grey-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze transition-colors border px-3 py-1.5 border-grey-300 hover:border-grey-200 text-sm text-grey-100 hover:text-silver hover:bg-grey-300 rounded"
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
