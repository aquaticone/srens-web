import { FC } from "react"
import { FiMinus, FiPlus, FiX } from "react-icons/fi"

import { clsxm } from "@/lib"
import {
  useIsClientReady,
  useReadAlchemistMintAllowance,
  useUpdateAlchemistMintAllowance,
  useUpdateSubscriptions,
} from "@/hooks"

import { SectionTitle } from "@/components/SectionTitle"
import { Spinner } from "@/components/Spinner"

import { useQueueStore } from "@/store"

type QueuedChangesProps = {
  onUpdated: () => void
}

export const QueuedChanges: FC<QueuedChangesProps> = ({ onUpdated }) => {
  const isClientReady = useIsClientReady()
  const calls = useQueueStore((store) => store.calls)
  const removeCall = useQueueStore((store) => store.removeCall)
  const mintAllowance = useReadAlchemistMintAllowance()

  return (
    <>
      <SectionTitle className="flex items-center justify-between">
        Changes {isClientReady && calls.length > 0 && `(${calls.length})`}
      </SectionTitle>
      <div className="space-y-3">
        {isClientReady && calls.length > 0 ? (
          <>
            <ul className="divide-y divide-comet-700">
              {calls.map(({ name, type }) => (
                <li
                  key={`queue-${name}`}
                  className="grid grid-cols-[auto,1fr,auto] items-center gap-2 py-3 first:pt-1.5"
                >
                  {type === "subscribe" ? (
                    <FiPlus className="h-5 w-5 stroke-green-100" />
                  ) : (
                    <FiMinus className="h-5 w-5 stroke-orange" />
                  )}
                  <div className="grow-0 overflow-hidden text-ellipsis text-sm">{name}</div>
                  <button
                    className="rounded text-comet-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800"
                    onClick={() => removeCall(name)}
                  >
                    <FiX className="h-5 w-5 fill-current" />
                  </button>
                </li>
              ))}
            </ul>

            {mintAllowance.data ? <UpdateSubscriptions onUpdated={onUpdated} /> : <ApproveAlchemist />}
          </>
        ) : (
          <div className="text-xs text-comet-100">
            Subscription changes you make will appear here for review. You can submit multiple changes in a single
            transaction.
          </div>
        )}
      </div>
    </>
  )
}

const ApproveAlchemist: FC = () => {
  const updateMintAllowance = useUpdateAlchemistMintAllowance()

  const onClickApprove = () => {
    updateMintAllowance.write?.()
  }

  return (
    <div>
      <SectionTitle>Mint allowance</SectionTitle>
      <p className="mb-4 text-xs text-comet-100">
        For Self-Repaying ENS to work you must approve SRENS to mint alETH on your behalf.
      </p>
      <button
        className={clsxm(
          "flex w-full items-center justify-center gap-2 rounded bg-green-200 p-3 text-xs font-medium text-comet-900 transition-colors",
          {
            "cursor-wait opacity-50": updateMintAllowance.isWaiting,
            "enabled:hover:bg-green-100 enabled:focus:outline-none enabled:focus-visible:ring-1 enabled:focus-visible:ring-bronze enabled:focus-visible:ring-offset-4 enabled:focus-visible:ring-offset-comet-800":
              !updateMintAllowance.isWaiting,
          }
        )}
        disabled={updateMintAllowance.isLoading || updateMintAllowance.isWaiting}
        onClick={onClickApprove}
      >
        Approve
        {updateMintAllowance.isWaiting && <Spinner className="h-3 w-3 fill-current" />}
      </button>
    </div>
  )
}

const UpdateSubscriptions: FC<QueuedChangesProps> = ({ onUpdated }) => {
  const updateSubscriptions = useUpdateSubscriptions(onUpdated)

  const onClickUpdate = () => {
    updateSubscriptions.write?.()
  }

  return (
    <div>
      <button
        className={clsxm(
          "flex w-full items-center justify-center gap-2 rounded bg-green-200 p-3 text-xs font-medium text-comet-900 transition-colors",
          {
            "cursor-wait opacity-50": updateSubscriptions.isWaiting,
            "enabled:hover:bg-green-100 enabled:focus:outline-none enabled:focus-visible:ring-1 enabled:focus-visible:ring-bronze enabled:focus-visible:ring-offset-4 enabled:focus-visible:ring-offset-comet-800":
              !updateSubscriptions.isWaiting,
          }
        )}
        disabled={updateSubscriptions.isLoading || updateSubscriptions.isWaiting}
        onClick={onClickUpdate}
      >
        Update Subscriptions
        {updateSubscriptions.isWaiting && <Spinner className="h-3 w-3 fill-current" />}
      </button>
    </div>
  )
}
