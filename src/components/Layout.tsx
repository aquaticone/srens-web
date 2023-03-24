import { Dialog, Transition } from "@headlessui/react"
import Link from "next/link"
import { FC, Fragment, PropsWithChildren, useState } from "react"
import { FaBars, FaGithub } from "react-icons/fa"

import { montserrat } from "@/lib"
import { useIsClientReady } from "@/hooks"

import { ConnectButton } from "@/components/ConnectButton"
import { Toaster } from "@/components/Toaster"

import { useQueueStore } from "@/store"

import AlchemixLogo from "~/svg/alchemix_logo.svg"
import CloseIcon from "~/svg/close.svg"
import Dune from "~/svg/dune.svg"
import Etherscan from "~/svg/etherscan.svg"
import SRENSLogo from "~/svg/srens_logo.svg"

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className="bg-alchemix grid min-h-screen grid-cols-1 grid-rows-[auto,1fr,auto]">{children}</div>
)

type HeaderProps = {
  children: (props: { setIsMenuOpen: (isOpen: boolean) => void }) => JSX.Element
}

export const Header: FC<HeaderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isClientReady = useIsClientReady()
  const callCount = useQueueStore((store) => store.calls.length)

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 md:hidden">
        <Toaster />
      </div>

      <header className="sticky top-0 z-40 border-b border-b-comet-700 bg-comet-900 py-5">
        <div className="layout flex flex-wrap items-center justify-between gap-4">
          <Link
            className="rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
            href="/"
          >
            <SRENSLogo className="h-11 w-44" />
            <span className="sr-only">Alchemix Self-Repaying ENS</span>
          </Link>
          <div className="flex items-center gap-2 md:hidden">
            <ConnectButton />
            <button className="p-2" onClick={() => setIsMenuOpen(true)}>
              <FaBars className="h-7 w-7 fill-comet-300" />
            </button>
          </div>
          <div className="flex shrink-0 gap-3 max-md:hidden">
            <Toaster />
            <ConnectButton />
          </div>
        </div>
      </header>

      <Transition.Root show={isMenuOpen} as={Fragment}>
        <Dialog as="div" className={`${montserrat.variable} relative z-40 font-sans md:hidden`} onClose={setIsMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div className="fixed inset-0 z-0 bg-black/50" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-x-0 bottom-0 flex justify-end sm:inset-0 sm:items-center sm:justify-center">
            <Transition.Child
              as={Fragment}
              enter="transition-transform ease-cubic-bezier duration-[350ms]"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
            >
              <Dialog.Panel className="max-h-[66svh] w-full space-y-6 overflow-y-auto rounded-t-lg border-l border-l-comet-700 bg-comet-600 p-4 pb-6 shadow shadow-black/80 focus:outline-none sm:max-w-lg sm:rounded-b-lg sm:border sm:border-comet-500 md:py-6">
                <div className="flex justify-end">
                  <button
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-comet-700 p-2 text-comet-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <CloseIcon />
                  </button>
                </div>
                {children({ setIsMenuOpen })}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {isClientReady && callCount > 0 && (
        <button
          className="fixed inset-x-0 bottom-0 z-30 mx-4 mb-4 rounded bg-green-200 py-3.5 text-center font-semibold text-comet-900 shadow-lg md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          Review changes
        </button>
      )}
    </>
  )
}

export const Footer: FC = () => (
  <footer className="border-t border-t-comet-700 py-6 sm:py-8">
    <div className="layout flex items-center justify-between max-sm:flex-col max-sm:gap-y-6">
      <Link
        className="rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
        href="https://alchemix.fi/"
        target="_blank"
      >
        <AlchemixLogo className="h-9 w-36 grayscale" />
      </Link>
      <ul className="flex flex-wrap items-center gap-3 text-sm text-silver max-sm:justify-center md:gap-x-6">
        <li>
          <Link
            className="inline-flex items-center gap-2 rounded hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
            href="https://etherscan.io/address/0xef6274Eb92b55dA6D4BCE0b7D686f37064348aBB#code"
            target="_blank"
          >
            <Etherscan className="h-5 w-5 fill-silver" />
            Etherscan
          </Link>
        </li>
        <li>
          <Link
            className="inline-flex items-center gap-2 rounded hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
            href="https://dune.com/wary/self-repaying-ens"
            target="_blank"
          >
            <Dune className="h-5 w-5" />
            Dune Dashboard
          </Link>
        </li>
        <li>
          <Link
            className="inline-flex items-center gap-2 rounded hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
            href="https://github.com/The-Wary-One/self-repaying-ens"
            target="_blank"
          >
            <FaGithub className="h-5 w-5 fill-silver" />
            Contract
          </Link>
        </li>
        <li>
          <Link
            className="inline-flex items-center gap-2 rounded hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
            href="https://github.com/The-Wary-One/self-repaying-ens"
            target="_blank"
          >
            <FaGithub className="h-5 w-5 fill-silver" />
            Client
          </Link>
        </li>
      </ul>
    </div>
  </footer>
)
