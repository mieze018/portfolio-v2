import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useRecoilState } from 'recoil'
import tw from 'twin.macro'

import { isModalOpenState, modalContentState } from 'libs/recoil/atoms'

export const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState)
  const [modalContent] = useRecoilState(modalContentState)
  const ContentWrapper = tw.div`m-auto`

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
      <Dialog
        tw="fixed inset-0 z-50 w-full h-full overflow-auto"
        onClose={() => {
          setIsModalOpen(!isModalOpen)
        }}
      >
        <Dialog.Overlay tw="bg-modal fixed h-full w-full opacity-100 inset-0" />
        <Dialog.Panel
          tw="fixed m-auto overflow-auto cursor-pointer h-screen w-screen flex items-center"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <ContentWrapper>{modalContent}</ContentWrapper>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}
