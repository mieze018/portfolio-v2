import { Dialog, Transition } from '@headlessui/react'
import { useRecoilState } from 'recoil'
import tw from 'twin.macro'

import { isModalOpenState, modalContentState } from 'libs/recoil/atoms'

export const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState)
  const [modalContent] = useRecoilState(modalContentState)
  const ContentWrapper = tw.div`m-auto flex items-center h-screen w-screen overflow-auto`

  return (
    <Transition
      show={isModalOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog
        tw="fixed inset-0 z-50 w-full h-full overflow-auto"
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(!isModalOpen)
        }}
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay tw="bg-white fixed h-full w-full opacity-95 inset-0" />
          <Dialog.Panel
            tw="fixed m-auto overflow-auto cursor-pointer min-w-full min-h-full"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <ContentWrapper>{modalContent}</ContentWrapper>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
