import { CardsModal } from '@/components/modal-components/modal-card/modal-card'
import { BreadCrumbs } from '@/components/ui/bread-crumbs'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './empty-deck.module.scss'

type EmptyDeckProps = {
  deckName: string | undefined
  id?: string
  isLearn?: boolean
  isModalOpen?: boolean
  isMyDeck: boolean
  setIsModalOpen?: (open: boolean) => void
}
export const EmptyDeck = ({
  deckName,
  id,
  isLearn,
  isModalOpen,
  isMyDeck,
  setIsModalOpen,
}: EmptyDeckProps) => {
  const onModalOpen = () => {
    setIsModalOpen && setIsModalOpen(true)
  }
  const onSetOpen = (isOpen: boolean) => {
    setIsModalOpen && setIsModalOpen(isOpen)
  }
  const isOpen = isModalOpen || false

  return (
    <div className={s.emptyDeckWrapper}>
      <BreadCrumbs backTo={'/'} title={'EMPTY_DECK_TSX'} />
      <Typography className={s.namePack} variant={'large'}>
        {deckName}
      </Typography>
      {isMyDeck ? (
        <div className={s.textWrapper}>
          <Typography as={'p'} className={s.textWarning} variant={'body1'}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button onClick={onModalOpen}>
            <Typography as={'h4'} variant={'subtitle2'}>
              Add New Card
            </Typography>
          </Button>
        </div>
      ) : (
        <div className={s.textWrapper}>
          <Typography as={'p'} className={s.textWarning} variant={'body1'}>
            This pack is empty.
          </Typography>
          {isLearn && (
            <Typography as={'p'} className={s.textWarning} variant={'body1'}>
              There is nothing to learn
            </Typography>
          )}
        </div>
      )}
      <CardsModal
        buttonTitle={'Add New Card'}
        id={id}
        isModalOpen={isOpen}
        setIsModalOpen={open => onSetOpen(open)}
        title={'Add New Card'}
      />
    </div>
  )
}
