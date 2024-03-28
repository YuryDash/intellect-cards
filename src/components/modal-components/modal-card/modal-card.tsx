import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { InputWithTypeFile } from '@/components/ui/input-with-type-file'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { useUpdateCardMutation } from '@/services/cards/cards.service'
import { useCreateCardMutation } from '@/services/decks/decks.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './modal-card.module.scss'

import { Modal } from '../modal/modal'

type Props = {
  answerImg?: string
  buttonTitle?: string
  cardId?: string
  id?: string
  isModalOpen: boolean
  questionImg?: string
  setIsModalOpen: (open: boolean) => void
  setValueAnswer?: Dispatch<SetStateAction<string>>
  setValueQuestion?: Dispatch<SetStateAction<string>>
  title?: string
  valueAnswer?: string
  valueQuestion?: string
}

type CardFormSchema = z.infer<typeof cardSchema>
const cardSchema = z.object({
  answer: z.string().nonempty().min(3).max(500),
  answerImg: z.any(),
  question: z.string().nonempty().min(3).max(500),
  questionImg: z.any(),
})

export const CardsModal = ({
  answerImg,
  buttonTitle,
  cardId,
  id,
  isModalOpen,
  questionImg,
  setIsModalOpen,
  setValueAnswer,
  setValueQuestion,
  title,
  valueAnswer,
  valueQuestion,
}: Props) => {
  const [questionPreview, setQuestionPreview] = useState('')
  const [answerPreview, setAnswerPreview] = useState('')
  const [answerImgError, setAnswerImgError] = useState('')
  const [questionImgError, setQuestionImgError] = useState('')
  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CardFormSchema>({ resolver: zodResolver(cardSchema) })

  const onCloseHandler = () => {
    reset()
    setQuestionPreview('')
    setAnswerPreview('')
    setQuestionImgError('')
    setAnswerImgError('')
    setIsModalOpen(false)
  }

  const onSubmit: SubmitHandler<CardFormSchema> = data => {
    const ID = id ? id : ''
    const cardID = cardId ? cardId : ''

    if (title === 'Edit Card') {
      updateCard({
        answer: data.answer,
        answerImg: !answerImgError && data.answerImg[0],
        id: ID,
        question: data.question,
        questionImg: !questionImgError && data.questionImg[0],
      })
        .unwrap()
        .then(() => {
          toast.success(`Your card updated successfully`)
        })
        .catch(e => {
          toast.error(e.data.message)
        })
    } else {
      createCard({
        answer: data.answer,
        answerImg: !answerImgError && data.answerImg[0],
        id: cardID,
        question: data.question,
        questionImg: !questionImgError && data.questionImg[0],
      })
        .unwrap()
        .then(() => {
          toast.success(`Your card created successfully`)
        })
        .catch(() => {
          toast.error('Something went wrong, try again')
        })
    }
    onCloseHandler()
  }

  const answerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueAnswer && setValueAnswer(e.currentTarget.value)
  }

  const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueQuestion && setValueQuestion(e.currentTarget.value)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const question = event.currentTarget.name === 'questionImg'
    const answer = event.currentTarget.name === 'answerImg'
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      question && setQuestionImgError('Only JPEG and PNG images are allowed.')
      answer && setAnswerImgError('Only JPEG and PNG images are allowed.')

      return
    }
    const maxSizeInBytes = 1024 * 1024

    if (file.size > maxSizeInBytes) {
      question && setQuestionImgError('The image size should not exceed 1MB.')
      answer && setAnswerImgError('The image size should not exceed 1MB.')

      return
    }

    question && setQuestionPreview(URL.createObjectURL(file))
    answer && setAnswerPreview(URL.createObjectURL(file))
    setQuestionImgError('')
    setAnswerImgError('')
  }

  const questionSrc = questionPreview || questionImg
  const answerSrc = answerPreview || answerImg

  return (
    <Modal isOpen={isModalOpen} onClose={onCloseHandler} showCloseButton title={title}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputs}>
          <InputWithTypeFile
            errorMessage={questionImgError}
            handleFileChange={handleImageChange}
            imageSrc={questionSrc}
            name={'questionImg'}
            register={register}
          />
          <TextField
            {...register('question')}
            errorMessage={errors.question?.message}
            label={'Question'}
            name={'question'}
            onChange={questionHandler}
            value={valueQuestion}
          />

          <InputWithTypeFile
            errorMessage={answerImgError}
            handleFileChange={handleImageChange}
            imageSrc={answerSrc}
            name={'answerImg'}
            register={register}
          />
          <TextField
            {...register('answer')}
            errorMessage={errors.answer?.message}
            label={'Answer'}
            name={'answer'}
            onChange={answerHandler}
            value={valueAnswer}
          />
        </div>
        <div className={s.buttons}>
          <Button onClick={onCloseHandler} type={'button'} variant={'secondary'}>
            <Typography as={'h4'} variant={'subtitle2'}>
              Cancel
            </Typography>
          </Button>

          <Button type={'submit'}>
            <Typography as={'h4'} variant={'subtitle2'}>
              {buttonTitle}
            </Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
