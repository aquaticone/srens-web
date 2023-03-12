import { useQuery } from "@tanstack/react-query"
import { FC } from "react"

import { queries } from "@/lib/query"

import { Domain } from "@/components/Domain"
import { Spinner } from "@/components/Spinner"

type DomainLookupResultsProps = {
  name: string
}

export const DomainLookupResults: FC<DomainLookupResultsProps> = ({ name }) => {
  const { data, isLoading } = useQuery(queries.domains.lookup(name))

  return (
    <div className="min-h-[4.5rem] grid">
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (data?.domains.length ?? 0) > 0 ? (
        data?.domains.map((domain) => (
          <Domain
            key={domain.id}
            name={domain.name}
            expiryDate={domain.registration?.expiryDate}
          />
        ))
      ) : (
        <div className="flex h-full w-full items-center text-gray-400 justify-center">
          Domain not found
        </div>
      )}
    </div>
  )
}
