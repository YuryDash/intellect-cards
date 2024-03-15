export type Card = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type CreateCardArgs = {
  answer: string
  answerImg?: Blob | null
  answerVideo?: string
  id: string
  question: string
  questionImg?: Blob | null
  questionVideo?: string
}

export type GetCardsArgs = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: string
  question?: string
}
