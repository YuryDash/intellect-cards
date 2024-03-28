import { useState } from 'react'
import { Link } from 'react-router-dom'

import { DeleteItemModal } from '@/components/modal-components/delete-item-modal'
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
import { DeleteIcon, EditIcon } from '@/icons'
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
  const { cards, onSort, sort } = props
  const tabValue = useAppSelector(tabValueSelector)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [cardId, setCardId] = useState('')
  const [question, setQuestion] = useState('')

  const deleteHandler = (cardId: string, question: string) => {
    setIsModalDeleteOpen(true)
    setCardId(cardId)
    setQuestion(question)
  }

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
                    <DeleteIcon onClick={() => deleteHandler(item.id, item.question)} />
                  )}
                </div>
              </TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteItemModal
        cardName={question}
        id={cardId}
        isModalOpen={isModalDeleteOpen}
        setIsModalOpen={setIsModalDeleteOpen}
        title={'Delete Card'}
      />
    </div>
  )
}
