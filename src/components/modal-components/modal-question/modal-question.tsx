import { useDispatch } from 'react-redux'

import { ButtonsModalGroup } from '@/components/modal-components/buttons-modal-group/buttons-modal-group'
import { Typography } from '@/components/ui/typography'
import { setModal } from '@/services/decks/decks.slice'
import { Deck, ResponseFriendCardItems, ResponseGetDeckById } from '@/services/decks/decks.types'

import s from './modal-question.module.scss'

type ModalQuestionProps = {
  item: Deck | ResponseFriendCardItems | ResponseGetDeckById
  onConfirmDeleteCallback: (id: string, name: string) => void
}

export const ModalQuestion = ({ item, onConfirmDeleteCallback }: ModalQuestionProps) => {
  const dispatch = useDispatch()
  const onCloseCallback = () => {
    dispatch(setModal({ modalID: null, variant: null }))
  }

  console.log(item)

  const itemName = 'name' in item ? item.name : item.question
  const defaultName = 'name' in item ? 'Deck' : 'Card'
  const confirmButtonTitle = 'name' in item ? 'Delete Deck' : 'Delete Card'

  return (
    <div className={s.container}>
      <Typography variant={'h3'}>
        Do you really want to remove <span className={s.name}>{itemName ?? defaultName}</span>?
        {defaultName === 'Deck' ? 'All cards will be deleted.' : ''}
      </Typography>
      <ButtonsModalGroup
        confirm={id => onConfirmDeleteCallback(id, itemName)}
        id={item.id}
        onClose={onCloseCallback}
        titleCloseButton={'Close'}
        titleConfirmButton={confirmButtonTitle}
      />
    </div>
  )
}
