import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Modal } from '@/components/modal-components/modal/modal'
import { ModalQuestion } from '@/components/modal-components/modal-question/modal-question'
import { HeaderTable } from '@/components/packs/pack-table/header-table'
import { maxLengthStr } from '@/helpers/maxLengthStr'
import { PlayIcon } from '@/icons'
import { useDeleteDecksMutation } from '@/services/decks/decks.service'
import { setModal } from '@/services/decks/decks.slice'
import { GetDesksResponse } from '@/services/decks/decks.types'

import s from './pack-table.module.scss'

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

export type Column = {
  key: string
  size?: string
  sortable?: boolean
  title: string
}

export type PackTableProps = {
  columns: Column[]
  decks?: GetDesksResponse
  maxCardsCount: number
  minCardsCount: number
  searchQuery: string
  tabValue: string
}

export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref) => {
    return <table className={className} {...rest} ref={ref} />
  }
)
export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...rest }, ref) => {
    return <tbody className={className} {...rest} ref={ref} />
  }
)
export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...rest }, ref) => {
    return <tr className={className} {...rest} ref={ref} />
  }
)
export const TableDataCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...rest }, ref) => {
    return <td className={className} {...rest} ref={ref} />
  }
)

export const TableHeader = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ ...rest }, ref) => {
    return <thead {...rest} ref={ref} />
  }
)
export const TableHeaderCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...rest }, ref) => {
    return <th className={className} {...rest} ref={ref} />
  }
)

export const PackTable: FC<PackTableProps> = ({
  columns,
  decks,
  maxCardsCount,
  minCardsCount,
  searchQuery,
  tabValue,
}) => {
  const [sort, setSort] = useState<Sort>(null)
  const [deleteDecks, {}] = useDeleteDecksMutation()
  const dispatch = useDispatch()
  const filteredDecks = decks?.items
    ?.filter(
      item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(item => item.cardsCount >= minCardsCount || item.cardsCount >= maxCardsCount)

  const sortedDecks = filteredDecks?.sort((a, b) => {
    const aValue = a[sort?.key as keyof typeof a]
    const bValue = b[sort?.key as keyof typeof b]

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sort?.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sort?.direction === 'asc' ? aValue - bValue : bValue - aValue
    }

    if (sort?.key === 'createdBy') {
      const aAuthorName = a.author.name.toLowerCase()
      const bAuthorName = b.author.name.toLowerCase()

      return sort?.direction === 'asc'
        ? aAuthorName.localeCompare(bAuthorName)
        : bAuthorName.localeCompare(aAuthorName)
    }

    return 0
  })

  const onConfirmDeleteCallback = async (id: string, name: string) => {
    try {
      await deleteDecks(id).unwrap()
      dispatch(setModal({ modalID: null, variant: null }))
      toast.success(`deck: ${name} delete was successful`)
    } catch (e) {
      toast.error(`some error try again latter: ${e}`)
    }
  }

  return (
    <div className={s.container}>
      <Table className={s.table}>
        <HeaderTable columns={columns} onSort={setSort} sort={sort} />
        <TableBody>
          {sortedDecks?.map(item => {
            return (
              <TableRow key={item.id}>
                <TableDataCell className={`${s.tdc} ${s.unselectable} `}>
                  <div className={s.tdcImg}>
                    {item.cover && (
                      <img alt={'pack image.'} className={s.packImage} src={item.cover} />
                    )}
                    {item.name}
                  </div>
                </TableDataCell>
                <TableDataCell className={s.tdc}>{item.cardsCount}</TableDataCell>
                <TableDataCell className={s.tdc}>
                  {new Date(item.updated).toLocaleDateString()}
                </TableDataCell>
                <TableDataCell className={s.tdc}>{maxLengthStr(item.author.name)}</TableDataCell>
                <TableDataCell className={s.tdc}>
                  <div className={s.tbcIconContainer}>
                    <Link className={s.link} to={`/friend-pack/${item.id}`}>
                      <PlayIcon />
                    </Link>

                    {tabValue === 'myCards' && (
                      <div className={s.link}>
                        //TODO сравнить pack-table с другим проектом, и заменить все модалки
                        <Modal itemId={item.id} modalTitle={'Change card'} variant={'changeDeck'}>
                          <AddNewDeck
                            deckId={item.id}
                            image={item.cover}
                            isPrivate={item.isPrivate}
                            name={item.name}
                          />
                        </Modal>
                      </div>
                    )}
                    {tabValue === 'myCards' && (
                      <div className={s.link}>
                        <Modal itemId={item.id} modalTitle={'Delete deck'} variant={'question'}>
                          <ModalQuestion
                            item={item}
                            onConfirmDeleteCallback={onConfirmDeleteCallback}
                          />
                        </Modal>
                      </div>
                    )}
                  </div>
                </TableDataCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
