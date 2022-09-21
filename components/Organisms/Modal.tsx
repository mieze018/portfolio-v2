import { Dialog, Transition } from '@headlessui/react'
import router from 'next/router'
import { Fragment, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import tw from 'twin.macro'

import { isModalOpenState, modalContentState } from 'libs/recoil/atoms'
import { useHash } from 'libs/useHash'
/**画像拡大用のハッシュ値 */
export const hashCloseup = 'closeup'

export const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState)
  const [modalContent] = useRecoilState(modalContentState)
  const [hash, setHash] = useHash()
  const ContentWrapper = tw.div`m-auto p-4`

  //ハッシュ値がcloseupならモーダルを開く
  useEffect(() => {
    const onHashChangeStart = () =>
      hash === hashCloseup && modalContent ? setIsModalOpen(true) : setIsModalOpen(false)
    onHashChangeStart()
    router.events.on('hashChangeStart', onHashChangeStart)
    router.events.on('hashChangeComplete', onHashChangeStart)
  }, [hash, modalContent, setIsModalOpen])

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
      <Dialog tw="fixed inset-0 z-50 w-full h-full" onClose={() => setIsModalOpen(false)}>
        <Dialog.Overlay tw="bg-modal fixed h-full w-full opacity-100 inset-0" />
        <Dialog.Panel
          tw="fixed m-auto cursor-pointer h-screen w-screen flex items-center
          overflow-auto scrollbar-thin scrollbar-thumb-Azure scrollbar-corner-transparent "
          onClick={() => setHash('')}
        >
          <ContentWrapper>{modalContent}</ContentWrapper>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}
