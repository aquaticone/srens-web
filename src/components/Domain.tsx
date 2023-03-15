import { Switch } from "@headlessui/react"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { FC } from "react"

import { clsxm, subscriptionName } from "@/lib"
import { useReadSubscriptions } from "@/hooks"
import { useBlockTimestamp } from "@/hooks/useBlockTimestamp"

import { usePendingStore, useQueueStore } from "@/store"

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
  expiryDate: _expiryDate,
  registrationDate: _registrationDate,
  renewalEvents,
}) => {
  const nearestRenewalEvent = renewalEvents?.find((e) => Object.hasOwn(e, "blockNumber")) as RenewalEvent | undefined

  const renewalBlockDate = useBlockTimestamp(nearestRenewalEvent?.blockNumber)
  const subscribedDomains = useReadSubscriptions()
  const [queuedCall, addCall, removeCall] = useQueueStore((state) => [
    state.calls.find((c) => c.name === name),
    state.addCall,
    state.removeCall,
  ])

  const expiryDate = dayjs.unix(_expiryDate)
  const registrationDate = dayjs.unix(_registrationDate)
  const renewalDate = renewalBlockDate.data ? dayjs.unix(renewalBlockDate.data) : undefined

  const isExpired = expiryDate.add(90, "days").isBefore(dayjs())
  const isSubscribed = subscribedDomains.data?.includes(subscriptionName(name) ?? "")
  const isSwitchChecked = (queuedCall?.type && queuedCall.type === "subscribe") ?? isSubscribed
  const isSwitchDisabled = usePendingStore((state) => !!state.transaction)

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

          {isExpired ? (
            <span className="text-xs uppercase text-orange">Expired</span>
          ) : (
            <Switch.Group>
              <div className="flex items-center">
                <Switch.Label
                  className={clsxm("pr-3 text-xs uppercase text-comet-300", {
                    "cursor-pointer": !isSwitchDisabled,
                    "cursor-wait": isSwitchDisabled,
                  })}
                >
                  Subscribe
                </Switch.Label>
                <Switch
                  checked={isSwitchChecked}
                  onChange={onChangeSwitch}
                  disabled={isSwitchDisabled}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-comet-800 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800 disabled:cursor-wait disabled:opacity-50 disabled:grayscale ui-checked:bg-green-100"
                >
                  <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full transition-all ui-checked:translate-x-6 ui-checked:bg-white ui-not-checked:translate-x-1 ui-not-checked:bg-comet-300" />
                </Switch>
              </div>
            </Switch.Group>
          )}
        </div>

        <dl className="flex flex-wrap justify-between p-4 text-xs leading-loose md:grid-cols-3 lg:inline-grid lg:max-w-xl lg:gap-x-12 lg:leading-relaxed">
          <dt className="uppercase text-comet-200 max-lg:w-1/3 lg:row-start-2">Expires</dt>
          <dd className="font-mono max-lg:w-2/3 max-lg:text-right lg:row-start-1">
            <FormattedDate date={expiryDate} />
          </dd>
          <dt className="uppercase text-comet-200 max-lg:w-1/3 lg:row-start-2">Registered</dt>
          <dd className="font-mono max-lg:w-2/3 max-lg:text-right lg:row-start-1">
            <FormattedDate date={registrationDate} />
          </dd>
          <dt className="uppercase text-comet-200 max-lg:w-1/3 lg:row-start-2">Renewed</dt>
          <dd className="font-mono max-lg:w-2/3 max-lg:text-right lg:row-start-1">
            {renewalBlockDate.isLoading ? (
              "Loading..."
            ) : renewalBlockDate.isError ? (
              "Error fetching renewal date"
            ) : renewalDate ? (
              <FormattedDate date={renewalDate} />
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
  date: dayjs.Dayjs
}

const FormattedDate: FC<FormattedDateProps> = ({ date }) => {
  return (
    <>
      {date.format("L")}, {date.format("LT")}
    </>
  )
}
