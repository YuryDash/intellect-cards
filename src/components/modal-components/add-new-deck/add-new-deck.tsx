import { ChangeEvent, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { EditProfileFormSchema } from '@/components/auth/edit-profile'
import { ControlledCheckbox } from '@/components/controlled/controlled-checkbox'
import { ButtonsModalGroup } from '@/components/modal-components/buttons-modal-group/buttons-modal-group'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { PictureIcon } from '@/icons/icon-components/picture'
import loginPage from '@/pages/auth/login-page/login-page'
import { setModal } from '@/services/decks/decks.slice'
import { zodResolver } from '@hookform/resolvers/zod'
import { any, boolean, string, z } from 'zod'

import s from './add-new-deck.module.scss'

const newDeckName = string()
  .min(3, 'Name must contain at least 3 character(s)')
  .max(30, 'Name must contain at most 30 character(s)')

const newDeckSchema = z.object({
  file: any(),
  newDeckName: newDeckName,
  privateDeck: boolean(),
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
      file: '',
      newDeckName: '',
      privateDeck: false,
    },
    resolver: zodResolver(newDeckSchema),
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loadingError, setLoadingError] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
    console.log(data)
    console.log(selectedFile)
    dispatch(setModal({ openClose: false }))
  }

  const onAddImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const allowedTypes = ['image/jpeg', 'image/png']
    const maxSizeInBytes = 1024 * 1024

    if (!file) {
      setLoadingError('No file selected.')

      return
    }

    if (!allowedTypes.includes(file.type)) {
      setLoadingError('We only accept images in JPEG and PNG formats.')

      return
    }

    if (file.size > maxSizeInBytes) {
      setLoadingError('Please ensure the image does not exceed a size of 1MB.')

      return
    }

    // If the file is valid, set its value in the form
    setSelectedFile(file)
  }

  if (loadingError) {
    toast.error(`Error: ${loadingError}`)
    setLoadingError('')
  }

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        errorMessage={errors.newDeckName?.message}
        {...register('newDeckName')}
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
          name={'file'}
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

      <ControlledCheckbox control={control} label={'Private Pack'} name={'privateDeck'} />
      <ButtonsModalGroup onClose={onCloseCallback} />
    </form>
  )
}
