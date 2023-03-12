import Link from "next/link"
import { FC, PropsWithChildren } from "react"
import { FaGithub } from "react-icons/fa"

import { ConnectButton } from "@/components"

import Etherscan from "~/svg/etherscan.svg"

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 grid-rows-[auto,1fr,auto]">
      <header className="py-5 bg-grey-600 border-b border-b-grey">
        <div className="layout items-center flex justify-center sm:justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-lg uppercase font-semibold tracking-widest">
              Self-Repaying ENS
            </h1>
            <Link
              className="text-xs max-sm:mt-2 rounded text-bronze-200 max-sm:block max-sm:text-center hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze-100"
              href="https://alchemix.fi"
              target="_blank"
            >
              <span>Powered by</span>{" "}
              <span className="text-bronze-100 font-medium">Alchemix</span>
            </Link>
          </div>
          <div className="shrink-0">
            <ConnectButton />
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-t-grey py-6">
        <div className="layout md:flex md:justify-between max-md:text-center max-md:space-y-3">
          <div className="inline-flex gap-5 md:gap-3 max-md:mx-auto">
            <Link
              className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-100"
              href="https://github.com/The-Wary-One/self-repaying-ens"
              target="_blank"
            >
              <FaGithub className="w-8 h-8 md:w-5 md:h-5 fill-grey-100" />
            </Link>
            <Link
              className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze-100"
              href="https://etherscan.io/address/0xef6274Eb92b55dA6D4BCE0b7D686f37064348aBB#code"
              target="_blank"
            >
              <Etherscan className="w-8 h-8 md:w-5 md:h-5 fill-grey-100" />
            </Link>
          </div>
          <div>
            <Link
              className="text-xs text-grey-100 focus:outline-none focus-visible:ring-1 rounded focus-visible:ring-bronze-100"
              href="https://alchemix.fi"
              target="_blank"
            >
              Powered by <span className="font-medium">Alchemix</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
