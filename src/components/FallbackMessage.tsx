import { FC, PropsWithChildren } from "react"

import clsxm from "@/lib/clsxm"

type FallbackMessageProps = {
  className?: string
}

export const FallbackMessage: FC<PropsWithChildren<FallbackMessageProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsxm(
        "flex h-36 w-full items-center justify-center rounded",
        className
      )}
    >
      {children}
    </div>
  )
}
