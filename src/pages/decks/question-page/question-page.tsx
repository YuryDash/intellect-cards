import { useParams } from 'react-router-dom'

import { BreadCrumbs } from '@/components/ui/bread-crumbs'
import { Page } from '@/components/ui/page/page'
import { useGetDeckByIdQuery } from '@/services/decks/decks.service'

import { Question } from './question'

export const QuestionPage = () => {
  const { id } = useParams()
  const { data } = useGetDeckByIdQuery({ id })

  return (
    <>
      <BreadCrumbs backTo={`/friend-pack/${data?.id}`} title={'Back to Cards'} />
      <Page>
        <Question />
      </Page>
    </>
  )
}
