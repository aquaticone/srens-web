import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FC, PropsWithChildren } from "react"

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <header>
        <ConnectButton />
      </header>

      {children}
    </div>
  )
}
