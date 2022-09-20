import { Work } from './Work'

import type { ComponentMeta, ComponentStoryObj } from '@storybook/react'

export default { component: Work } as ComponentMeta<typeof Work>

export const Default: ComponentStoryObj<typeof Work> = {
  args: {
    work: {
      genre: '文芸書 装画',
      format: '文庫本',
      publisher: '株式会社KADOKAWA',
      title: '少女は夜を綴らない',
      author: '逸木裕',
      designer: 'カバーデザイン 大原由依',
      releaseMonth: '2020-06',
    },
  },
}
