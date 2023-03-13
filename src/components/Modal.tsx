import { Dialog, Transition } from "@headlessui/react"
import { FC, Fragment, PropsWithChildren } from "react"

import { montserrat } from "@/lib/font"

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  isOpen,
  onClose,
}) => {
  return (
    <Transition as={Fragment} show={isOpen}>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50" static>
        <Transition.Child
          as={Fragment}
          enter="transition-all duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition-all duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* Full-screen scrollable container */}
          <div
            className={`${montserrat.variable} fixed inset-0 overflow-y-auto font-sans`}
          >
            {/* Container to center the panel */}
            <div className="flex min-h-full items-center justify-center p-4">
              {/* The actual dialog panel  */}
              <Dialog.Panel className="mx-auto w-full max-w-sm rounded border border-comet-500 bg-comet-600">
                {children}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
