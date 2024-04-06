import s from './something-wrong.module.scss'

import avatarIcon from '@/assets/avatarIcon.png'
import { Typography } from '@/components'

export const SomethingWrong = () => {
  return (
    <div className={s.container}>
      <img className={s.icon} src={`.${avatarIcon}`} alt={'sad face'} />
      <Typography variant={'h1'}>Oops, something went wrong. Please try again.</Typography>
    </div>
  )
}
