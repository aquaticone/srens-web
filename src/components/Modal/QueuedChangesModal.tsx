import { FC } from "react"

import { AccountOverview } from "@/components/AccountOverview"
import { Modal } from "@/components/Modal/Modal"
import { CommitQueuedChanges, QueuedChanges } from "@/components/QueuedChanges"
import { SectionTitle } from "@/components/SectionTitle"

import { useSrensStore } from "@/store"

export const QueuedChangesModal: FC = () => {
  const queuedCallsCount = useSrensStore((store) => store.queuedCalls.length)
  return (
    <Modal name="queuedChanges">
      <AccountOverview showAlchemixLink showCollateralizationHelp />
      <CommitQueuedChanges />
      <div>
        <SectionTitle className="text-white">
          Changes{queuedCallsCount > 0 ? ` (${queuedCallsCount})` : null}
        </SectionTitle>
        <QueuedChanges />
      </div>
    </Modal>
  )
}
