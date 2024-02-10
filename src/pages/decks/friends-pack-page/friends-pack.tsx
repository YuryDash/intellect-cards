import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Sort } from '@/components/packs/pack-table'
import { BreadCrumbs } from '@/components/ui/bread-crumbs'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader/loader'
import { Page } from '@/components/ui/page/page'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { FriendsTable } from '@/pages/decks/friends-pack-page/friends-table/friends-table'
import { useGetDeckByIdQuery, useGetDeckCardsByIdQuery } from '@/services/decks/decks.service'

import s from './friends-pack.module.scss'

export function FriendsPack() {
  const { id } = useParams()
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPageUse, setCurrentPageUse] = useState(1)
  const [sort, setSort] = useState<Sort>(null)

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

  if (isLoading || cardsLoading) {
    return <Loader />
  }

  if (errorDeckById || errorDeckCardsById) {
    console.log(errorDeckById || errorDeckCardsById)

    return <div>Error</div>
  }

  const itemsPerPageCallback = (selectValue: string) => setItemsPerPage(Number(selectValue))

  return (
    <>
      <BreadCrumbs title={'Back to Decks List'} />
      <Page>
        <div className={s.header}>
          <Typography variant={'h1'}>{friendsDeck?.name || ''}</Typography>
          <Button
            as={Link}
            style={{ display: 'flex', justifyContent: 'center' }}
            to={`/card/${friendsDeck?.id}`}
            variant={'primary'}
          >
            Learn to Pack
          </Button>
        </div>
        <TextField placeholder={'search . . .'} type={'search'} />
        <FriendsTable cards={data?.items} onSort={setSort} sort={sort} />
        <Pagination
          currentPage={data?.pagination.currentPage ?? 1}
          items={['5', '10', '15']}
          itemsPerPage={itemsPerPageCallback}
          onPageChange={setCurrentPageUse}
          pageSize={data?.pagination.itemsPerPage ?? 10}
          totalCount={data?.pagination.totalItems ?? 1}
        />
      </Page>
    </>
  )
}
