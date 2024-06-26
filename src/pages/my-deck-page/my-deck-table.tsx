import { useState } from 'react'

import s from './my-deck-page.module.scss'

import { DeleteIcon, EditIcon } from '@/assets'
import {
  Column,
  Sort,
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
  Typography,
} from '@/components'
import { CardsModal, DeleteItemModal, Grade } from '@/pages'
import { Card } from '@/services'

type MyDeckTableProps = {
  cards?: Card[]
  sort: Sort
  setSort: (sort: Sort) => void
  id?: string
}

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
  {
    key: 'actions',
    title: '',
  },
]

export const MyDeckTable = ({ cards, sort, setSort, id }: MyDeckTableProps) => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [cardId, setCardId] = useState('')
  const [question, setQuestion] = useState('')
  const [valueAnswer, setValueAnswer] = useState('')
  const [valueQuestion, setValueQuestion] = useState('')
  const [questionImg, setQuestionImg] = useState('')
  const [answerImg, setAnswerImg] = useState('')

  const editHandler = (
    cardId: string,
    cardAnswer: string,
    cardQuestion: string,
    questionImg: string,
    answerImg: string
  ) => {
    setIsModalEditOpen(true)
    setCardId(cardId)
    setValueAnswer(cardAnswer)
    setValueQuestion(cardQuestion)
    setQuestionImg(questionImg)
    setAnswerImg(answerImg)
  }

  const deleteHandler = (cardId: string, question: string) => {
    setIsModalDeleteOpen(true)
    setCardId(cardId)
    setQuestion(question)
  }

  return (
    <Table>
      <TableHeader columns={columns} sort={sort} onSort={setSort} />
      <TableBody>
        {cards?.map(card => {
          return (
            <TableRow key={card.id}>
              <TableData style={{ width: '30%' }}>
                <div className={s.tableData}>
                  {card.questionImg && (
                    <img className={s.cardImage} src={card.questionImg} alt="pack image" />
                  )}
                  <Typography className={s.tableText} as={'p'} variant={'body2'}>
                    {card.question}
                  </Typography>
                </div>
              </TableData>
              <TableData style={{ width: '30%' }}>
                <div className={s.tableData}>
                  {card.answerImg && (
                    <img className={s.cardImage} src={card.answerImg} alt="pack image" />
                  )}
                  <Typography className={s.tableText} as={'p'} variant={'body2'}>
                    {card.answer}
                  </Typography>
                </div>
              </TableData>
              <TableData style={{ width: '20%' }}>
                <Typography as={'p'} variant={'body2'}>
                  {new Date(card.updated).toLocaleDateString('en-GB')}
                </Typography>
              </TableData>
              <TableData style={{ width: '20%' }}>
                <Grade grade={card.grade} />
              </TableData>
              <TableData>
                <div className={s.editButtons}>
                  <button
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      editHandler(
                        card.id,
                        card.answer,
                        card.question,
                        card.questionImg,
                        card.answerImg
                      )
                    }
                  >
                    <EditIcon />
                  </button>
                  <button
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteHandler(card.id, card.question)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </TableData>
            </TableRow>
          )
        })}
      </TableBody>
      <CardsModal
        title={'Edit Card'}
        buttonTitle={'Save Changes'}
        setIsModalOpen={setIsModalEditOpen}
        isModalOpen={isModalEditOpen}
        id={id}
        cardId={cardId}
        valueAnswer={valueAnswer}
        valueQuestion={valueQuestion}
        questionImg={questionImg}
        answerImg={answerImg}
        setValueAnswer={setValueAnswer}
        setValueQuestion={setValueQuestion}
      />
      <DeleteItemModal
        isModalOpen={isModalDeleteOpen}
        setIsModalOpen={setIsModalDeleteOpen}
        id={cardId}
        title={'Delete Card'}
        cardName={question}
      />
    </Table>
  )
}
