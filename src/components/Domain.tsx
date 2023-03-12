import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { FC, MouseEventHandler } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

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
        <div className="text-xs text-grey-200">
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
  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    // TODO: Contract interaction
    // eslint-disable-next-line no-console
    console.log("Subscribe", name)
  }

  return (
    <button
      className="text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze max-sm:w-full max-sm max-sm:justify-center transition-colors font-medium pl-3 pr-2.5 py-1.5 border border-green-400/50 text-green-400 hover:bg-green-400 hover:text-grey-700 rounded flex items-center gap-1"
      onClick={onClick}
    >
      Subscribe
      <FaPlus />
    </button>
  )
}

const UnsubscribeButton: FC<SubUnsubButtonProps> = ({ name }) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    // TODO: Contract interaction
    // eslint-disable-next-line no-console
    console.log("Unsubscribe", name)
  }

  return (
    <button
      className="text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze max-sm:w-full max-sm max-sm:justify-center transition-colors font-medium pl-3 pr-2.5 py-1.5 border border-orange/50 text-orange hover:bg-orange hover:text-grey-700 rounded flex items-center gap-1"
      onClick={onClick}
    >
      Unsubscribe
      <FaMinus />
    </button>
  )
}
