import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { ControlledCheckbox } from '@/components/controlled/controlled-checkbox'
import { Modal } from '@/components/modal-components/modal/modal'
import { Button } from '@/components/ui/button'
import { InputWithTypeFile } from '@/components/ui/input-with-type-file'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'
import { useCreateDeckMutation, useUpdateDecksByIdMutation } from '@/services/decks/decks.service'
import { setCurrentPage, setDeckName, setEditDeckName } from '@/services/decks/decks.slice'
import { useAppSelector } from '@/services/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './deck-modal.module.scss'

type EditModalProps = {
  buttonTitle: string
  deckCover?: null | string | undefined
  deckName?: string
  id?: string
  isModalOpen: boolean
  modalTitle: string
  setModalOpen: (isOpen: boolean) => void
}

export type PackFormSchema = z.infer<typeof packSchema>
export const packSchema = z.object({
  cover: z.any(),
  isPackPrivate: z.boolean().default(false),
  name: z.string().nonempty().min(3).max(30),
})

export const ModalDeck = ({
  buttonTitle,
  deckCover,
  id,
  isModalOpen,
  modalTitle,
  setModalOpen,
}: EditModalProps) => {
  const { addDeckName, editDeckName } = useAppSelector(state => state.decks)
  const dispatch = useDispatch()
  const [coverPreview, setCoverPreview] = useState('')
  const [coverError, setCoverError] = useState('')

  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDecksByIdMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<PackFormSchema>({ resolver: zodResolver(packSchema) })

  const onCloseHandler = () => {
    reset()
    setCoverPreview('')
    setCoverError('')
    setModalOpen(false)
  }

  const onSubmit: SubmitHandler<PackFormSchema> = data => {
    const formData = new FormData()
    const isPackPrivate = data.isPackPrivate ? 'true' : 'false'

    !coverError && formData.append('cover', data.cover[0])
    formData.append('name', data.name)
    formData.append('isPrivate', isPackPrivate)

    if (modalTitle === 'Add New Pack') {
      createDeck(formData)
        .unwrap()
        .then(data => {
          toast.success(`Pack ${data.name} created successfully`)
          dispatch(setCurrentPage({ currentPage: 1 }))
        })
        .catch(() => {
          toast.error('Something went wrong, try again')
        })
      dispatch(setDeckName({ name: '' }))
    } else {
      updateDeck({
        cover: data.cover[0] || '',
        id: id || '',
        isPrivate: data.isPackPrivate,
        name: data.name,
      })
        .unwrap()
        .then(data => {
          toast.success(`Pack ${data.name} updated successfully`)
        })
        .catch(e => {
          toast.error(e.data.message)
        })
    }
    onCloseHandler()
  }

  const inputValue = modalTitle === 'Add New Pack' ? addDeckName : editDeckName

  const setEditName = (e: ChangeEvent<HTMLInputElement>) => {
    if (modalTitle === 'Add New Pack') {
      dispatch(setDeckName({ name: e.currentTarget.value }))
    } else {
      dispatch(setEditDeckName({ name: e.currentTarget.value }))
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      setCoverError('Only JPEG and PNG images are allowed.')

      return
    }
    const maxSizeInBytes = 1024 * 1024

    if (file.size > maxSizeInBytes) {
      setCoverError('The image size should not exceed 1MB.')

      return
    }

    setCoverPreview(URL.createObjectURL(file))
    setCoverError('')
  }

  const imgSrc = coverPreview || deckCover

  return (
    <Modal isOpen={isModalOpen} onClose={onCloseHandler} showCloseButton title={modalTitle}>
      <form className={s.modalForm} onSubmit={handleSubmit(onSubmit)}>
        <InputWithTypeFile
          errorMessage={coverError}
          //handleFileChange={handleFileChange}
          handleFileChange={handleImageChange}
          imageSrc={imgSrc}
          name={'cover'}
          register={register}
        />

        <TextField
          className={s.addInput}
          label={'Name Pack'}
          {...register('name')}
          errorMessage={errors.name?.message}
          onChange={setEditName}
          value={inputValue}
        />

        <ControlledCheckbox control={control} label={'Private pack'} name={'isPackPrivate'} />

        <div className={s.modalButtons}>
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
