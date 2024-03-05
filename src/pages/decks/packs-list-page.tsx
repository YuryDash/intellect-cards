import { useState } from 'react'

import { PackFilters } from '@/components/packs/pack-filters'
import { Column, PackTable } from '@/components/packs/pack-table'
import Loader from '@/components/ui/loader/loader'
import { Page } from '@/components/ui/page/page'
import { Pagination } from '@/components/ui/pagination'
import {
  authorIdSelect,
  maxCardsCountSelector,
  minCardsCountSelector,
  searchQuerySelector,
  tabValueSelector,
} from '@/services/decks/decks.select'
import { useGetDecksQuery } from '@/services/decks/decks.service'
import { useAppSelector } from '@/services/store'

export const columns: Column[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    sortable: false,
    title: 'Created by',
  },
  {
    key: '',
    sortable: true,
    title: '',
  },
]

export const PacksListPage = () => {
  const authorId = useAppSelector(authorIdSelect)
  const tabValue = useAppSelector(tabValueSelector)
  const searchQuery = useAppSelector(searchQuerySelector)
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)

  const meId = tabValue === 'myCards' ? authorId : ''
  const [itemPerPage, setItemPerPage] = useState(10)
  const [currentPageUse, setCurrentPageUse] = useState(1)

  const { data, error, isLoading } = useGetDecksQuery({
    authorId: meId,
    currentPage: currentPageUse,
    itemsPerPage: itemPerPage,
    maxCardsCount: maxCardsCount,
    minCardsCount: minCardsCount,
    name: searchQuery,
  })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    // console.log(error)

    return <div>Error</div>
  }

  const itemsPerPage = (selectValue: string) => setItemPerPage(Number(selectValue))

  return (
    <Page>
      <PackFilters
        searchQuery={searchQuery}
        sliderLabel={'Number of cards'}
        switcherLabel={'Show packs cards'}
      />
      <PackTable
        columns={columns}
        decks={data}
        maxCardsCount={maxCardsCount}
        minCardsCount={minCardsCount}
        searchQuery={searchQuery}
        tabValue={tabValue}
      />
      <Pagination
        currentPage={data?.pagination.currentPage ?? 1}
        items={['10', '15', '20', '25']}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPageUse}
        pageSize={data?.pagination.itemsPerPage ?? 10}
        totalCount={data?.pagination.totalPages ?? 10}
      />
    </Page>
  )
}
