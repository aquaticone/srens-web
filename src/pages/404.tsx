import * as React from "react"

import { Footer, Header, Layout, PrettyLink, Seo } from "@/components"

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle="Not Found" />

      <Header />

      <div className="layout">
        <main className="py-8 text-center">
          <h1 className="mb-3 text-xl font-medium">404 - Not Found</h1>
          <p>
            There's nothing here. Try <PrettyLink href="/">going home</PrettyLink>.
          </p>
        </main>
      </div>

      <Footer />
    </Layout>
  )
}
