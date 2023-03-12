import { FC, PropsWithChildren } from "react"

export const FallbackMessage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full w-full items-center text-gray-400 justify-center">
      {children}
    </div>
  )
}
