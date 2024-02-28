import { AddNewDeck } from '@/components/modal-components/add-new-deck/add-new-deck'
import { Modal } from '@/components/modal-components/modal/modal'
import { Typography } from '@/components/ui/typography'

import s from './head-pack.module.scss'

type Props = {
  title: string
}

export const HeadPack = ({ title }: Props) => {
  return (
    <div className={s.container}>
      <Typography variant={'h1'}>{title}</Typography>
      <Modal
        itemId={''}
        modalTitle={'Add New Deck'}
        nameButton={'Add New Pack'}
        variant={'addDeck'}
      >
        <AddNewDeck />
      </Modal>
    </div>
  )
}
