import { useEffect, useState } from "react"
import { useProvider } from "wagmi"

export function useBlockTimestamp(blockNumber?: number) {
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [timestamp, setTimestamp] = useState<number>()

  const provider = useProvider()

  useEffect(() => {
    if (blockNumber) {
      const fetchTimestamp = async () => {
        try {
          const block = await provider.getBlock(blockNumber)
          setTimestamp(block.timestamp)
          setIsLoading(false)
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err)
          setIsError(true)
          setIsLoading(false)
        }
      }
      setIsLoading(true)
      fetchTimestamp()
    } else {
      setIsError(false)
      setIsLoading(false)
      setTimestamp(undefined)
    }
  }, [blockNumber, provider])

  return { data: timestamp, isError, isLoading }
}
