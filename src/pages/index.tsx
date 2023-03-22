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
  const callCount = useQueueStore((store) => store.calls.length)

  return (
    <Layout>
      <Seo templateTitle="Dashboard" />

      <Header />

      <div className="layout h-full divide-x divide-comet-700 md:grid md:grid-cols-[2fr,1fr] lg:grid-cols-[3fr,1fr]">
        <main className="space-y-6 overscroll-auto py-4 md:pr-4">
          <section>
            <SectionTitle>Search domains</SectionTitle>
            <div className="space-y-4">
              <SearchDomains />
            </div>
          </section>

          <section>
            <SectionTitle>My SRENS</SectionTitle>
            <div className="space-y-4">
              <MyDomains />
            </div>
          </section>
        </main>

        {/* This is rendered inside <Header /> for mobile */}
        <aside className="grid max-h-full grid-cols-1 grid-rows-[max-content,auto] pt-4 max-md:hidden">
          <div className="space-y-6 pl-4">
            <AccountOverview />
            <CommitQueuedChanges />
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
