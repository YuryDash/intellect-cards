import {
  Column,
  Sort,
  Table,
  TableBody,
  TableDataCell,
  TableRow,
} from '@/components/packs/pack-table'
import { HeaderTable } from '@/components/packs/pack-table/header-table'
import { Rating } from '@/components/ui/rating/rating'
import { maxLengthStr } from '@/helpers/maxLengthStr'
import { ResponseFriendCardItems } from '@/services/decks/decks.types'

import onlyTable from './friends-pack-table.module.scss'
import s from '@/components/packs/pack-table/pack-table.module.scss'

const columns: Column[] = [
  {
    key: 'question',
    title: 'Question',
  },
  {
    key: 'answer',
    title: 'Answer',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'grade',
    title: 'Grade',
  },
]

type FriendTableProps = {
  cards?: ResponseFriendCardItems[]
  onSort?: (sort: Sort) => void
  sort: Sort
}

export const FriendsTable = (props: FriendTableProps) => {
  const { cards, onSort, sort } = props

  return (
    <div className={s.container}>
      <Table className={s.table}>
        <HeaderTable columns={columns} onSort={onSort} sort={sort} />
        <TableBody>
          {cards?.map(item => (
            <TableRow key={item.id}>
              <TableDataCell className={`${s.tdc} ${s.unselectable} `}>
                <div className={s.tdcImg}>
                  {item.questionImg && (
                    <img alt={'pack image.'} className={s.packImage} src={item.questionImg} />
                  )}
                  <span className={onlyTable.linkName}>{maxLengthStr(item.question, 25)}</span>
                </div>
              </TableDataCell>
              <TableDataCell className={s.tdc}>
                <div>{maxLengthStr(item.answer, 25)}</div>
              </TableDataCell>
              <TableDataCell className={s.tdc}>
                {new Date(item.updated).toLocaleDateString()}
              </TableDataCell>
              <TableDataCell className={s.tdc}>
                <Rating ratingValue={item.grade} />
              </TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
