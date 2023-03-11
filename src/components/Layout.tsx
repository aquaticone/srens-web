import Link from "next/link"
import { FC, PropsWithChildren } from "react"

import { ConnectButton } from "@/components"

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 grid-rows-[auto,1fr]">
      <header className="py-5 bg-grey-700 border-b border-b-grey">
        <div className="layout items-center flex justify-center sm:justify-between flex-wrap gap-4">
          <div className="">
            <h1 className="text-silver text-lg uppercase font-semibold tracking-widest">
              Self-Repaying ENS
            </h1>
            <Link
              className="text-xs max-sm:mt-2 max-sm:block max-sm:text-center"
              href="https://alchemix.fi"
              target="_blank"
            >
              <span className="text-bronze-200">Powered by</span>{" "}
              <span className="text-bronze-100 font-medium">Alchemix</span>
            </Link>
          </div>
          <div className="shrink-0">
            <ConnectButton />
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}