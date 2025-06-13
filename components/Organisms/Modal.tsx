import { Dialog, Transition } from '@headlessui/react'
import { useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { cva } from 'class-variance-authority'

import { modalContentState } from 'libs/states/atoms'
import { useHash } from 'libs/useHash'
/**画像拡大用のハッシュ値 */
export const hashCloseup = 'closeup'

// CVAでスタイルバリアントを定義
const dialogVariants = cva('fixed inset-0 z-50 w-full h-full')

const overlayVariants = cva('bg-modal fixed h-full min-h-screen w-full min-w-screen inset-0')

const panelVariants = cva(
  'fixed m-auto cursor-pointer h-screen w-full flex items-center overflow-auto'
)

const contentWrapperVariants = cva('m-auto p-4')

export const Modal = () => {
  const modalContent = useAtomValue(modalContentState)
  const [hash, setHash] = useHash()
  const isShow = !!(hash === hashCloseup && modalContent)

  return (
    <Transition show={isShow} as={Fragment}>
      <Dialog className={dialogVariants()} open={isShow} onClose={() => setHash('')}>
        <Transition.Child
          as={Fragment}
          enter=""
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className={overlayVariants()} />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave=""
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className={panelVariants()} onClick={() => setHash('')}>
            <div className={contentWrapperVariants()}>{modalContent}</div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
