import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { Work } from './Work';
export default { component: Work } as ComponentMeta<typeof Work>
export const Default: ComponentStoryObj<typeof Work> = {
    args: {
        work: {
            gジャンル: '文芸書 装画',
            k形態: '文庫本',
            s出版社: '株式会社KADOKAWA',
            tタイトル: '少女は夜を綴らない',
            t著者: '逸木裕',
            dデザイン: 'カバーデザイン 大原由依',
            n発表年月: '2020-06'
        }
    },
}
