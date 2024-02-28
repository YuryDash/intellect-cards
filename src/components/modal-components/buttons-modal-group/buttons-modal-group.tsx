import { Button } from '@/components/ui/button'

import s from './buttons-modal-group.module.scss'

type PropsType = {
  onClose: () => void
  titleCloseButton: string
  titleConfirmButton: string
}

export const ButtonsModalGroup = ({ onClose, titleCloseButton, titleConfirmButton }: PropsType) => {
  return (
    <div className={s.buttonGroup}>
      <Button onClick={onClose} type={'button'} variant={'secondary'}>
        {titleCloseButton}
      </Button>
      <Button onClick={onClose} type={'submit'} variant={'primary'}>
        {titleConfirmButton}
      </Button>
    </div>
  )
}
