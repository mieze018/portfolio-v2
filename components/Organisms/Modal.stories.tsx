// import { within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { useSetAtom } from 'jotai'
import { modalContentState } from 'libs/states/atoms'

const meta: Meta<typeof Modal> = {
  component: Modal,
  parameters: {
    url: 'http://example.com#closeup',
    // TODO: ロジック切り離したら消す
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = () => {
  // 内容を設定
  const setModalContent = useSetAtom(modalContentState)
  setModalContent(<div>モーダルコンテンツ</div>)

  return <Modal />
}
Default.play = async () => {
  // const canvas = within(canvasElement)
  // const body = within(canvasElement.parentNode as HTMLElement) // 内容がPortalなのでルートの親から探す
}
