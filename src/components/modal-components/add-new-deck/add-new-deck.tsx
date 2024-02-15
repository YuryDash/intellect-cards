import { ChangeEvent, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { ControlledCheckbox } from '@/components/controlled/controlled-checkbox'
import { ButtonsModalGroup } from '@/components/modal-components/buttons-modal-group/buttons-modal-group'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { PictureIcon } from '@/icons/icon-components/picture'
import { useCreateDeckMutation } from '@/services/decks/decks.service'
import { setModal } from '@/services/decks/decks.slice'
import { CreateDeckArgs } from '@/services/decks/decks.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { any, boolean, string, z } from 'zod'

import s from './add-new-deck.module.scss'

const newDeckName = string()
  .min(3, 'Name must contain at least 3 character(s)')
  .max(30, 'Name must contain at most 30 character(s)')

const newDeckSchema = z.object({
  cover: any(),
  isPrivate: boolean(),
  name: newDeckName,
})

export type AddNewDeckFormSchema = z.infer<typeof newDeckSchema>

export const AddNewDeck = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AddNewDeckFormSchema>({
    defaultValues: {
      cover: '',
      isPrivate: false,
      name: '',
    },
    resolver: zodResolver(newDeckSchema),
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loadingError, setLoadingError] = useState('')
  const [selectedFile, setSelectedFile] = useState<FormData | null>(null)
  const [createDeck, {}] = useCreateDeckMutation()
  const onUploadButtonClick = () => {
    console.log(fileInputRef)
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const dispatch = useDispatch()
  const onCloseCallback = () => {
    dispatch(setModal({ openClose: false }))
  }
  const onSubmit = (data: any) => {
    const sendData: CreateDeckArgs = { ...data, cover: selectedFile }

    createDeck(sendData)
    toast.success('this is success detka')
    dispatch(setModal({ openClose: false }))
  }

  const onAddImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
    const formData = new FormData()

    formData.append('cover', cover)
    setSelectedFile(formData)
    toast.info(`add new file`)
  }

  if (loadingError) {
    toast.error(`Error: ${loadingError}`)
    setLoadingError('')
  }

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        errorMessage={errors.name?.message}
        {...register('name')}
        label={'Name Pack'}
        placeholder={'name'}
      />

      <div className={s.buttonMargin}>
        <Button fullWidth onClick={onUploadButtonClick} type={'button'} variant={'secondary'}>
          <PictureIcon size={18} />
          <span style={{ marginLeft: '6px' }}>Upload Image</span>
        </Button>
        <Controller
          control={control}
          name={'cover'}
          render={({ field }) => (
            <input
              {...field}
              onChange={onAddImageHandler}
              ref={fileInputRef}
              style={{ display: 'none' }}
              type={'file'}
            />
          )}
        />
      </div>

      <ControlledCheckbox control={control} label={'Private Pack'} name={'isPrivate'} />
      <ButtonsModalGroup onClose={onCloseCallback} />
    </form>
  )
}
