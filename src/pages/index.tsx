import { Layout, MyDomains, SearchDomains, Seo } from "@/components"

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main className="layout space-y-6 pt-4">
        <section>
          <h1 className="mb-3 text-comet-50">Search domains</h1>
          <div className="space-y-4">
            <SearchDomains />
          </div>
        </section>

        <section>
          <h1 className="mb-3 text-comet-50">My domains</h1>
          <div className="space-y-4">
            <MyDomains include="all" />
          </div>
        </section>
      </main>
    </Layout>
  )
}
