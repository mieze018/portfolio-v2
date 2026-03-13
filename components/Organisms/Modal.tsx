import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import { tw, cva } from 'libs/component-factory'
import { cn } from 'libs/tw-clsx-util'

import { useModalControl } from 'libs/hooks/useModalControl'

// HeadlessUIコンポーネントは特殊なので直接cvaで定義
const dialogVariants = cva('fixed inset-0 z-50 w-full h-full')
const dialogOverlayVariants = cva('bg-modal fixed h-full min-h-screen w-full min-w-screen inset-0')
const dialogPanelVariants = cva(
  'fixed m-auto cursor-pointer h-screen w-full flex items-center overflow-auto'
)
const ContentWrapper = tw('div', cva('m-auto p-4'))

const lightCyan =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjePD//38ACX8D3nikQTQAAAAASUVORK5CYII='

/**
 * 画像拡大モーダル
 *
 * Why: useModalControl から photo データを受け取り、
 * この Modal が Image のレンダリング責務を持つ。
 * 以前は Photo 側で JSX を生成して atom に渡していたが、
 * データとレンダリングの関心を分離した。
 */
export const Modal = () => {
  const { photo, isOpen, close } = useModalControl()

  return (
    // Why: v2では外側のTransitionラッパーが不要になり、Dialog自体がopen propでトランジションを管理する
    <Dialog open={isOpen} onClose={close} className={cn(dialogVariants())}>
      <TransitionChild
        enter=""
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <DialogBackdrop className={cn(dialogOverlayVariants())} />
      </TransitionChild>
      <TransitionChild
        enter="transition duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave=""
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <DialogPanel className={cn(dialogPanelVariants())} onClick={close}>
          <ContentWrapper>
            {photo && (
              <Image
                src={photo.src}
                alt={photo.alt ?? photo.src}
                width={photo.width}
                height={photo.height}
                className="max-w-none mx-auto cursor-pointer"
                placeholder="blur"
                blurDataURL={lightCyan}
              />
            )}
          </ContentWrapper>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  )
}
