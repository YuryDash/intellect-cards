import { AddNewDeck } from '@/components/modal-components/add-new-deck/add-new-deck'
import { Modal } from '@/components/modal-components/modal/modal'
import { Typography } from '@/components/ui/typography'

import s from './head-pack.module.scss'

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
