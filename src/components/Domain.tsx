import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { FC, MouseEventHandler } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"
import { useAccount } from "wagmi"

import { useIsClientReady, useReadAlchemistMintAllowance } from "@/hooks"
import { useBlockTimestamp } from "@/hooks/useBlockTimestamp"

import { Button } from "@/components/Button"

import { Maybe, NameRenewed } from ".graphclient"

dayjs.extend(localizedFormat)

type RenewalEvent = Pick<NameRenewed, "blockNumber">

type DomainProps = {
  name: Maybe<string> | undefined
  expiryDate: number
  registrationDate: number
  renewalEvents?: Array<object | RenewalEvent>
}

export const Domain: FC<DomainProps> = ({
  name,
  expiryDate,
  registrationDate,
  renewalEvents,
}) => {
  const nearestRenewalEvent = renewalEvents?.find((e) =>
    Object.hasOwn(e, "blockNumber")
  ) as RenewalEvent | undefined
  const rewnewalDate = useBlockTimestamp(nearestRenewalEvent?.blockNumber)

  const isSubscribed = false

  return (
    <div className="py-3 px-4 grid max-sm:gap-y-3 sm:grid-cols-[1fr,auto] items-end">
      <div>
        <h1 className="text-bronze mb-1 font-semibold">{name}</h1>
        <dl className="text-xs flex flex-wrap justify-between sm:grid sm:grid-cols-3 sm:gap-x-3 gap-y-1 mt-2">
          <dt className="uppercase max-sm:w-1/3 sm:row-start-2 text-grey-100">
            Expires
          </dt>
          <dd className="font-mono max-sm:w-2/3 max-sm:text-right sm:row-start-1">
            <FormattedDate date={expiryDate} />
          </dd>
          <dt className="uppercase max-sm:w-1/3 sm:row-start-2 text-grey-100">
            Registered
          </dt>
          <dd className="font-mono max-sm:w-2/3 max-sm:text-right sm:row-start-1">
            <FormattedDate date={registrationDate} />
          </dd>
          <dt className="uppercase max-sm:w-1/3 sm:row-start-2 text-grey-100">
            Renewed
          </dt>
          <dd className="font-mono max-sm:w-2/3 max-sm:text-right sm:row-start-1">
            {rewnewalDate.isLoading ? (
              "Loading..."
            ) : rewnewalDate.isError ? (
              "Error fetching renewal date"
            ) : rewnewalDate.data ? (
              <FormattedDate date={rewnewalDate.data} />
            ) : (
              "Never"
            )}
          </dd>
        </dl>
      </div>
      <div className="max-sm:my-2">
        {!isSubscribed ? (
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

type FormattedDateProps = {
  date: number
}

const FormattedDate: FC<FormattedDateProps> = ({ date }) => {
  const dateObj = dayjs.unix(date)
  return (
    <>
      {dateObj.format("L")}
      <span className="sm:max-xl:hidden">, {dateObj.format("LT")}</span>
    </>
  )
}
