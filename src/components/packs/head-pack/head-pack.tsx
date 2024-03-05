import { AddNewCard } from '@/components/modal-components/add-new-card/add-new-card'
import { AddNewDeck } from '@/components/modal-components/add-new-deck/add-new-deck'
import { Modal } from '@/components/modal-components/modal/modal'
import { Typography } from '@/components/ui/typography'

import s from './head-pack.module.scss'

const MyDeckHeadPack = () => {
  return (
    <div className={s.container}>
      <Typography variant={'h1'}>{'My Deck'}</Typography>
      <Modal
        itemId={''}
        modalTitle={'Add New Card'}
        nameButton={'Add New Card'}
        variant={'addCards'}
      >
        <AddNewCard />
      </Modal>
    </div>
  )
}

export const HeadPack = () => {
  return (
    <div className={s.container}>
      <Typography variant={'h1'}>{'Decks list'}</Typography>
      <Modal
        itemId={''}
        modalTitle={'Add New Deck'}
        nameButton={'Add New Deck'}
        variant={'addDeck'}
      >
        <AddNewDeck />
      </Modal>
    </div>
  )
}
