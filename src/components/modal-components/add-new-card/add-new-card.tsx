import { ChangeEvent, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { ButtonsModalGroup } from '@/components/modal-components/buttons-modal-group/buttons-modal-group'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { PictureIcon } from '@/icons/icon-components/picture'
import { useCreateCardMutation } from '@/services/decks/decks.service'
import { setModal } from '@/services/decks/decks.slice'
import { zodResolver } from '@hookform/resolvers/zod'
import { any, string, z } from 'zod'

import s from '../add-new-deck/add-new-deck.module.scss'

const strValidation = (value: 'Answer' | 'Name') => {
  return string()
    .min(3, `${value} must contain at least 3 character(s)`)
    .max(300, `${value} must contain at most 300 character(s)`)
}

const newCardSchema = z.object({
  coverAnswer: any(),
  coverQuestion: any(),
  nameAnswer: strValidation('Answer'),
  nameQuestion: strValidation('Name'),
})

export type AddNewCardFormSchema = z.infer<typeof newCardSchema>

type Props = {
  cardId: string
  deckId: string
  title: string
}

export const AddNewCard = ({ cardId, deckId, title }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AddNewCardFormSchema>({
    defaultValues: {
      coverAnswer: '',
      coverQuestion: '',
      nameAnswer: '',
      nameQuestion: '',
    },
    resolver: zodResolver(newCardSchema),
  })
  const fileQuestionRef = useRef<HTMLInputElement>(null)
  const fileAnswerRef = useRef<HTMLInputElement>(null)
  const [loadingError, setLoadingError] = useState('')
  const [selectedFileQuestion, setSelectedFileQuestion] = useState<Blob | null>(null)
  const [selectedFileAnswer, setSelectedFileAnswer] = useState<Blob | null>(null)
  const [createCard] = useCreateCardMutation()

  const onUploadButtonClick = (question: boolean) => {
    question && fileQuestionRef.current && fileQuestionRef.current.click()
    !question && fileAnswerRef.current && fileAnswerRef.current.click()
  }

  const dispatch = useDispatch()
  const onCloseCallback = () => {
    dispatch(setModal({ modalID: null, variant: null }))
  }

  const updateCard = (...args: any) => {
    return args
  }

  const onSubmit: SubmitHandler<AddNewCardFormSchema> = data => {
    if (title === 'Edit Card') {
      updateCard({
        answer: data.nameAnswer,
        answerImg: !loadingError && data.coverAnswer[0],
        id: cardId,
        question: data.nameQuestion,
        questionImg: !loadingError && data.coverQuestion[0],
      })
        .unwrap()
        .then(() => {
          toast.success(`Your card has been successfully updated.`)
        })
        .catch((e: any) => {
          toast.error(e.data.message)
        })
    } else {
      createCard({
        answer: data.nameAnswer,
        answerImg: selectedFileAnswer,
        id: deckId,
        question: data.nameQuestion,
        questionImg: selectedFileQuestion,
      })
        .unwrap()
        .then(() => {
          toast.success(`Your card has been successfully created.`)
          dispatch(setModal({ modalID: null, variant: null }))
        })
        .catch(err => toast.error(err))
    }
  }

  const onAddImageHandler = (e: ChangeEvent<HTMLInputElement>, question: boolean) => {
    const cover = e.target.files?.[0]
    const allowedTypes = ['image/jpeg', 'image/png']
    const maxSizeInBytes = 1024 * 1024

    if (!cover) {
      setLoadingError('No file selected.')

      return
    }

    if (!allowedTypes.includes(cover.type)) {
      setLoadingError('We only accept images in JPEG and PNG formats.')

      return
    }

    if (cover.size > maxSizeInBytes) {
      setLoadingError('Please ensure the image does not exceed a size of 1MB.')

      return
    }
    if (question) {
      setSelectedFileQuestion(cover)
      toast.info(`add new file for question card`)
    } else {
      setSelectedFileAnswer(cover)
      toast.info(`add new file for answer card`)
    }
  }

  if (loadingError) {
    toast.error(`Error: ${loadingError}`)
    setLoadingError('')
  }

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        errorMessage={errors.nameQuestion?.message}
        {...register('nameQuestion')}
        label={'Question'}
        placeholder={'Name'}
      />
      {selectedFileQuestion && (
        <div className={s.imgContainerFile}>
          <img
            alt={'just question img'}
            className={s.imgFile}
            src={selectedFileQuestion ? URL.createObjectURL(selectedFileQuestion) : ''}
          />
        </div>
      )}

      <div className={s.buttonMargin}>
        <Button
          fullWidth
          onClick={() => onUploadButtonClick(true)}
          type={'button'}
          variant={'secondary'}
        >
          <PictureIcon size={18} />
          <span style={{ marginLeft: '6px' }}>Upload Image</span>
        </Button>
        <Controller
          control={control}
          name={'coverQuestion'}
          render={({ field }) => (
            <input
              {...field}
              onChange={e => onAddImageHandler(e, true)}
              ref={fileQuestionRef}
              style={{ display: 'none' }}
              type={'file'}
            />
          )}
        />
      </div>

      <TextField
        errorMessage={errors.nameAnswer?.message}
        {...register('nameAnswer')}
        label={'Answer'}
        placeholder={'Name'}
      />
      {selectedFileAnswer && (
        <div className={s.imgContainerFile}>
          <img
            alt={'just question img'}
            className={s.imgFile}
            src={selectedFileAnswer ? URL.createObjectURL(selectedFileAnswer) : ''}
          />
        </div>
      )}
      <div className={s.buttonMargin}>
        <Button
          fullWidth
          onClick={() => onUploadButtonClick(false)}
          type={'button'}
          variant={'secondary'}
        >
          <PictureIcon size={18} />
          <span style={{ marginLeft: '6px' }}>Upload Image</span>
        </Button>
        <Controller
          control={control}
          name={'coverAnswer'}
          render={({ field }) => (
            <input
              {...field}
              onChange={e => onAddImageHandler(e, false)}
              ref={fileAnswerRef}
              style={{ display: 'none' }}
              type={'file'}
            />
          )}
        />
      </div>

      <ButtonsModalGroup
        confirm={() => {}}
        id={'123123'}
        onClose={onCloseCallback}
        titleCloseButton={'Close'}
        titleConfirmButton={'Add New Card'}
      />
    </form>
  )
}
