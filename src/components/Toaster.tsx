import { Transition } from "@headlessui/react"
import { FC, Fragment, useEffect, useRef } from "react"

import { clsxm } from "@/lib"

import { Spinner } from "@/components/Spinner"

import { useToastStore } from "@/store"

export const Toaster: FC = () => {
  const timerRef = useRef<NodeJS.Timer>()
  const [message, status, clearToast] = useToastStore((store) => [store.message, store.status, store.clearToast])

  useEffect(() => {
    if (status === "error" || status === "success") {
      timerRef.current = setTimeout(clearToast, 8000)
    }
    return () => {
      clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, status])

  return (
    <Transition
      as={Fragment}
      show={!!message && !!status}
      enter="transition-opacity ease-linear"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsxm(
          "flex items-center gap-3 p-3 text-sm font-medium text-white max-md:justify-center md:rounded md:py-1.5",
          {
            "bg-blue": status === "pending",
            "bg-green-300": status === "success",
            "bg-red": status === "error",
          }
        )}
      >
        {message}
        {status === "pending" && <Spinner className="h-4 w-4 fill-current" />}
      </div>
    </Transition>
  )
}
