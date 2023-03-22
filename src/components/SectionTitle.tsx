import { FC, PropsWithChildren } from "react"

import { clsxm } from "@/lib"

type SectionTitleProps = {
  className?: string
}

export const SectionTitle: FC<PropsWithChildren<SectionTitleProps>> = ({ children, className }) => {
  return <h1 className={clsxm("mb-3 text-sm uppercase text-comet-50 md:text-xs", className)}>{children}</h1>
}
