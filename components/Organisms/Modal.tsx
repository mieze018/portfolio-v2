import { useRecoilState } from 'recoil'
import tw, { styled } from 'twin.macro'

import { isModalOpenState, modalContentState } from 'libs/recoil/atoms'

const ModalContainer = styled.div`
  ${tw`fixed top-0 left-0 z-50 items-center justify-center w-full h-full overflow-auto transition-opacity bg-white cursor-zoom-out overscroll-none`}
`
export const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState)
  const [modalContent] = useRecoilState(modalContentState)

  return (
    <ModalContainer
      onClick={() => setIsModalOpen(!isModalOpen)}
      css={isModalOpen ? tw`block opacity-100` : tw`hidden opacity-0`}
    >
      {modalContent}
    </ModalContainer>
  )
}
