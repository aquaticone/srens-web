import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"

import { montserrat } from "@/lib"
import { useIsClientReady } from "@/hooks"

import { Layout, MyDomains, QueuedChanges, SearchDomains, Seo } from "@/components"

import { useQueueStore } from "@/store"

export default function HomePage() {
  const isClientReady = useIsClientReady()
  const hasQueuedCalls = useQueueStore((store) => store.calls.length > 0)
  const [changesOpen, setChangesOpen] = useState(false)

  return (
    <Layout>
      <Seo />

      <div className="layout divide-x divide-comet-700 md:grid md:grid-cols-[2fr,1fr] lg:grid-cols-[3fr,1fr]">
        <main className="space-y-6 py-4 md:pr-4">
          <section>
            <h1 className="mb-3 text-xs uppercase text-comet-50">Search domains</h1>
            <div className="space-y-4">
              <SearchDomains />
            </div>
          </section>

          <section>
            <h1 className="mb-3 text-xs uppercase text-comet-50">My domains</h1>
            <div className="space-y-4">
              <MyDomains include="all" />
            </div>
          </section>
        </main>

        <aside className="space-y-6 pt-4 pl-4 max-md:hidden">
          <section>
            <QueuedChanges onUpdated={() => setChangesOpen(false)} />
          </section>
        </aside>
      </div>

      {isClientReady && hasQueuedCalls && (
        <button
          className="fixed inset-x-0 bottom-0 mx-4 mb-4 rounded bg-green-400 py-3.5 text-center font-semibold text-comet-900 shadow-lg md:hidden"
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
              <Dialog.Panel className="w-4/5 border-l border-l-comet-700 bg-comet-900 shadow-lg shadow-black/80 focus:outline-none sm:max-w-lg">
                <div className="py-6 px-4">
                  <QueuedChanges onUpdated={() => setChangesOpen(false)} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </Layout>
  )
}
