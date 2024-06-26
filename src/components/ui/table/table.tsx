import { ComponentProps, ComponentPropsWithoutRef } from 'react'

import s from './table.module.scss'

import { ArrowMiniDownIcon, ArrowMiniUpIcon } from '@/assets'

type TableProps = ComponentProps<'table'>
export const Table = ({ className, ...rest }: TableProps) => {
  return <table className={`${s.tableRoot} ${className}`} {...rest}></table>
}

export const TableHead = ({ ...rest }: ComponentProps<'thead'>) => {
  return <thead className={s.tHead} {...rest}></thead>
}

export const TableBody = ({ ...rest }: ComponentProps<'tbody'>) => {
  return <tbody {...rest}></tbody>
}
export const TableRow = ({ ...rest }: ComponentProps<'tr'>) => {
  return <tr className={s.tRow} {...rest}></tr>
}

export const TableData = ({ ...rest }: ComponentProps<'td'>) => {
  return <td className={s.tData} {...rest}></td>
}

export const TableHeaderData = ({ ...rest }: ComponentProps<'th'>) => {
  return <th className={s.thData} {...rest}></th>
}

export type Column = {
  key: string
  title: string
  sortable?: boolean
}

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export const TableHeader = ({
  columns,
  sort,
  onSort,
  ...restProps
}: Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    sort?: Sort
    onSort?: (sort: Sort) => void
  },
  'children'
>) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) return

    if (sort?.key !== key) return onSort({ key, direction: 'asc' })

    if (sort.direction === 'desc') return onSort(null)

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <TableHead {...restProps}>
      <TableRow>
        {columns.map(({ title, key, sortable = true }) => (
          <TableHeaderData
            key={key}
            onClick={handleSort(key, sortable)}
            style={{ height: '36px', overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', justifyContent: 'start', maxHeight: '24px' }}>
              {title}
              {sort && sort.key === key && (
                <span>
                  {sort.direction === 'asc' ? <ArrowMiniUpIcon /> : <ArrowMiniDownIcon />}
                </span>
              )}
            </div>
            {/*{sort && sort.key === key && <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>}*/}
          </TableHeaderData>
        ))}
      </TableRow>
    </TableHead>
  )
}
