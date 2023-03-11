import * as React from "react"
import { FaRegMinusSquare, FaSignature } from "react-icons/fa"
import { MdMonitorHeart } from "react-icons/md"
import { TbArrowBarToUp } from "react-icons/tb"

import { Layout, Seo } from "@/components"

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <div className="layout grid md:grid-cols-3 md:divide-x md:divide-grey-500 min-h-full">
        <aside className="mt-6 md:text-xs lg:text-sm pr-6">
          <h1 className="text-grey-100 text-xs uppercase font-medium">
            How it works
          </h1>
          <div className="flex flex-col gap-6 mt-6">
            <div className="grid grid-cols-[auto,1fr] gap-3">
              <div
                className="bg-bronze text-bronze-300 h-7 w-7 flex items-center justify-center rounded-full text-lg font-semibold"
                aria-hidden="true"
              >
                <FaSignature />
              </div>
              <p>
                Authorize <span className="font-semibold">SRENS</span> to create
                self-repaying debt on your behalf via Alchemix.
              </p>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-3">
              <div className="bg-bronze text-bronze-300 h-7 w-7 flex items-center justify-center rounded-full text-lg font-semibold">
                <TbArrowBarToUp />
              </div>
              <p>
                Subscribe to the{" "}
                <span className="font-semibold">SRENS service</span> for one or
                more ENS names.
              </p>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-3">
              <div className="bg-bronze text-bronze-300 h-7 w-7 flex items-center justify-center rounded-full text-lg font-semibold">
                <MdMonitorHeart />
              </div>
              <p>
                <span className="font-semibold">SRENS</span> monitors your names
                — rewewing them, when possible, by creating self-repaying debt —
                up to 90 days before expiry for optimal pricing.
              </p>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-3">
              <div className="bg-bronze text-bronze-300 h-7 w-7 flex items-center justify-center rounded-full text-lg font-semibold">
                <FaRegMinusSquare />
              </div>
              <p>
                Stop monitoring and self-repaying ENS renewal at any time by
                unsubscribing from <span className="font-semibold">SRENS</span>{" "}
                for one or more ENS names.
              </p>
            </div>
          </div>
        </aside>

        <main className="col-span-2"></main>
      </div>
    </Layout>
  )
}

// 1. The Alchemix user MUST authorize this app to create some self repaying ETH debt for them.
// 2. They can subscribe to the Self Repaying ENS renewal (aka SRENS) service for one or more ENS names. They do not need to own them but the names need to be registered, non expired or in their grace period (i.e. 90 days after expiry). It tells the app to monitor the names and renew them when possible by creating self repaying ETH debt from the user's Alchemix account. The app tries to get a cheaper renewal cost by also monitoring the transaction cost 90 days before expiry.
// 3. They can unsubscribe from the SRENS service for one or more ENS names when they want.
