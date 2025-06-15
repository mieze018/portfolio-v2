import type { Meta, StoryObj } from '@storybook/nextjs'
import { hashCloseup, Modal } from './Modal'
import { useSetAtom } from 'jotai'
import { modalContentState } from 'libs/states/atoms'

const testImageThumb = 'https://picsum.photos/id/4/400/300'
const testImageFull = 'https://picsum.photos/id/4/1200/800'

const meta: Meta<typeof Modal> = {
  component: Modal,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => {
      const setModalContent = useSetAtom(modalContentState)
      setModalContent(<img src={testImageFull} alt="サンプル画像" />)
      return (
        <div style={{ padding: '20px' }}>
          <a href={`#${hashCloseup}`} data-testid="modal-trigger">
            <img src={testImageThumb} alt="サンプル画像" />
          </a>
          <Story />
        </div>
      )
    },
  ],
}
export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {}

// todo: URLへのハッシュ付与がテストできないので要リファクタ
// export const OpenModal: Story = {
//   ...Default,
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement)

//     // モーダルトリガーをクリック
//     const trigger = canvas.getByTestId('modal-trigger')
//     await userEvent.click(trigger)

//     // モーダルが開いていることを確認
//     await waitFor(() => {
//       const modal = canvas.getByRole('dialog')
//       expect(modal).toBeInTheDocument()
//     })
//   },
// }

export const InitiallyOpen: Story = {
  ...Default,
  parameters: {
    nextjs: {
      router: {
        asPath: `/#${hashCloseup}`,
      },
    },
  },
}
