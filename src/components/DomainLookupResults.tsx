import { useQuery } from "@tanstack/react-query"
import { FC } from "react"

import { queries } from "@/lib/query"

import { Domain } from "@/components/Domain"
import { FallbackMessage } from "@/components/FallbackMessage"
import { Spinner } from "@/components/Spinner"

type DomainLookupResultsProps = {
  name: string
}

export const DomainLookupResults: FC<DomainLookupResultsProps> = ({ name }) => {
  const { data, isError, isLoading } = useQuery(queries.domains.lookup(name))

  return (
    <div className="min-h-[4.5rem] grid">
      {isLoading ? (
        <FallbackMessage>
          <Spinner className="h-8 w-8" />
        </FallbackMessage>
      ) : isError ? (
        <FallbackMessage>Error finding domains</FallbackMessage>
      ) : !data?.domains.length ? (
        <FallbackMessage>Domain not found</FallbackMessage>
      ) : (
        data.domains.map((domain) => (
          <Domain
            key={domain.id}
            name={domain.name}
            expiryDate={domain.registration?.expiryDate}
          />
        ))
      )}
    </div>
  )
}
