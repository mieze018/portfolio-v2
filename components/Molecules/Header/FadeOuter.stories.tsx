import { expect, waitFor, within } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { FadeOuter } from './FadeOuter'

const meta: Meta<typeof FadeOuter> = {
  component: FadeOuter,
  decorators: [
    (Story) => {
      return (
        <div style={{ height: '100vh' }} data-testid="scroll-wrapper">
          <div style={{ top: 0, position: 'absolute' }}>
            <Story />
          </div>
        </div>
      )
    },
  ],
}
export default meta
type Story = StoryObj<typeof FadeOuter>

export const Default: Story = { args: { children: 'FadeOuter' } }
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const fadeOuter = canvas.getByText('FadeOuter')
  // スクロールダウンすると、FadeOuterが消える
  window.scrollTo(0, 500)
  await waitFor(() => expect(fadeOuter).not.toBeVisible())
  // scrollFaderの位置は、top: 0px
  await expect(fadeOuter.scrollTop === 0).toBeTruthy()
  //上部へスクロールすると、FadeOuterが表示される
  window.scrollTo(0, 0)
  await waitFor(() => expect(fadeOuter).toBeVisible())
}
