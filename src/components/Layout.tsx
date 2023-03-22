import { Dialog, Transition } from "@headlessui/react"
import Link from "next/link"
import { FC, Fragment, PropsWithChildren, useState } from "react"
import { FaBars, FaGithub } from "react-icons/fa"

import { montserrat } from "@/lib"
import { useIsClientReady } from "@/hooks"

import { AccountOverview } from "@/components/AccountOverview"
import { ConnectButton } from "@/components/ConnectButton"
import { CommitQueuedChanges, QueuedChanges } from "@/components/QueuedChanges"
import { SectionTitle } from "@/components/SectionTitle"
import { Toaster } from "@/components/Toaster"

import { useQueueStore } from "@/store"

import CloseIcon from "~/svg/close.svg"
import Etherscan from "~/svg/etherscan.svg"
import SRENSLogo from "~/svg/srens_logo.svg"

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className="bg-alchemix grid min-h-screen grid-cols-1 grid-rows-[auto,1fr,auto]">{children}</div>
)

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isClientReady = useIsClientReady()
  const callCount = useQueueStore((store) => store.calls.length)

  return (
    <>
      <Toaster />

      <header className="sticky top-0 z-40 border-b border-b-comet-700 bg-comet-900 py-5">
        <div className="layout flex flex-wrap items-center justify-between gap-4">
          <Link href="/">
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
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-0 bg-black/50" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-x-0 bottom-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition-transform ease-cubic-bezier duration-[350ms]"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="max-h-[66svh] w-full space-y-6 overflow-y-auto rounded-t-lg border-l border-l-comet-700 bg-comet-600 p-4 pb-6 shadow shadow-black/80 focus:outline-none sm:max-w-lg md:py-6">
                <div className="flex justify-end">
                  <button
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-comet-700 p-2 text-comet-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <AccountOverview />
                <CommitQueuedChanges onUpdated={() => setIsMenuOpen(false)} />
                <div>
                  <SectionTitle className="text-white">Changes{callCount > 0 ? ` (${callCount})` : null}</SectionTitle>
                  <QueuedChanges />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {isClientReady && callCount > 0 && (
        <button
          className="fixed inset-x-0 bottom-0 mx-4 mb-4 rounded bg-green-200 py-3.5 text-center font-semibold text-comet-900 shadow-lg md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          Review changes
        </button>
      )}
    </>
  )
}

export const Footer: FC = () => (
  <footer className="border-t border-t-comet-700 py-6 max-md:pb-24">
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
)
