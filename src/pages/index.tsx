import Link from "next/link"
import { useState } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import { useAccount } from "wagmi"

import { clsxm } from "@/lib"
import { useIsClientReady } from "@/hooks"

import {
  AccountOverview,
  CommitQueuedChanges,
  Footer,
  Header,
  Layout,
  MyDomains,
  QueuedChanges,
  SearchDomains,
  SectionTitle,
  Seo,
} from "@/components"

import { useQueueStore } from "@/store"

export default function Dashboard() {
  const isClientReady = useIsClientReady()
  const { address } = useAccount()
  const callCount = useQueueStore((store) => store.calls.length)

  const [value, setValue] = useState<string>("")
  const [submitted, setSubmitted] = useState<string>("")

  const resetSearch = () => {
    setValue("")
    setSubmitted("")
  }

  return (
    <Layout>
      <Seo />

      <Header>
        {({ setIsMenuOpen }) => (
          <>
            {/* Mobile account overview + changes */}
            <AccountOverview />
            <CommitQueuedChanges
              onUpdated={() => {
                setIsMenuOpen(false)
                resetSearch()
              }}
            />
            <div>
              <SectionTitle className="text-white">Changes{callCount > 0 ? ` (${callCount})` : null}</SectionTitle>
              <QueuedChanges />
            </div>
          </>
        )}
      </Header>

      <div className="layout h-full divide-x divide-comet-700 md:grid md:grid-cols-[2fr,1fr] lg:grid-cols-[5fr,2fr]">
        <main className="space-y-6 overscroll-auto py-4 md:pr-4">
          <section>
            <SectionTitle>Search domains</SectionTitle>
            <div className="space-y-4">
              <SearchDomains value={value} setValue={setValue} submitted={submitted} setSubmitted={setSubmitted} />
            </div>
          </section>

          <section>
            <div className="flex items-baseline justify-between">
              <SectionTitle>My SRENS</SectionTitle>
              <Link
                className="flex items-center gap-1 rounded text-sm text-bronze underline focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800 md:text-xs"
                href={`https://app.ens.domains${isClientReady && address ? `/address/${address}` : ""}`}
                target="_blank"
              >
                ENS Dashboard
                <FaExternalLinkAlt className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-4">
              <MyDomains />
            </div>
          </section>
        </main>

        {/* Desktop account overview + changes */}
        <aside className="grid max-h-full grid-cols-1 grid-rows-[max-content,auto] pt-4 max-md:hidden">
          <div className="space-y-6 pl-4">
            <AccountOverview />
            <CommitQueuedChanges onUpdated={resetSearch} />
            <SectionTitle
              className={clsxm("mb-0", {
                "border-b border-b-comet-700 pb-3": callCount > 0,
              })}
            >
              Changes{isClientReady && callCount > 0 ? ` (${callCount})` : null}
            </SectionTitle>
          </div>
          <div className="-mr-4 overflow-y-auto px-4 py-3">
            <QueuedChanges />
          </div>
        </aside>
      </div>

      <Footer />
    </Layout>
  )
}
