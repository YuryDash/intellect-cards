import { Typography } from '@/components/ui/typography'

import s from './head-pack.module.scss'

export const HeadPack = () => {
  return (
    <div className={s.container}>
      <Typography variant={'h1'}>{'Decks list'}</Typography>
      <DeckModal
        buttonTitle={'Add New Pack'}
        isModalOpen={isModalOpen}
        modalTitle={'Add New Pack'}
        setModalOpen={setModalOpen}
      />
    </div>
  )
}
