import { ComponentPropsWithoutRef, ElementRef, forwardRef, useState } from 'react'

import { HeaderTable } from '@/feature/packs-list/pack-table/header-table'
import { useGetDecksQuery } from '@/services/base-api'

import s from './pack-table.module.scss'

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
    title: 'Created by',
  },
  {
    key: '',
    title: '',
  },
]

// const data: DataTypeRequest[] = [
//   {
//     cardsCount: 10,
//     createdBy: 'John Doe',
//     title: 'Project A',
//     updated: '2023-07-07',
//   },
//   {
//     cardsCount: 5,
//     createdBy: 'Jane Smith',
//     title: 'Project B',
//     updated: '2023-07-06',
//   },
//   {
//     cardsCount: 8,
//     createdBy: 'Alice Johnson',
//     title: 'Project C',
//     updated: '2023-07-05',
//   },
//   {
//     cardsCount: 3,
//     createdBy: 'Bob Anderson',
//     title: 'Project D',
//     updated: '2023-07-07',
//   },
//   {
//     cardsCount: 12,
//     createdBy: 'Emma Davis',
//     title: 'Project E',
//     updated: '2023-07-04',
//   },
// ]

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

export type Column = {
  key: string
  title: string
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

export const PackTable = () => {
  const [sort, setSort] = useState<Sort>(null)
  const { data } = useGetDecksQuery()

  return (
    <div className={s.container}>
      <Table className={s.table}>
        <HeaderTable columns={columns} onSort={setSort} sort={sort} />
        <TableBody>
          {data?.items.map(item => (
            <TableRow key={item.id}>
              <TableDataCell className={`${s.tdc} ${s.unselectable}`}>{item.name}</TableDataCell>
              <TableDataCell className={s.tdc}>{item.cardsCount}</TableDataCell>
              <TableDataCell className={s.tdc}>{item.updated}</TableDataCell>
              <TableDataCell className={s.tdc}>{item.author.name}</TableDataCell>
              <TableDataCell className={s.tdc}>some icons</TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
