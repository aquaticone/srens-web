import { Dialog, Transition } from "@headlessui/react"
import { FC, Fragment, PropsWithChildren } from "react"

import { montserrat } from "@/lib"

import { Button } from "@/components/Button"

import { Modal as ModalName, useSrensStore } from "@/store"

import CloseIcon from "~/svg/close.svg"

type ModalProps = {
  name: ModalName
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, name }) => {
  const modal = useSrensStore((state) => state.modal)
  const setModal = useSrensStore((store) => store.setModal)

  const onClose = () => setModal(undefined)

  return (
    <Transition.Root as={Fragment} show={modal === name}>
      <Dialog as="div" className={`${montserrat.variable} relative z-40 font-sans`} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <div className="fixed inset-0 z-0 bg-black/50" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-x-0 bottom-0 flex justify-end sm:inset-0 sm:items-center sm:justify-center">
          <Transition.Child
            as={Fragment}
            enter="transition-transform ease-cubic-bezier duration-[350ms]"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
          >
            <Dialog.Panel className="grid max-h-[66svh] w-full grid-rows-[1fr,auto] gap-6 overflow-y-auto rounded-t-lg border-l border-l-comet-700 bg-comet-600 p-4 pb-6 shadow shadow-black/80 focus:outline-none sm:max-w-lg sm:rounded-b-lg sm:border sm:border-comet-500 md:py-6">
              <div className="row-start-2 space-y-6">{children}</div>
              <div className="row-start-1 flex justify-end">
                <Button
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-comet-700 p-2 text-comet-400 focus-visible:ring-offset-comet-600"
                  onClick={onClose}
                >
                  <CloseIcon className="h-3 w-3 sm:h-2.5 sm:w-2.5" />
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
