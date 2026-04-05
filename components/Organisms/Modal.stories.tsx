import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { createStore, Provider } from 'jotai'
import { modalPhotoState } from 'libs/states/atoms'
import { Modal } from './Modal'

const testPhoto = {
  src: 'https://picsum.photos/id/4/1200/800',
  width: 1200,
  height: 800,
  alt: 'サンプル画像',
}

const meta: Meta<typeof Modal> = {
  component: Modal,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}
export default meta
type Story = StoryObj<typeof Modal>

/**
 * モーダルが閉じている状態。
 * photo データが null のため、何も表示されない。
 */
export const Closed: Story = {}

/**
 * モーダルが開いている状態。
 *
 * Why: modalPhotoState にテストデータを注入し、URL hash を closeup に設定する。
 * useModalControl の isOpen 条件（hash === 'closeup' && photo !== null）を満たす。
 */
export const Open: Story = {
  decorators: [
    (Story) => {
      const store = createStore()
      store.set(modalPhotoState, testPhoto)
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      )
    },
  ],
  parameters: {
    nextjs: {
      router: {
        asPath: '/#closeup',
      },
    },
  },
}

/**
 * alt が未指定の場合。photo.alt ?? photo.src の nullish coalescing をカバーする。
 */
export const OpenWithoutAlt: Story = {
  decorators: [
    (Story) => {
      const store = createStore()
      store.set(modalPhotoState, {
        src: 'https://picsum.photos/id/4/1200/800',
        width: 1200,
        height: 800,
      })
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      )
    },
  ],
  parameters: {
    nextjs: {
      router: {
        asPath: '/#closeup',
      },
    },
  },
}
