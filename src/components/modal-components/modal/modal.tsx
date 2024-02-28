import { ReactNode } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { DeleteIcon } from '@/icons'
import { idtModalSelector, variantModalSelector } from '@/services/decks/decks.select'
import { setModal } from '@/services/decks/decks.slice'
import { ModalVariant } from '@/services/decks/decks.types'
import { useAppSelector } from '@/services/store'
import { Content, Overlay, Portal, Root, Trigger } from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './modal.module.scss'

type ModalProps = {
  children: ReactNode
  itemId: string
  modalTitle: string
  nameButton?: string
  variant: ModalVariant
}

export const Modal = ({ children, itemId, modalTitle, nameButton, variant }: ModalProps) => {
  const variantModal = useAppSelector(variantModalSelector)
  const modalIdState = useAppSelector(idtModalSelector)

  const dispatch = useDispatch()
  const onChangeModalHandler = () => {
    dispatch(setModal({ modalID: null, variant: null }))
  }
  const onOpen = () => {
    dispatch(setModal({ modalID: itemId, variant: variant }))
  }

  return (
    <Root onOpenChange={onOpen} open={variantModal === variant && modalIdState === itemId}>
      <Trigger asChild>
        {variant === 'question' ? (
          <DeleteIcon />
        ) : (
          <Button onClick={onChangeModalHandler} variant={'primary'}>
            {nameButton}
          </Button>
        )}
      </Trigger>
      <Portal>
        <Overlay className={s.DialogOverlay} onClick={onChangeModalHandler} />
        <Content className={s.DialogContent}>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              margin: '18px 24px',
            }}
          >
            <Typography variant={'h3'}>{modalTitle}</Typography>
            <button aria-label={'Close'} className={s.IconButton} onClick={onChangeModalHandler}>
              <Cross2Icon />
            </button>
          </div>
          <div className={s.underLine}></div>
          {children}
        </Content>
      </Portal>
    </Root>
  )
}
