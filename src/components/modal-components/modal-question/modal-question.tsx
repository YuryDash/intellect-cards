import { useDispatch } from 'react-redux'

import { ButtonsModalGroup } from '@/components/modal-components/buttons-modal-group/buttons-modal-group'
import { Typography } from '@/components/ui/typography'
import { setModal } from '@/services/decks/decks.slice'
import { Deck } from '@/services/decks/decks.types'

import s from './modal-question.module.scss'

type ModalQuestionProps = {
  item: Deck
  onConfirmDeleteCallback: (id: string, name: string) => void
}

export const ModalQuestion = ({ item }: ModalQuestionProps) => {
  const dispatch = useDispatch()
  const onCloseCallback = () => {
    dispatch(setModal({ variant: null }))
  }

  return (
    <div className={s.container}>
      <Typography variant={'h3'}>
        Do you really want to remove <span className={s.name}>{item.name ?? 'Deck'}</span>? All
        cards will be deleted.
      </Typography>
      <ButtonsModalGroup
        onClose={onCloseCallback}
        titleCloseButton={'Close'}
        titleConfirmButton={'Delete Card'}
      />
    </div>
  )
}
