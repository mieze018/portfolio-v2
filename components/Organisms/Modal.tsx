'use client'

import { Dialog, Transition } from '@headlessui/react'
import { useAtomValue } from 'jotai'
import { Fragment } from 'react'
import { tw, cva } from 'libs/component-factory'
import { cn } from 'libs/tw-clsx-util'

import { modalContentState } from 'libs/states/atoms'
import { useHash } from 'libs/useHash'
/**画像拡大用のハッシュ値 */
export const hashCloseup = 'closeup'

// HeadlessUIコンポーネントは特殊なので直接cvaで定義
const dialogVariants = cva('fixed inset-0 z-50 w-full h-full')
const dialogOverlayVariants = cva('bg-modal fixed h-full min-h-screen w-full min-w-screen inset-0')
const dialogPanelVariants = cva(
  'fixed m-auto cursor-pointer h-screen w-full flex items-center overflow-auto'
)
const ContentWrapper = tw('div', cva('m-auto p-4'))

export const Modal = () => {
  const modalContent = useAtomValue(modalContentState)
  const [hash, setHash] = useHash()
  const isShow = !!(hash === hashCloseup && modalContent)

  return (
    <Transition show={isShow} as={Fragment}>
      <Dialog open={isShow} onClose={() => setHash('')} className={cn(dialogVariants())}>
        <Transition.Child
          as={Fragment}
          enter=""
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className={cn(dialogOverlayVariants())} />
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
          <Dialog.Panel className={cn(dialogPanelVariants())} onClick={() => setHash('')}>
            <ContentWrapper>{modalContent}</ContentWrapper>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
