import { Link } from 'react-router-dom'

import { Modal } from '@/components/modal-components/modal/modal'
import { ModalQuestion } from '@/components/modal-components/modal-question/modal-question'
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
import { EditIcon } from '@/icons'
import { tabValueSelector } from '@/services/decks/decks.select'
import { ResponseFriendCardItems } from '@/services/decks/decks.types'
import { useAppSelector } from '@/services/store'

import onlyTable from './friends-pack-table.module.scss'
import s from '@/components/packs/pack-table/pack-table.module.scss'

const columns: Column[] = [
  {
    key: 'question',
    size: '30%',
    title: 'Question',
  },
  {
    key: 'answer',
    size: '30%',
    title: 'Answer',
  },
  {
    key: 'updated',
    size: '20%',
    title: 'Last Updated',
  },
  {
    key: 'grade',
    size: '50%',
    title: 'Grade',
  },
  {
    key: '',
    title: '',
  },
]

type FriendTableProps = {
  cards?: ResponseFriendCardItems[]
  onConfirmDeleteCallback: (id: string, name: string) => void
  onSort?: (sort: Sort) => void
  sort: Sort
}

export const FriendsTable = (props: FriendTableProps) => {
  const { cards, onConfirmDeleteCallback, onSort, sort } = props
  const tabValue = useAppSelector(tabValueSelector)

  return (
    <div className={s.container}>
      <Table className={s.table}>
        <HeaderTable columns={columns} onSort={onSort} sort={sort} />
        <TableBody className={s.tr}>
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

              <TableDataCell className={`${s.tdc} ${s.unselectable} `}>
                <div className={s.tdcImg}>
                  {item.answerImg && (
                    <img alt={'pack image.'} className={s.packImage} src={item.answerImg} />
                  )}
                  <span className={onlyTable.linkName}>{maxLengthStr(item.answer, 25)}</span>
                </div>
              </TableDataCell>
              <TableDataCell className={s.tdc}>
                {new Date(item.updated).toLocaleDateString()}
              </TableDataCell>
              <TableDataCell className={s.tdc}>
                <Rating ratingValue={item.grade} />
              </TableDataCell>
              <TableDataCell className={s.tdc}>
                <div className={s.tbcIconContainer}>
                  {tabValue === 'myCards' && (
                    <Link className={s.link} to={''}>
                      <EditIcon />
                    </Link>
                  )}
                  {tabValue === 'myCards' && (
                    <div className={s.link}>
                      <Modal itemId={item.id} modalTitle={'Delete card'} variant={'question'}>
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
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
