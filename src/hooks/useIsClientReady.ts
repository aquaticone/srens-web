import { DependencyList, EffectCallback, useEffect, useState } from "react"

export const useIsClientReady = () => {
  const [ready, setReady] = useState(false)
  useClientEffect(() => setReady(true))
  return ready
}

const useClientEffect = (effect: EffectCallback, deps?: DependencyList) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useClientEffect
