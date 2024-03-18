import { Author } from '@/services/auth/auth.types'

export type GetDesksResponse = {
  items: Deck[]
  maxCardsCount: number
  pagination: Pagination
}

export type Deck = {
  author: Author
  cardsCount: number
  cover: null | string
  created: string
  id: string
  isPrivate: boolean
  name: string
  rating?: number
  shots: number
  updated: string
  userId: string
}

export type ResponseGetDeckById = Omit<Deck, 'rating' | 'shots'>

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}

export type CreateDeckArgs = {
  cover: FormData | null
  isPrivate: boolean
  name: string
}

export type GetDeckByIdArgs = {
  cover?: string
  id?: string
  isPrivate?: boolean
  name?: string
}

export type ResponseGetDeckCardsById = {
  items: ResponseFriendCardItems[]
  pagination: Pagination
}

export type ResponseFriendCardItems = {
  answer: string
  answerImg?: any
  answerVideo?: any
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg?: any
  questionVideo?: any
  shots: number
  updated: string
  userId: string
}

export type GetDeckCardsByIdArgs = {
  answer?: string
  currentPage?: number
  id?: string
  itemsPerPage?: number
  orderBy?: string
  question?: string
}

export type SubmitGradeArgs = {
  cardId: string
  grade: number
  id: string
}

export type ModalVariant =
  | 'addCards'
  | 'addDeck'
  | 'changeDeck'
  | 'deleteInModal'
  | 'question'
  | null
