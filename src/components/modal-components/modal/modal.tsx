import { ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import * as DialogRadixUI from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'

import s from './modal.module.scss'

type ModalProps = {
  children: ReactNode
  isOpen: boolean
  onClose?: (value: boolean) => void
  showCloseButton?: boolean
  title?: string
}

const dropIn = {
  exit: {
    opacity: 0,
    y: '100vh',
  },
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      damping: 25,
      duration: 0.1,
      stiffness: 500,
      type: 'spring',
    },
  },
}

export const Modal = ({ children, isOpen, onClose, showCloseButton, title }: ModalProps) => {
  const handleModalClose = () => {
    onClose?.(false)
  }

  return (
    <DialogRadixUI.Root onOpenChange={handleModalClose} open={isOpen}>
      <AnimatePresence>
        {isOpen && (
          <DialogRadixUI.Portal>
            <DialogRadixUI.Overlay asChild className={s.dialogOverlay}>
              <motion.div
                animate={{ opacity: 1 }}
                className={s.overlay}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                onClick={handleModalClose}
              />
            </DialogRadixUI.Overlay>
            <DialogRadixUI.Content className={s.dialogContent}>
              <motion.div animate={'visible'} exit={'exit'} initial={'hidden'} variants={dropIn}>
                <div className={s.modal}>
                  {showCloseButton && (
                    <div className={s.titleWrapper}>
                      <DialogRadixUI.Title className={s.dialogTitle}>
                        <Typography as={'p'} className={s.title} variant={'h2'}>
                          {title}
                        </Typography>
                      </DialogRadixUI.Title>
                      <DialogRadixUI.Close asChild>
                        <button aria-label={'Close'}>
                          <Cross2Icon className={s.closeMark} />
                        </button>
                      </DialogRadixUI.Close>
                    </div>
                  )}
                  <div className={s.modalContent}>{children}</div>
                </div>
              </motion.div>
            </DialogRadixUI.Content>
          </DialogRadixUI.Portal>
        )}
      </AnimatePresence>
    </DialogRadixUI.Root>
  )
}
