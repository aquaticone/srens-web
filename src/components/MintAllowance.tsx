import { BigNumber, constants } from "ethers"
import { FC, MouseEventHandler } from "react"

import clsxm from "@/lib/clsxm"
import {
  useIsClientReady,
  useReadAlchemistMintAllowance,
  useWriteAlchemistMintAllowance,
} from "@/hooks"

import { Button } from "@/components/Button"
import { FallbackMessage } from "@/components/FallbackMessage"
import { Spinner } from "@/components/Spinner"

export const MintAllowance: FC = () => {
  const isClientReady = useIsClientReady()
  const mintAllowance = useReadAlchemistMintAllowance()

  const amountToApprove = mintAllowance.data
    ? BigNumber.from(0)
    : constants.MaxUint256
  const setMintAllowance = useWriteAlchemistMintAllowance(amountToApprove)

  const onClick: MouseEventHandler<HTMLButtonElement> = () =>
    setMintAllowance.write?.()

  return (
    <div className="grid">
      {!isClientReady || mintAllowance.isLoading ? (
        <FallbackMessage>
          <Spinner className="h-8 w-8" />
        </FallbackMessage>
      ) : mintAllowance.isError ? (
        <FallbackMessage className="border border-comet-600 bg-comet-700">
          Error fetching SRENS mint allowance
        </FallbackMessage>
      ) : mintAllowance.data ? (
        <div>
          <p className="max-w-prose text-sm md:max-lg:text-xs">
            You're all set to use Self-Repaying ENS. You can revoke allowance at
            any time to disable service.
          </p>
          <div className="mt-4">
            <Button
              color="grey"
              className="w-full"
              disabled={setMintAllowance.isLoading}
              isLoading={setMintAllowance.isWaiting}
              loadingText="Revoking"
              onClick={onClick}
            >
              Revoke
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p className="max-w-prose text-sm md:max-lg:text-xs">
            To get started with Self-Repaying ENS, you must approve the SRENS
            service to mint alETH on your behalf. Minted alETH will be used to
            cover domain renewals.
          </p>
          <div className="mt-4">
            <Button
              color="green"
              className="w-full"
              disabled={setMintAllowance.isLoading}
              isLoading={setMintAllowance.isWaiting}
              loadingText="Approving"
              onClick={onClick}
            >
              Approve
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export const MintAllowanceStatus: FC = () => {
  const isClientReady = useIsClientReady()
  const mintAllowance = useReadAlchemistMintAllowance()

  const isLoading = !isClientReady || mintAllowance.isLoading
  const isAllowed = mintAllowance.data

  return (
    <div
      className={clsxm(
        "inline-flex items-center gap-2 rounded border px-2 py-1",
        {
          "border-comet-100 text-comet-100": isLoading,
          "border-green-300 text-green-300": !isLoading && isAllowed,
          "border-orange text-orange": !isLoading && !isAllowed,
        }
      )}
    >
      <div className="col-span-full text-xs font-semibold uppercase leading-none">
        <span className="md:max-lg:hidden">
          {isLoading ? "Status " : "Service "}
        </span>
        <span>
          {isLoading ? "Loading" : isAllowed ? "Enabled" : "Disabled"}
        </span>
      </div>
      {isLoading && <Spinner className="h-3 w-3 fill-comet-100" />}
    </div>
  )
}
