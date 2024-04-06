import { Link } from 'react-router-dom'

import s from './error-page.module.scss'

import { ErrorImg } from '@/assets'
import { Button, Typography } from '@/components'

export const ErrorPage = () => {
  return (
    <div className={s.errorContainer}>
      <ErrorImg className={s.errorImg} />
      <Typography className={s.errorText} as={'div'} variant={'body1'}>
        Sorry! Page not found!
      </Typography>
      <Button>
        <Typography className={s.errorLink} as={Link} to={'/'} variant={'subtitle2'}>
          Back to home page
        </Typography>
      </Button>
    </div>
  )
}
