import { Separator } from './Separator'

export default { component: Separator }
export const SeparatorHorizontal = {
  args: { orientation: 'horizontal' },
}
export const SeparatorVertical = {
  args: {
    orientation: 'vertical',
    style: { height: '100px' },
  },
}
