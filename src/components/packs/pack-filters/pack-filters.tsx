import { ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { HeadPack } from '@/components/packs/head-pack/head-pack'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { DeleteIcon } from '@/icons'
import {
  maxCardsCountSelector,
  minCardsCountSelector,
  tabValueSelector,
} from '@/services/decks/decks.select'
import { useGetDecksQuery } from '@/services/decks/decks.service'
import {
  TabValue,
  setCardsByAuthor,
  setCardsCount,
  setSearchQuery,
} from '@/services/decks/decks.slice'
import { useAppSelector } from '@/services/store'

import s from './pack-filters.module.scss'

const tabs = [
  {
    disabled: false,
    label: 'My Cards',
    value: 'myCards',
  },
  {
    disabled: false,
    label: 'All Cards',
    value: 'allCards',
  },
]

export type PackFiltersPropsType = {
  searchQuery: string
  sliderLabel?: string
  switcherLabel?: string
}

export function PackFilters(props: PackFiltersPropsType) {
  const { searchQuery, sliderLabel, switcherLabel } = props

  const dispatch = useDispatch()
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const tabValue = useAppSelector(tabValueSelector)
  const { data, status } = useGetDecksQuery()

  useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(setCardsCount([0, data?.maxCardsCount ?? 10]))
    }
  }, [data])

  const onSetCardsByAuthor = (tabValue: TabValue) => {
    dispatch(setCardsByAuthor({ tabValue }))
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery({ value: event.target.value }))
  }

  const handleCardsCountChange = (value: number[]) => {
    dispatch(setCardsCount(value))
  }

  const handlerClearFilters = () => {
    dispatch(setCardsByAuthor({ tabValue: 'allCards' }))
    dispatch(setSearchQuery({ value: '' }))
    dispatch(setCardsCount([0, data?.maxCardsCount ?? 10]))
  }

  return (
    <div className={s.container}>
      <HeadPack />

      <div className={s.filtersBody}>
        <TextField
          isModal={false}
          onChange={handleSearch}
          placeholder={'input search'}
          type={'search'}
          value={searchQuery}
        />
        <div style={{ padding: '0 25px' }}>
          <Typography variant={'body2'}>{switcherLabel}</Typography>
          <TabSwitcher onValueChange={onSetCardsByAuthor} tabs={tabs} value={tabValue} />
        </div>
        <div>
          <Typography variant={'body2'}>{sliderLabel}</Typography>
          <Slider
            handleCardsCountChange={handleCardsCountChange}
            max={data?.maxCardsCount ?? 10}
            min={0}
            values={[minCardsCount, maxCardsCount]}
          />
        </div>
        <Button onClick={handlerClearFilters} style={{ marginLeft: '35px' }} variant={'secondary'}>
          <div className={s.centeredIcons}>
            <DeleteIcon size={15} />
            Clear Filters
          </div>
        </Button>
      </div>
    </div>
  )
}
