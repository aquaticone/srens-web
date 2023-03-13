import { Switch } from "@headlessui/react"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { ethers } from "ethers"
import { FC, useState } from "react"

import clsxm from "@/lib/clsxm"
import {
  useReadAlchemistMintAllowance,
  useReadSubscriptions,
  useWriteAlchemistMintAllowance,
  useWriteSubscription,
} from "@/hooks"
import { useBlockTimestamp } from "@/hooks/useBlockTimestamp"

import { Button } from "@/components/Button"
import { Modal, ModalProps } from "@/components/Modal"
import { Spinner } from "@/components/Spinner"

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
  const mintAllowance = useReadAlchemistMintAllowance()
  const subscribedDomains = useReadSubscriptions()

  const isSubscribed = subscribedDomains.data?.includes(
    subscriptionName(name) ?? ""
  )
  const writeSubscription = useWriteSubscription(
    subscriptionName(name),
    !isSubscribed
  )

  const [showApproveModal, setShowApproveModal] = useState(false)

  const isSwitchDisabled =
    mintAllowance.isLoading ||
    mintAllowance.isFetching ||
    subscribedDomains.isLoading ||
    mintAllowance.isError ||
    subscribedDomains.isError
  const isSwitchLoading = writeSubscription.isWaiting

  const onChangeSwitch = (checked: boolean) => {
    if (checked && mintAllowance.data === false) {
      setShowApproveModal(true)
    } else {
      writeSubscription.write?.()
    }
  }

  const onApproved = () => {
    setShowApproveModal(false)
    writeSubscription.write?.()
  }

  return (
    <>
      <div className="grid items-center rounded border border-comet-600 bg-comet-700">
        <div className="col-span-full flex items-center justify-between border-b border-b-comet-500/30 p-4">
          <h1 className="mb-1 text-xl">{name}</h1>

          <Switch.Group>
            <div className="flex items-center">
              <Switch.Label
                className={clsxm("mr-3 text-xs uppercase text-comet-300", {
                  "cursor-pointer": isSubscribed && !isSwitchLoading,
                  "cursor-wait": isSwitchLoading,
                })}
              >
                {writeSubscription.isWaiting
                  ? isSubscribed
                    ? "Unsubscribing"
                    : "Subscribing"
                  : isSubscribed
                  ? "Subscribed"
                  : "Unsubscribed"}
              </Switch.Label>
              <Switch
                checked={isSubscribed}
                onChange={onChangeSwitch}
                disabled={isSwitchDisabled || isSwitchLoading}
                className={clsxm(
                  "focus-focus-visible:ring-bronze relative inline-flex h-6 w-11 items-center rounded-full bg-comet-800 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800",
                  {
                    "bg-green-300": isSubscribed && !isSwitchLoading,
                  }
                )}
              >
                <span
                  className={clsxm(
                    "inline-block h-4 w-4 translate-x-1 transform rounded-full transition-transform",
                    {
                      "translate-x-6 bg-white": isSubscribed,
                      "translate-x-1 bg-comet-300": !isSubscribed,
                      "bg-comet-300 bg-opacity-50 ui-checked:bg-opacity-50":
                        isSwitchLoading,
                      "translate-x-6": isSwitchLoading && !isSubscribed,
                      "ui-checked:translate-x-1":
                        isSwitchLoading && isSubscribed,
                    }
                  )}
                >
                  {isSwitchLoading && <Spinner className="fill-green" />}
                </span>
              </Switch>
            </div>
          </Switch.Group>
        </div>

        <dl className="flex max-w-xl flex-wrap justify-between p-4 text-xs leading-loose sm:inline-grid sm:grid-cols-3 sm:gap-x-6 sm:leading-relaxed lg:gap-x-12">
          <dt className="uppercase text-comet-200 max-sm:w-1/3 sm:row-start-2">
            Expires
          </dt>
          <dd className="font-mono max-sm:w-2/3 max-sm:text-right sm:row-start-1">
            <FormattedDate date={expiryDate} />
          </dd>
          <dt className="uppercase text-comet-200 max-sm:w-1/3 sm:row-start-2">
            Registered
          </dt>
          <dd className="font-mono max-sm:w-2/3 max-sm:text-right sm:row-start-1">
            <FormattedDate date={registrationDate} />
          </dd>
          <dt className="uppercase text-comet-200 max-sm:w-1/3 sm:row-start-2">
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

      <ApproveModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onApproved={onApproved}
      />
    </>
  )
}

type ApproveModalProps = ModalProps & {
  onApproved: () => void
}

const ApproveModal: FC<ApproveModalProps> = ({ onApproved, ...modalProps }) => {
  const writeMintAllowance = useWriteAlchemistMintAllowance(
    ethers.constants.MaxUint256,
    onApproved
  )

  const onClickApprove = () => {
    writeMintAllowance.write?.()
  }

  return (
    <Modal {...modalProps}>
      <div className="border-b border-b-comet-500 px-4 py-3">
        <h1>Approval required</h1>
      </div>
      <div className="p-4">
        <p className="text-sm text-comet-50">
          To enable ENS self-paying subscriptions you must first authorize the
          SRENS contract to mint alETH on your behalf.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button
            color="green"
            className="w-full"
            disabled={writeMintAllowance.isLoading}
            isLoading={writeMintAllowance.isWaiting}
            onClick={onClickApprove}
          >
            Approve
          </Button>
          <Button color="grey" className="w-full" onClick={modalProps.onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
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

function subscriptionName(name: Maybe<string> | undefined) {
  return name?.substring(0, name.indexOf(".eth"))
}
