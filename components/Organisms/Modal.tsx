import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useRecoilState } from 'recoil'
import tw from 'twin.macro'

import { modalContentState } from 'libs/recoil/atoms'
import { useHash } from 'libs/useHash'
/**画像拡大用のハッシュ値 */
export const hashCloseup = 'closeup'

export const Modal = () => {
  const [modalContent] = useRecoilState(modalContentState)
  const [hash, setHash] = useHash()
  const ContentWrapper = tw.div`m-auto p-4`
  const isShow = !!(hash === hashCloseup && modalContent)

  return (
    <Transition
      show={isModalOpen}
      enter="transition duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition duration-100 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      as={Fragment}
    >
        <Dialog.Panel
          tw="fixed m-auto cursor-pointer h-screen w-screen flex items-center
          overflow-auto scrollbar-thin scrollbar-thumb-Azure scrollbar-corner-transparent "
          onClick={() => setHash('')}
      <Dialog tw="fixed inset-0 z-50 w-full h-full" onClose={() => setHash('')}>
        >
          <ContentWrapper>{modalContent}</ContentWrapper>
        </Dialog.Panel>
          <Dialog.Overlay tw="bg-modal fixed h-full min-h-screen w-full min-w-screen  inset-0" />
      </Dialog>
    </Transition>
  )
}
