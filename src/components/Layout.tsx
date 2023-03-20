import Image from "next/image"
import Link from "next/link"
import { FC, PropsWithChildren } from "react"
import { FaGithub } from "react-icons/fa"

import { ConnectButton, Toaster } from "@/components"

import AlchemixLogo from "~/images/alchemix_logo.png"
import Etherscan from "~/svg/etherscan.svg"

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid min-h-screen grid-cols-1 grid-rows-[auto,1fr,auto] md:max-h-screen md:overflow-hidden">
      <header className="relative border-b border-b-comet-700 py-5">
        <div className="layout flex flex-wrap items-center justify-center gap-4 sm:justify-between">
          <div className="flex items-center gap-3">
            <Image className="h-12 w-12" src={AlchemixLogo} alt="" />
            <div className="my-auto">
              <h1 className="mt-1 text-lg font-semibold uppercase leading-none tracking-widest">Self-Repaying ENS</h1>
              <Link
                className="focus-visible:ring-offset-comet-800-100 rounded text-xs text-bronze-200 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800 max-sm:mt-2 max-sm:block"
                href="https://alchemix.fi"
                target="_blank"
              >
                <span>Powered by</span> <span className="font-medium text-bronze-100">Alchemix</span>
              </Link>
            </div>
          </div>
          <div className="flex shrink-0 gap-3">
            <div className="max-md:absolute max-md:inset-x-0 max-md:top-0">
              <Toaster />
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-t-comet-700 py-6">
        <div className="layout max-md:space-y-3 max-md:text-center md:flex md:justify-between">
          <div className="inline-flex gap-5 max-md:mx-auto md:gap-3">
            <Link
              className="focus-visible:ring-offset-comet-800-100 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
              href="https://github.com/The-Wary-One/self-repaying-ens"
              target="_blank"
            >
              <FaGithub className="h-8 w-8 fill-comet-100 md:h-5 md:w-5" />
            </Link>
            <Link
              className="focus-visible:ring-offset-comet-800-100 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
              href="https://etherscan.io/address/0xef6274Eb92b55dA6D4BCE0b7D686f37064348aBB#code"
              target="_blank"
            >
              <Etherscan className="h-8 w-8 fill-comet-100 md:h-5 md:w-5" />
            </Link>
          </div>
          <div className="focus-visible:ring-offset-comet-800-100 rounded text-xs text-comet-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800">
            Powered by <span className="font-medium">Alchemix</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
