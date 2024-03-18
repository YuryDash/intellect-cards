import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AddNewCard } from '@/components/modal-components/add-new-card/add-new-card'
import { Modal } from '@/components/modal-components/modal/modal'
import { ModalQuestion } from '@/components/modal-components/modal-question/modal-question'
import { Sort } from '@/components/packs/pack-table'
import { BreadCrumbs } from '@/components/ui/bread-crumbs'
import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'
import Loader from '@/components/ui/loader/loader'
import { Page } from '@/components/ui/page/page'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { EmptyDeck } from '@/pages/decks/empty-decks/empty-deck'
import { FriendsTable } from '@/pages/decks/friends-pack-page/friends-table/friends-table'
import { useDeleteCardMutation } from '@/services/cards/cards.service'
import { authorIdSelect, searchQuerySelector } from '@/services/decks/decks.select'
import { useGetDeckByIdQuery, useGetDeckCardsByIdQuery } from '@/services/decks/decks.service'
import { setModal, setSearchQuery } from '@/services/decks/decks.slice'
import { Deck } from '@/services/decks/decks.types'
import { useAppSelector } from '@/services/store'

import s from './friends-pack.module.scss'

export function FriendsPack() {
  const { id } = useParams()
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPageUse, setCurrentPageUse] = useState(1)
  const [sort, setSort] = useState<Sort>(null)
  const selectUserId = useAppSelector(authorIdSelect)
  const { data: friendsDeck, error: errorDeckById, isLoading } = useGetDeckByIdQuery({ id })
  const {
    data,
    error: errorDeckCardsById,
    isLoading: cardsLoading,
  } = useGetDeckCardsByIdQuery({
    currentPage: currentPageUse,
    id,
    itemsPerPage,
  })
  const [deleteCard] = useDeleteCardMutation()

  const dispatch = useDispatch()
  const searchQuery = useAppSelector(searchQuerySelector)

  if (isLoading || cardsLoading) {
    return <Loader />
  }

  if (errorDeckById || errorDeckCardsById) {
    console.log(errorDeckById || errorDeckCardsById)

    return <div>Error</div>
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery({ value: event.target.value }))
  }

  const itemsPerPageCallback = (selectValue: string) => setItemsPerPage(Number(selectValue))

  if (!friendsDeck?.cardsCount) {
    return (
      <EmptyDeck
        deckId={friendsDeck?.id || 'nu'}
        deckName={friendsDeck?.name || 'Deck'}
        id={friendsDeck?.userId || ''}
      />
    )
  }

  const filteredDecks = data?.items.filter(item => {
    return (
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const onConfirmDeleteCallback = async (id: string, name: string) => {
    try {
      await deleteCard(id).unwrap()
      dispatch(setModal({ modalID: null, variant: null }))
      toast.success(`Card: ${name} delete was successful`)
    } catch (e) {
      toast.error(`some error try again latter: ${e}`)
    }
  }

  return (
    <>
      <BreadCrumbs title={'Back to Decks List'} />
      <Page>
        <div className={s.header}>
          {
            <div className={s.dropdownSection}>
              <Typography variant={'h1'}>{friendsDeck?.name || 'Unnamed Deck'}</Typography>
              <Dropdown item={friendsDeck} />
            </div>
          }
          {friendsDeck.userId === selectUserId ? (
            <Modal
              itemId={''}
              modalTitle={'Add New Card'}
              nameButton={'Add New Card'}
              variant={'addCards'}
            >
              <AddNewCard cardId={'123123'} deckId={friendsDeck.id} title={'myTitle'} />
            </Modal>
          ) : (
            <Button
              as={Link}
              style={{ display: 'flex', justifyContent: 'center' }}
              to={`/card/${friendsDeck?.id}`}
              variant={'primary'}
            >
              Learn to Pack
            </Button>
          )}
        </div>
        <TextField
          isModal={false}
          onChange={handleSearch}
          placeholder={'input search'}
          type={'search'}
          value={searchQuery}
        />
        <FriendsTable
          cards={filteredDecks}
          onConfirmDeleteCallback={onConfirmDeleteCallback}
          onSort={setSort}
          sort={sort}
        />
        <Pagination
          currentPage={data?.pagination.currentPage ?? 1}
          items={['5', '10', '15']}
          itemsPerPage={itemsPerPageCallback}
          onPageChange={setCurrentPageUse}
          pageSize={data?.pagination.itemsPerPage ?? 10}
          totalCount={data?.pagination.totalItems ?? 1}
        />
        <div className={s.link}>
          <Modal itemId={'123123'} modalTitle={'Delete deck'} variant={'deleteInModal'}>
            <ModalQuestion item={{} as Deck} onConfirmDeleteCallback={onConfirmDeleteCallback} />
          </Modal>
        </div>
      </Page>
    </>
  )
}
