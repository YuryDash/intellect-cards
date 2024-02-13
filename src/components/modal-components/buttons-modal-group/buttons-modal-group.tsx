import { Button } from '@/components/ui/button'

import s from './buttons-modal-group.module.scss'

type PropsType = {
  onClose: () => void
}

export const ButtonsModalGroup = ({ onClose }: PropsType) => {
  return (
    <div className={s.buttonGroup}>
      <Button onClick={onClose} type={'button'} variant={'secondary'}>
        Cancel
      </Button>
      <Button type={'submit'} variant={'primary'}>
        Add New Pack
      </Button>
    </div>
  )
}
