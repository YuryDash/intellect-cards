import { baseApi } from '@/services/base-api'
import { Card, CreateCardArgs } from '@/services/cards/cards.type'
import { Deck } from '@/services/decks/decks.types'

export const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCard: builder.mutation<void, string>({
        invalidatesTags: ['Cards', 'Decks'],
        query: (...id) => {
          return {
            body: {},
            method: 'DELETE',
            url: `v1/cards/${id}`,
          }
        },
      }),
      getCards: builder.query<Card, { id: string }>({
        query: id => {
          return {
            body: {},
            url: `v1/cards/${id}`,
          }
        },
      }),
      updateCard: builder.mutation<Deck, CreateCardArgs & { id: string }>({
        query: ({ id, ...body }) => {
          return {
            body,
            method: 'PATCH',
            url: `v1/cards/${id}`,
          }
        },
      }),
    }
  },
})

export const { useDeleteCardMutation, useGetCardsQuery, useUpdateCardMutation } = cardsService
