import { FC, useState } from "react"
import { FaRegMinusSquare } from "react-icons/fa"
import { MdMonitorHeart } from "react-icons/md"
import { TbArrowBarToUp } from "react-icons/tb"

import {
  DomainLookupForm,
  DomainLookupResults,
  Layout,
  MyDomains,
  Seo,
} from "@/components"
import { MintAllowance, MintAllowanceStatus } from "@/components/MintAllowance"

export default function HomePage() {
  const [domainLookupName, setDomainLookupName] = useState<string>("")

  return (
    <Layout>
      <Seo />

      <div className="layout md:grid md:grid-cols-3 md:divide-x md:divide-grey-400 md:min-h-full">
        <aside className="pt-6 md:text-xs lg:text-sm md:pr-6">
          <section>
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-grey-100 text-xs uppercase font-medium">
                Allowance
              </h1>
              <MintAllowanceStatus />
            </div>
            <MintAllowance />
          </section>

          <section className="mt-9 max-md:hidden">
            <HowItWorks />
          </section>
        </aside>

        <main className="md:col-span-2 md:pt-6 max-md:mt-6 md:pl-6 space-y-6">
          <section className="rounded border border-grey-300 overflow-hidden">
            <div className="bg-grey-400 py-3 px-4">
              <label htmlFor="domain" className="text-lg">
                Domain lookup
              </label>
            </div>
            <DomainLookupForm
              submittedName={domainLookupName}
              onSubmit={setDomainLookupName}
            />
            {domainLookupName !== "" && (
              <div className="bg-grey-500 border-t border-t-grey-300">
                <DomainLookupResults name={domainLookupName} />
              </div>
            )}
          </section>

          <section className="rounded border border-grey-300 overflow-hidden">
            <div className="bg-grey-400 py-3 px-4">
              <h1 className="text-lg">My domains</h1>
            </div>
            <div className="bg-grey-500">
              <MyDomains />
            </div>
          </section>

          <section className="md:hidden">
            <HowItWorks />
          </section>
        </main>
      </div>
    </Layout>
  )
}

const HowItWorks: FC = () => {
  return (
    <>
      <h1 className="text-grey-100 text-xs uppercase font-medium">
        How it works
      </h1>
      <div className="flex flex-col gap-6 mt-6">
        <div className="grid grid-cols-[auto,1fr] gap-3">
          <div className="bg-bronze text-bronze-300 h-7 w-7 flex items-center justify-center rounded-full text-lg font-semibold">
            <TbArrowBarToUp />
          </div>
          <p>
            Subscribe to the{" "}
            <span className="font-semibold">SRENS service</span> for one or more
            ENS names.
          </p>
        </div>
        <div className="grid grid-cols-[auto,1fr] gap-3">
          <div className="bg-bronze text-bronze-300 h-7 w-7 flex items-center justify-center rounded-full text-lg font-semibold">
            <MdMonitorHeart />
          </div>
          <p>
            <span className="font-semibold">SRENS</span> monitors your names —
            rewewing them, when possible, by creating self-repaying debt — up to
            90 days before expiry for optimal pricing.
          </p>
        </div>
        <div className="grid grid-cols-[auto,1fr] gap-3">
          <div className="bg-bronze text-bronze-300 h-7 w-7 flex items-center justify-center rounded-full text-lg font-semibold">
            <FaRegMinusSquare />
          </div>
          <p>
            Stop monitoring and self-repaying ENS renewal at any time by
            unsubscribing from <span className="font-semibold">SRENS</span> for
            one or more ENS names.
          </p>
        </div>
      </div>
    </>
  )
}
