import { AddNewCard } from '@/components/modal-components/add-new-card/add-new-card'
import { Modal } from '@/components/modal-components/modal/modal'
import { BreadCrumbs } from '@/components/ui/bread-crumbs'
import { Page } from '@/components/ui/page/page'
import { Typography } from '@/components/ui/typography'
import { authorIdSelect } from '@/services/decks/decks.select'
import { useAppSelector } from '@/services/store'

import s from './empty-dack.module.scss'

type EmptyDeckProps = {
  deckId: string
  deckName: string | undefined
  id?: string
}

export const EmptyDeck = ({ deckId, deckName, id }: EmptyDeckProps) => {
  const authorID = useAppSelector(authorIdSelect)
  const isMyDeck = authorID === id

  return (
    <>
      <BreadCrumbs title={'Back to Decks List'} />
      <Typography className={s.namePack} variant={'h1'}>
        {deckName}
      </Typography>
      <Page>
        <div className={s.emptyDeckWrapper}>
          {isMyDeck ? (
            <div className={s.textWrapper}>
              <Typography className={s.textWarning} variant={'body1'}>
                This pack is empty. Click add new card to fill this pack
              </Typography>
            </div>
          ) : (
            <div className={s.textWrapper}>
              <Typography className={s.textWarning} variant={'body1'}>
                This pack is empty.
              </Typography>
            </div>
          )}
          {isMyDeck && (
            <div className={s.modal}>
              <Modal
                itemId={''}
                modalTitle={'Add New Deck'}
                nameButton={'Add New Card'}
                variant={'addDeck'}
              >
                <AddNewCard cardId={id} deckId={deckId} title={'myTitle'} />
              </Modal>
            </div>
          )}
        </div>
      </Page>
    </>
  )
}
