import { Button } from '@/components/ui/button'
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import s from './modal.module.scss'

export const Modal = () => (
  <Root>
    <Trigger asChild>
      <Button classes={'Button'} variant={'primary'}>
        Add new Pack
      </Button>
    </Trigger>
    <Portal>
      <Overlay className={s.DialogOverlay} />
      <Content className={s.DialogContent}>
        <Title className={s.DialogTitle}>Edit profile</Title>
        <Description className={s.DialogDescription}>
          Make changes to your profile here. Click save when you're done.
        </Description>
        <fieldset className={s.Fieldset}>
          <label className={s.Label} htmlFor={'name'}>
            Name
          </label>
          <input className={s.Input} defaultValue={'Pedro Duarte'} id={'name'} />
        </fieldset>
        <fieldset className={s.Fieldset}>
          <label className={s.Label} htmlFor={'username'}>
            Username
          </label>
          <input className={s.Input} defaultValue={'@peduarte'} id={'username'} />
        </fieldset>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}>
          <Close asChild>
            <button className={s.ButtonGreen}>Save changes</button>
          </Close>
        </div>
        <Close asChild>
          <button aria-label={'Close'} className={s.IconButton}>
            <Cross2Icon />
          </button>
        </Close>
      </Content>
    </Portal>
  </Root>
)
