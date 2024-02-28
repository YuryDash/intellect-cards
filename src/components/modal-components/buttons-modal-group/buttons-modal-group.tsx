import { Button } from '@/components/ui/button'

import s from './buttons-modal-group.module.scss'

type PropsType = {
  confirm: (id: string) => void
  id: string
  onClose: () => void
  titleCloseButton: string
  titleConfirmButton: string
}

export const ButtonsModalGroup = ({
  confirm,
  id,
  onClose,
  titleCloseButton,
  titleConfirmButton,
}: PropsType) => {
  return (
    <div className={s.buttonGroup}>
      <Button onClick={onClose} type={'button'} variant={'secondary'}>
        {titleCloseButton}
      </Button>
      <Button onClick={() => confirm(id)} type={'submit'} variant={'primary'}>
        {titleConfirmButton}
      </Button>
    </div>
  )
}
