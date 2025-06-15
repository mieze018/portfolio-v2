import { tw, cva } from 'libs/component-factory'

export const PrimaryButton = tw(
  'button',
  cva(
    'w-full text-sm py-2 px-4 rounded hover:bg-main/30 border-main/30 border active:bg-main/50 bg-main/10'
  )
)
