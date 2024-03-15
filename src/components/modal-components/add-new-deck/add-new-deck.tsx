import { ChangeEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { ControlledCheckbox } from '@/components/controlled/controlled-checkbox'
import { ButtonsModalGroup } from '@/components/modal-components/buttons-modal-group/buttons-modal-group'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { PictureIcon } from '@/icons/icon-components/picture'
import { useCreateDeckMutation, useUpdateDecksByIdMutation } from '@/services/decks/decks.service'
import { setModal } from '@/services/decks/decks.slice'
import { zodResolver } from '@hookform/resolvers/zod'
import { any, boolean, string, z } from 'zod'

import s from './add-new-deck.module.scss'

const newDeckName = string()
  .min(3, 'Name must contain at least 3 charactepnpmr(s)')
  .max(30, 'Name must contain at most 30 character(s)')

const newDeckSchema = z.object({
  cover: any(),
  isPrivate: boolean(),
  name: newDeckName,
})

export type AddNewDeckFormSchema = z.infer<typeof newDeckSchema>

type Props = {
  deckId?: string
  image?: null | string
  isPrivate?: boolean
  name?: string
}

export const AddNewDeck = ({ deckId, image, isPrivate, name }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<AddNewDeckFormSchema>({
    defaultValues: {
      cover: image ? image : null,
      isPrivate: isPrivate ? isPrivate : false,
      name: name ? name : '',
    },
    resolver: zodResolver(newDeckSchema),
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loadingError, setLoadingError] = useState('')
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null)
  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDecksByIdMutation()
  const nameValue = watch('name', name)
  const [fileChanged, setFileChanged] = useState(false)
  const onUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const dispatch = useDispatch()
  const onCloseCallback = () => {
    dispatch(setModal({ modalID: null, variant: null }))
  }
  const onSubmit = (data: AddNewDeckFormSchema) => {
    if (!deckId) {
      const formData = new FormData()

      if (selectedFile) {
        formData.append('cover', selectedFile)
      }
      formData.append('name', data.name)
      formData.append('isPrivate', String(data.isPrivate))
      createDeck(formData)
      toast.success(`Deck: "${data.name}" is created`)
      dispatch(setModal({ modalID: null, variant: null }))
    } else {
      const formData = new FormData()

      if (fileChanged || data.name !== name) {
        if (selectedFile) {
          formData.append('cover', selectedFile)
        }
        formData.append('name', data.name)
        formData.append('isPrivate', String(data.isPrivate))

        updateDeck({ formData, id: deckId })
        toast.success(`Deck: "${data.name}" is updated`)
        dispatch(setModal({ modalID: null, variant: null }))
      } else {
        toast.warning(`WARN: values are not changed, please make changes`)
      }
    }
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
    setSelectedFile(cover)
    setFileChanged(true)
    toast.info(`INFO: you add new file`)
  }

  if (loadingError) {
    toast.error(`Error: ${loadingError}`)
    setLoadingError('')
  }

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        errorMessage={errors.name?.message}
        value={nameValue}
        {...register('name')}
        autoFocus
        label={'Name Pack'}
        placeholder={'name'}
      />

      {(selectedFile || image) && (
        <div className={s.imgContainerFile}>
          <img
            alt={'just img'}
            className={s.imgFile}
            src={selectedFile ? URL.createObjectURL(selectedFile) : image || ''}
          />
        </div>
      )}

      <div className={s.buttonMargin}>
        <Button fullWidth onClick={onUploadButtonClick} type={'button'} variant={'secondary'}>
          <PictureIcon size={18} />
          <span style={{ marginLeft: '6px' }}>Upload Image</span>
        </Button>
        <input
          onChange={onAddImageHandler}
          ref={fileInputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>

      <ControlledCheckbox control={control} label={'Private Pack'} name={'isPrivate'} />
      <ButtonsModalGroup
        confirm={() => {}}
        id={''}
        onClose={onCloseCallback}
        titleCloseButton={'Close'}
        titleConfirmButton={!deckId ? 'Add New Deck' : 'Update Deck'}
      />
    </form>
  )
}
