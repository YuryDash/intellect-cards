import { BreadCrumbs } from '@/components/ui/bread-crumbs'
import { Page } from '@/components/ui/page/page'

import { Question } from './question'

export const QuestionPage = () => {
  return (
    <>
      <BreadCrumbs title={'Back to Decks List'} />
      <Page>
        <Question />
      </Page>
    </>
  )
}
