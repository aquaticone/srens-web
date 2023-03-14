import { FC } from "react"
import { AiOutlineLoading } from "react-icons/ai"

import { clsxm } from "@/lib"

export const Spinner: FC<{ className?: string }> = ({ className }) => {
  return <AiOutlineLoading className={clsxm("animate animate-spin fill-bronze", className)} />
}
