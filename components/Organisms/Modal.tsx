import { Dialog, Transition } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRecoilState } from 'recoil'
import tw from 'twin.macro'

import { isModalOpenState, modalContentState } from 'libs/recoil/atoms'

export const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState)
  const [modalContent] = useRecoilState(modalContentState)
  const ContentWrapper = tw.div`m-auto flex items-center h-screen w-screen overflow-auto`

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // ref.current?.scrollIntoView(true)
      }}
    >
      {isModalOpen && (
        <Dialog
          static
          as={motion.div}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(!isModalOpen)
          }}
          tw="fixed inset-0 z-50 w-full h-full overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <Dialog.Overlay as={motion.div} tw="bg-white fixed h-full w-full opacity-95 inset-0" />
          <Dialog.Panel
            as={motion.div}
            tw="fixed m-auto overflow-auto cursor-pointer min-w-full min-h-full"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <ContentWrapper>{modalContent}</ContentWrapper>
          </Dialog.Panel>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
