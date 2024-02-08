import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Sort } from '@/components/packs/pack-table'
import { BreadCrumbs } from '@/components/ui/bread-crumbs'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader/loader'
import { Page } from '@/components/ui/page/page'
import { Pagination } from '@/components/ui/pagination'
import { ItemsType } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { FriendsTable } from '@/pages/decks/friends-pack-page/friends-table/friends-table'
import { useGetDeckByIdQuery, useGetDeckCardsByIdQuery } from '@/services/decks/decks.service'

import s from './friends-pack.module.scss'

export function FriendsPack() {
  const { id } = useParams()
  const { data: friendsDeck, isLoading } = useGetDeckByIdQuery({ id })

  const { data } = useGetDeckCardsByIdQuery({ id })

  console.log(friendsDeck)
  console.log('это френд дэкс useGetDeckByIdQuery')
  console.log(data)
  console.log('это useGetDeckCardsByIdQuery хз что за ххуйня')

  const [itemPerPage, setItemPerPage] = useState(10)
  const [currentPageUse, setCurrentPageUse] = useState(1)
  const [sort, setSort] = useState<Sort>(null)

  // const { data, error, isLoading } = useGetDecksQuery({
  //   authorId: meId,
  //   currentPage: currentPageUse,
  //   itemsPerPage: itemPerPage,
  //   maxCardsCount: maxCardsCount,
  //   minCardsCount: minCardsCount,
  //   name: searchQuery,
  // })

  if (isLoading) {
    return <Loader />
  }

  // if (error) {
  //   // console.log(error)
  //
  //   return <div>Error</div>
  // }

  const items: ItemsType[] = [
    { title: '5', value: '5' },
    { title: '10', value: '10' },
  ]

  const itemsPerPage = (selectValue: string) => setItemPerPage(Number(selectValue))

  return (
    <>
      <BreadCrumbs title={'Back to Decks List'} />

      <Page>
        <div className={s.header}>
          <Typography variant={'h1'}>{friendsDeck?.name || ''}</Typography>
          <Button variant={'primary'}>Learn to Pack</Button>
        </div>
        <TextField placeholder={'search . . .'} type={'search'} />
        <FriendsTable cards={data?.items} onSort={setSort} sort={sort} />
        <Pagination
          currentPage={data?.pagination.currentPage ?? 1}
          items={items}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPageUse}
          pageSize={data?.pagination.itemsPerPage ?? 10}
          totalCount={data?.pagination.totalPages ?? 10}
        />
      </Page>
    </>
  )
}
