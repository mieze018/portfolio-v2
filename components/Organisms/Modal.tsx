import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import tw from 'twin.macro'

import { useModalContent } from 'libs/contexts/modalContentState'
import { useHash } from 'libs/useHash'
/**画像拡大用のハッシュ値 */
export const hashCloseup = 'closeup'

const ContentWrapper = tw.div`m-auto p-4`
export const Modal = () => {
  const { modalContent } = useModalContent()
  const [hash, setHash] = useHash()
  const isShow = !!(hash === hashCloseup && modalContent)

  return (
    <Transition show={isShow} as={Fragment}>
      <Dialog tw="fixed inset-0 z-50 w-full h-full" open={isShow} onClose={() => setHash('')}>
        <Transition.Child
          as={Fragment}
          enter=""
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay tw="bg-modal fixed h-full min-h-screen w-full min-w-screen  inset-0" />
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
          <Dialog.Panel
            tw="fixed m-auto cursor-pointer h-screen w-full flex items-center overflow-auto"
            onClick={() => setHash('')}
          >
            <ContentWrapper>{modalContent}</ContentWrapper>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
