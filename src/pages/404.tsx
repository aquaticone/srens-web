import Link from "next/link"
import * as React from "react"

import { Layout, Seo } from "@/components"

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle="Not Found" />

      <div className="layout">
        <main className="py-8 text-center">
          <h1 className="mb-3 text-xl font-medium">404 - Not Found</h1>
          <p>
            There's nothing here. Try{" "}
            <Link className="underline" href="/">
              going home
            </Link>
            .
          </p>
        </main>
      </div>
    </Layout>
  )
}
