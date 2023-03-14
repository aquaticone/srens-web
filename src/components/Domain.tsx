import { Switch } from "@headlessui/react"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { FC } from "react"

import { clsxm, subscriptionName } from "@/lib"
import { useReadSubscriptions } from "@/hooks"
import { useBlockTimestamp } from "@/hooks/useBlockTimestamp"

import { useQueueStore } from "@/store"

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
  const subscribedDomains = useReadSubscriptions()

  const isSubscribed = subscribedDomains.data?.includes(
    subscriptionName(name) ?? ""
  )
  const [queuedCall, addCall, removeCall] = useQueueStore((state) => [
    state.calls.find((c) => c.name === name),
    state.addCall,
    state.removeCall,
  ])

  const isSwitchChecked =
    (queuedCall?.type && queuedCall.type === "subscribe") ?? isSubscribed
  // TODO: Disable switches during transactions
  const isSwitchDisabled = false

  const onChangeSwitch = (checked: boolean) => {
    if (queuedCall) {
      removeCall(name)
    } else {
      addCall({ name, type: checked ? "subscribe" : "unsubscribe" })
    }
  }

  return (
    <>
      <div className="grid items-center rounded border border-comet-600 bg-comet-700">
        <div className="col-span-full flex items-center justify-between border-b border-b-comet-500/30 p-4">
          <h1 className="text-lg">{name}</h1>

          <Switch.Group>
            <div className="flex items-center">
              <Switch.Label
                className={clsxm("mr-3 text-xs uppercase text-comet-300", {
                  "cursor-pointer": isSwitchChecked,
                })}
              >
                Subscribe
              </Switch.Label>
              <Switch
                checked={isSwitchChecked}
                onChange={onChangeSwitch}
                disabled={isSwitchDisabled}
                className={clsxm(
                  "relative inline-flex h-6 w-11 items-center rounded-full bg-comet-800 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800",
                  {
                    "bg-green-300": isSwitchChecked,
                  }
                )}
              >
                <span
                  className={clsxm(
                    "inline-block h-4 w-4 translate-x-1 transform rounded-full transition-transform",
                    {
                      "translate-x-6 bg-white": isSwitchChecked,
                      "translate-x-1 bg-comet-300": !isSwitchChecked,
                    }
                  )}
                />
              </Switch>
            </div>
          </Switch.Group>
        </div>

        <dl className="flex flex-wrap justify-between p-4 text-xs leading-loose md:grid-cols-3 lg:inline-grid lg:max-w-xl lg:gap-x-12 lg:leading-relaxed">
          <dt className="uppercase text-comet-200 max-lg:w-1/3 lg:row-start-2">
            Expires
          </dt>
          <dd className="font-mono max-lg:w-2/3 max-lg:text-right lg:row-start-1">
            <FormattedDate date={expiryDate} />
          </dd>
          <dt className="uppercase text-comet-200 max-lg:w-1/3 lg:row-start-2">
            Registered
          </dt>
          <dd className="font-mono max-lg:w-2/3 max-lg:text-right lg:row-start-1">
            <FormattedDate date={registrationDate} />
          </dd>
          <dt className="uppercase text-comet-200 max-lg:w-1/3 lg:row-start-2">
            Renewed
          </dt>
          <dd className="font-mono max-lg:w-2/3 max-lg:text-right lg:row-start-1">
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
    </>
  )
}

type FormattedDateProps = {
  date: number
}

const FormattedDate: FC<FormattedDateProps> = ({ date }) => {
  const dateObj = dayjs.unix(date)
  return (
    <>
      {dateObj.format("L")}, {dateObj.format("LT")}
    </>
  )
}
