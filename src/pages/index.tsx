import Link from "next/link"

import { Layout, Seo } from "@/components"

export default function HomePage() {
  return (
    <Layout>
      <Seo />

      <main className="layout py-6">
        <div className="mb-6">
          <h1 className="text-lg font-medium">Alchemix Subscriptions</h1>
          <p>Forget about renewing your ENS manually...</p>
        </div>
        <Link className="rounded bg-bronze px-3 py-2 font-medium text-black" href="/dashboard">
          Dashboard
        </Link>
      </main>
    </Layout>
  )
}
