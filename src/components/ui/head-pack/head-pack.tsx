import { Modal } from '@/components/ui/modal/modal'
import { Typography } from '@/components/ui/typography'

import s from './head-pack.module.scss'

type Props = {
  title: string
}

export const HeadPack = ({ title }: Props) => {
  return (
    <div className={s.container}>
      <Typography variant={'h1'}>{title}</Typography>
      <Modal />
    </div>
  )
}
