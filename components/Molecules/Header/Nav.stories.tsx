import { expect } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import type { Meta, StoryObj } from '@storybook/react'
import { Nav } from './Nav'

const meta: Meta<typeof Nav> = {
  component: Nav,
  decorators: [
    (Story) => {
      return (
        <div style={{ height: '200vh' }} data-testid="scroll-wrapper">
          <div style={{ top: 0, position: 'fixed' }}>
            <Story />
          </div>
        </div>
      )
    },
  ],
}
export default meta
type Story = StoryObj<typeof Nav>

export const Default: Story = { args: { children: 'Nav' } }
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const user = userEvent.setup()
  const Nav = canvas.getByText('Nav')
  // スクロールダウンすると、Navに`filter: brightness(125%)`及び、@media (min-width: 768px)なら `blur(1px)`,それ以外なら`blur(0px)`が適用される
  window.scrollTo(0, 500)
  // user.scroll(canvas.getByTestId('scroll-wrapper'), 0, 500)
  // コンポーネント内のuseScrollState()の返り値が、{ init: false, sinking: true, sunk: false }になるまで待つ

  await waitFor(() => expect(Nav).toHaveStyle({ filter: 'blur(1px) brightness(1.25)' }))
  // scrollFaderの位置は、top: 0px
  await expect(Nav.scrollTop === 0).toBeTruthy()
  //上部へスクロールすると、Navに`filter: brightness(100%) blur(0)`が適用される
  window.scrollTo(0, 0)
  await waitFor(() => expect(Nav).toHaveStyle({ filter: 'blur(0px) brightness(1)' }))
}

export const Footer: Story = { args: { children: 'Nav', footer: true } }
