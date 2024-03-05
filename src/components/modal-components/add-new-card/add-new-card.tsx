import { ChangeEvent, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { ButtonsModalGroup } from '@/components/modal-components/buttons-modal-group/buttons-modal-group'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { PictureIcon } from '@/icons/icon-components/picture'
import { useCreateDeckMutation } from '@/services/decks/decks.service'
import { setModal } from '@/services/decks/decks.slice'
import { zodResolver } from '@hookform/resolvers/zod'
import { any, string, z } from 'zod'

import s from '../add-new-deck/add-new-deck.module.scss'

const newName = string()
  .min(3, 'Name must contain at least 3 character(s)')
  .max(30, 'Name must contain at most 30 character(s)')

const newCardSchema = z.object({
  coverAnswer: any(),
  coverQuestion: any(),
  nameAnswer: newName,
  nameQuestion: newName,
})

export type AddNewCardFormSchema = z.infer<typeof newCardSchema>

export const AddNewCard = () => {
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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loadingError, setLoadingError] = useState('')
  const [selectedFileQuestion, setSelectedFileQuestion] = useState<Blob | null>(null)
  const [selectedFileAnswer, setSelectedFileAnswer] = useState<Blob | null>(null)
  const [createDeck, {}] = useCreateDeckMutation()
  const onUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const dispatch = useDispatch()
  const onCloseCallback = () => {
    dispatch(setModal({ modalID: null, variant: null }))
  }
  const onSubmit = (data: any) => {
    const formData = new FormData()

    if (selectedFileQuestion) {
      formData.append('cover', selectedFileQuestion)
    }
    if (selectedFileAnswer) {
      formData.append('cover', selectedFileAnswer)
    }
    formData.append('name', data.name)
    formData.append('isPrivate', data.isPrivate)
    createDeck(formData)

    toast.success(`Deck: "${data.name}" is created`)
    dispatch(setModal({ modalID: null, variant: null }))
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

      <div className={s.buttonMargin}>
        <Button fullWidth onClick={onUploadButtonClick} type={'button'} variant={'secondary'}>
          <PictureIcon size={18} />
          <span style={{ marginLeft: '6px' }}>Upload Image</span>
        </Button>
        <Controller
          control={control}
          name={'coverQuestion'}
          render={({ field }) => (
            <input
              {...field}
              onChange={e => onAddImageHandler(e, false)}
              ref={fileInputRef}
              style={{ display: 'none' }}
              type={'file'}
            />
          )}
        />
      </div>

      <TextField
        errorMessage={errors.nameAnswer?.message}
        {...register('nameAnswer')}
        label={'Question'}
        placeholder={'Name'}
      />

      <div className={s.buttonMargin}>
        <Button fullWidth onClick={onUploadButtonClick} type={'button'} variant={'secondary'}>
          <PictureIcon size={18} />
          <span style={{ marginLeft: '6px' }}>Upload Image</span>
        </Button>
        <Controller
          control={control}
          name={'coverAnswer'}
          render={({ field }) => (
            <input
              {...field}
              onChange={e => onAddImageHandler(e, true)}
              ref={fileInputRef}
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
