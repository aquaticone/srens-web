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

import { useQueueStore, useToastStore } from "@/store"

export const QueuedChanges: FC = () => {
  const isClientReady = useIsClientReady()
  const calls = useQueueStore((store) => store.calls)
  const removeCall = useQueueStore((store) => store.removeCall)

  const isRemoveDisabled = useToastStore((state) => state.status === "pending")

  return (
    <>
      {isClientReady && calls.length > 0 ? (
        <ul>
          {calls.map(({ name, type }) => (
            <li key={`queue-${name}`} className="grid grid-cols-[auto,1fr,auto] items-center gap-2 py-2">
              {type === "subscribe" ? (
                <FiPlus className="h-5 w-5 stroke-green-100" />
              ) : (
                <FiMinus className="h-5 w-5 stroke-orange" />
              )}
              <div className="grow-0 overflow-hidden text-ellipsis text-sm">{name}</div>
              <button
                className="rounded text-comet-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-bronze focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isRemoveDisabled}
                onClick={() => removeCall(name)}
              >
                <FiX className="h-5 w-5 fill-current" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-xs text-comet-100">
          Subscription changes you make will appear here for review. You can submit multiple changes in a single
          transaction.
        </div>
      )}
    </>
  )
}

type CommitQueuedChangesProps = {
  onUpdated: () => void
}

export const CommitQueuedChanges: FC<CommitQueuedChangesProps> = ({ onUpdated }) => {
  const isClientReady = useIsClientReady()
  const calls = useQueueStore((store) => store.calls)
  const mintAllowance = useReadAlchemistMintAllowance()
  const updateMintAllowance = useUpdateAlchemistMintAllowance()
  const updateSubscriptions = useUpdateSubscriptions(onUpdated)

  const onClickApprove = () => {
    updateMintAllowance.write?.()
  }
  const onClickUpdate = () => {
    updateSubscriptions.write?.()
  }

  if (!isClientReady || !calls.length) return null

  const isLoading = updateMintAllowance.isLoading || updateSubscriptions.isLoading
  const isWaiting = updateMintAllowance.isWaiting || updateSubscriptions.isWaiting

  return (
    <div>
      <SectionTitle>{mintAllowance.data ? "Update Subscriptions" : "Mint allowance"}</SectionTitle>
      {!mintAllowance.data && (
        <p className="mb-4 text-xs text-comet-100">
          For Self-Repaying ENS to work you must approve SRENS to mint alETH on your behalf.
        </p>
      )}
      <button
        className={clsxm(
          "flex w-full items-center justify-center gap-2 rounded bg-green-200 p-3 text-xs font-medium text-comet-900 transition-colors",
          {
            "cursor-wait opacity-50": isWaiting,
            "enabled:hover:bg-green-100 enabled:focus:outline-none enabled:focus-visible:ring-1 enabled:focus-visible:ring-bronze enabled:focus-visible:ring-offset-4 enabled:focus-visible:ring-offset-comet-800":
              !isWaiting,
          }
        )}
        disabled={isLoading || isWaiting}
        onClick={mintAllowance.data ? onClickUpdate : onClickApprove}
      >
        {mintAllowance.data ? "Update subscriptions" : "Approve"}
        {isWaiting && <Spinner className="h-3 w-3 fill-current" />}
      </button>
    </div>
  )
}
