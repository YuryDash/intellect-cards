import { baseApi } from '@/services/base-api'
import { Card, CreateCardArgs, GetCardsArgs } from '@/services/cards/cards.type'
import {
  Deck,
  GetDeckByIdArgs,
  GetDeckCardsByIdArgs,
  GetDecksArgs,
  GetDesksResponse,
  ResponseGetDeckById,
  ResponseGetDeckCardsById,
  SubmitGradeArgs,
} from '@/services/decks/decks.types'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Card, CreateCardArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...args }) => {
          const { answer, answerImg, question, questionImg } = args
          const formData = new FormData()

          answerImg && formData.append('answerImg', answerImg)
          formData.append('answer', answer)
          questionImg && formData.append('questionImg', questionImg)
          formData.append('question', question)

          return { body: formData, method: 'POST', url: `v1/decks/${id}/cards` }
        },
      }),

      createDeck: builder.mutation<Deck, FormData>({
        invalidatesTags: ['Decks'],
        query: body => {
          return {
            body,
            method: 'POST',
            url: `v1/decks`,
          }
        },
      }),
      deleteDecks: builder.mutation<Omit<Deck, 'author'>, string>({
        invalidatesTags: ['Decks'],
        query: id => {
          return {
            method: 'DELETE',
            url: `v1/decks/${id}`,
          }
        },
      }),
      getCards: builder.query<Omit<GetDesksResponse, 'maxCardsCount'>, GetCardsArgs>({
        providesTags: ['Decks', 'Cards'],
        query: params => {
          return {
            url: `v1/decks/${params.id}/cards`,
          }
        },
      }),
      //getDeckById 'ONLY FOR USSeR NAME'
      getDeckById: builder.query<ResponseGetDeckById, GetDeckByIdArgs>({
        providesTags: ['Decks'],
        query: ({ id, ...args }) => {
          return { method: 'GET', params: { ...args }, url: `v1/decks/${id}` }
        },
      }),
      getDeckCardsById: builder.query<ResponseGetDeckCardsById, GetDeckCardsByIdArgs>({
        providesTags: ['Decks', 'Cards'],
        query: ({ id, ...args }) => {
          return { method: 'GET', params: { ...args }, url: `v1/decks/${id}/cards` }
        },
      }),

      getDecks: builder.query<GetDesksResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: params => {
          return {
            params: params ?? {},
            url: `v1/decks/`,
          }
        },
      }),

      getLearnCards: builder.query<Card, { id: string; previousCardId?: string }>({
        providesTags: ['Learn'],
        query: params => {
          return {
            url: `v1/decks/${params.id}/learn`,
          }
        },
      }),

      submitGrade: builder.mutation<void, SubmitGradeArgs>({
        invalidatesTags: ['Learn', 'Decks'],
        query: ({ id, ...body }) => {
          return {
            body,
            method: 'POST',
            url: `v1/decks/${id}/learn`,
          }
        },
      }),
      updateDecksById: builder.mutation<Deck, { formData: FormData; id: string }>({
        invalidatesTags: ['Decks'],
        query: ({ formData, id }) => {
          return {
            body: formData,
            method: 'PATCH',
            url: `v1/decks/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteDecksMutation,
  useGetCardsQuery,
  useGetDeckByIdQuery,
  useGetDeckCardsByIdQuery,
  useGetDecksQuery,
  useGetLearnCardsQuery,
  useSubmitGradeMutation,
  useUpdateDecksByIdMutation,
} = decksService
