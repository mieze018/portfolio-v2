import { ContentsWrapper } from './ContentsWrapper'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ContentsWrapper> = {
  component: ContentsWrapper,
}
export default meta
type Story = StoryObj<typeof ContentsWrapper>

export const ContentsWrapperDefault: Story = {
  args: {
    children: <div>ContentsWrapper</div>,
    $key: '/',
  },
  // TODO レイアウトまでのstoriesを実装してその中でリンクをくりっっ句などをトリガーに実装した方が良さそう
  // play: async ({ args, canvasElement, step, updateArgs }) => {
  //   const canvas = within(canvasElement)
  //   await step('ページ移管時にトランジションする', async () => {
  //     await waitFor(async () => {
  //       updateArgs({ $key: '/some-page' })
  //       expect(canvas.getByText('ContentsWrapper')).toBeTruthy()
  //     })
  //   })
  // },
}
