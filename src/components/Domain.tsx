import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { FC, MouseEventHandler } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"
import { useAccount } from "wagmi"

import { useIsClientReady, useReadAlchemistMintAllowance } from "@/hooks"

import { Button } from "@/components/Button"

import { Maybe } from ".graphclient"

dayjs.extend(localizedFormat)

type DomainProps = {
  name: Maybe<string> | undefined
  expiryDate: number
}

export const Domain: FC<DomainProps> = ({ name, expiryDate }) => {
  const expiryDateObj = dayjs.unix(expiryDate)
  const isSubscribed = false

  return (
    <div className="py-3 px-4 grid max-sm:gap-y-3 sm:grid-cols-[1fr,auto] items-center">
      <div>
        <h1 className="text-bronze mb-1 font-semibold">{name}</h1>
        <div className="text-xs text-grey-100">
          Expires: {expiryDateObj.format("L")} @{" "}
          {expiryDateObj.format("LT (UTCZ)")}
        </div>
      </div>
      <div>
        {isSubscribed ? (
          <UnsubscribeButton name={name} />
        ) : (
          <SubscribeButton name={name} />
        )}
      </div>
    </div>
  )
}

type SubUnsubButtonProps = {
  name: Maybe<string> | undefined
}

const SubscribeButton: FC<SubUnsubButtonProps> = ({ name }) => {
  const isClientReady = useIsClientReady()
  const mintAllowance = useReadAlchemistMintAllowance()

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    // TODO: Contract interaction
    // eslint-disable-next-line no-console
    console.log("Subscribe", name)
  }

  return (
    <Button
      color="green"
      disabled={!isClientReady || !mintAllowance.data}
      isLoading={false}
      loadingText="Subscribing"
      icon={FaPlus}
      onClick={onClick}
    >
      Subscribe
    </Button>
  )
}

const UnsubscribeButton: FC<SubUnsubButtonProps> = ({ name }) => {
  const isClientReady = useIsClientReady()
  const { isConnected } = useAccount()

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    // TODO: Contract interaction
    // eslint-disable-next-line no-console
    console.log("Unsubscribe", name)
  }

  return (
    <Button
      color="orange"
      disabled={!isClientReady || !isConnected}
      isLoading={false}
      loadingText="Unsubscribing"
      icon={FaMinus}
      onClick={onClick}
    >
      Unsubscribe
    </Button>
  )
}
