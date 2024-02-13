import { ReactNode } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { openCloseModalSelector } from '@/services/decks/decks.select'
import { setModal } from '@/services/decks/decks.slice'
import { useAppSelector } from '@/services/store'
import { Close, Content, Overlay, Portal, Root, Trigger } from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './modal.module.scss'

type ModalProps = {
  children: ReactNode
  modalTitle: string
  nameButton?: string
}

export const Modal = ({ children, nameButton }: ModalProps) => {
  const onOpenCloseModal = useAppSelector(openCloseModalSelector)
  const dispatch = useDispatch()
  const onChangeModalHandler = () => {
    dispatch(setModal({ openClose: false }))
  }
  const onOpen = () => {
    dispatch(setModal({ openClose: !onOpenCloseModal }))
  }

  return (
    <Root onOpenChange={onOpen} open={onOpenCloseModal}>
      <Trigger asChild>
        <Button onClick={onChangeModalHandler} variant={'primary'}>
          {nameButton}
        </Button>
      </Trigger>
      <Portal>
        <Overlay className={s.DialogOverlay} />
        <Content className={s.DialogContent}>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              margin: '18px 24px',
            }}
          >
            <Typography variant={'h3'}>Add New Deck</Typography>
            <Close asChild>
              <button aria-label={'Close'} className={s.IconButton} onClick={onChangeModalHandler}>
                <Cross2Icon />
              </button>
            </Close>
          </div>
          <div className={s.underLine}></div>
          {children}
        </Content>
      </Portal>
    </Root>
  )
}
