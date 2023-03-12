import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { FC, MouseEventHandler } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"

import { Domain, Maybe, Registration } from ".graphclient"

dayjs.extend(localizedFormat)

type EnsRegistrationProps = {
  registration: Pick<Registration, "expiryDate" | "registrationDate"> & {
    domain: Pick<Domain, "name" | "id">
  }
}

export const DomainRegistration: FC<EnsRegistrationProps> = ({
  registration,
}) => {
  const expiryDate = dayjs.unix(registration.expiryDate)
  const isSubscribed = false

  return (
    <div className="py-3 px-4 grid max-sm:gap-y-3 sm:grid-cols-[1fr,auto] items-center">
      <div>
        <h1 className="text-bronze mb-1 font-semibold">
          {registration.domain.name}
        </h1>
        <div className="text-xs text-grey-200">
          Expires: {expiryDate.format("L")} @ {expiryDate.format("LT (UTCZ)")}
        </div>
      </div>
      <div>
        {isSubscribed ? (
          <UnsubscribeButton name={registration.domain.name} />
        ) : (
          <SubscribeButton name={registration.domain.name} />
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
      className="text-sm max-sm:w-full max-sm max-sm:justify-center transition-colors font-medium pl-3 pr-2.5 py-1.5 border border-green-400/50 text-green-400 hover:bg-green-400 hover:text-grey-700 rounded flex items-center gap-1"
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
      className="text-sm max-sm:w-full max-sm max-sm:justify-center transition-colors font-medium pl-3 pr-2.5 py-1.5 border border-orange/50 text-orange hover:bg-orange hover:text-grey-700 rounded flex items-center gap-1"
      onClick={onClick}
    >
      Unsubscribe
      <FaMinus />
    </button>
  )
}
