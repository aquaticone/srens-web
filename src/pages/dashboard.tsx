import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"

import { clsxm, montserrat } from "@/lib"
import { useIsClientReady } from "@/hooks"

import { CommitQueuedChanges, Layout, MyDomains, QueuedChanges, SearchDomains, SectionTitle, Seo } from "@/components"

import { useQueueStore } from "@/store"

export default function Dashboard() {
  const isClientReady = useIsClientReady()
  const callCount = useQueueStore((store) => store.calls.length)
  const [changesOpen, setChangesOpen] = useState(false)

  return (
    <Layout>
      <Seo templateTitle="Dashboard" />

      <div className="layout h-full divide-x divide-comet-700 md:grid md:grid-cols-[2fr,1fr] md:overflow-hidden lg:grid-cols-[3fr,1fr]">
        <main className="space-y-6 overscroll-auto py-4 md:overflow-auto md:pr-4">
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

        <aside className="grid max-h-full grid-cols-1 grid-rows-[max-content,auto] overflow-hidden pt-4 max-md:hidden">
          <div className="space-y-6 pl-4">
            <CommitQueuedChanges onUpdated={() => setChangesOpen(false)} />
            <SectionTitle
              className={clsxm("mb-0", {
                "border-b border-b-comet-700 pb-3": callCount > 0,
              })}
            >
              Changes{callCount > 0 ? ` (${callCount})` : null}
            </SectionTitle>
          </div>
          <div className="-mr-4 overflow-y-auto px-4 py-3">
            <QueuedChanges />
          </div>
        </aside>
      </div>

      {isClientReady && callCount > 0 && (
        <button
          className="fixed inset-x-0 bottom-0 mx-4 mb-4 rounded bg-green-200 py-3.5 text-center font-semibold text-comet-900 shadow-lg md:hidden"
          onClick={() => setChangesOpen(true)}
        >
          Review changes
        </button>
      )}

      <Transition.Root show={changesOpen} as={Fragment}>
        <Dialog
          as="div"
          className={`${montserrat.variable} relative z-40 font-sans md:hidden`}
          onClose={setChangesOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-0 bg-comet-800/50" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-4/5 overflow-y-auto border-l border-l-comet-700 bg-comet-900 shadow-lg shadow-black/80 focus:outline-none sm:max-w-lg">
                <div className="space-y-6 py-6 px-4">
                  <CommitQueuedChanges onUpdated={() => setChangesOpen(false)} />
                  <div>
                    <SectionTitle>Changes{callCount > 0 ? ` (${callCount})` : null}</SectionTitle>
                    <QueuedChanges />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </Layout>
  )
}
