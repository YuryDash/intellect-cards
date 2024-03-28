import { ModalVariant } from '@/services/decks/decks.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type TabValue = 'allCards' | 'myCards'
type ModalID = null | string
const initialState = {
  addDeckName: '',
  authorId: '',
  currentPage: 1,
  editDeckName: '',
  itemsPerPage: 10,
  maxCardsCount: 10,
  minCardsCount: 0,
  modal: null as ModalVariant,
  modalID: null as ModalID,

  myCardsPage: {
    currentPage: '1',
    itemsPerPage: '10',
  },
  orderBy: 'updated-desc',
  searchByName: '',
  tabValue: 'allCards' as TabValue,
}

export const decksSlice = createSlice({
  initialState: initialState,
  name: 'decks',
  reducers: {
    setAuthorId: (state, action: PayloadAction<{ authorId: string }>) => {
      state.authorId = action.payload.authorId
    },
    setCardsByAuthor: (state, action: PayloadAction<{ tabValue: TabValue }>) => {
      state.tabValue = action.payload.tabValue
    },
    setCardsCount: (state, action: PayloadAction<number[]>) => {
      state.minCardsCount = action.payload[0]
      state.maxCardsCount = action.payload[1]
    },
    setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
      state.currentPage = action.payload.currentPage
    },
    setDeckName: (state, action: PayloadAction<{ name: string }>) => {
      state.addDeckName = action.payload.name
    },
    setEditDeckName: (state, action: PayloadAction<{ name: string }>) => {
      state.editDeckName = action.payload.name
    },
    setModal: (state, action: PayloadAction<{ modalID: null | string; variant: ModalVariant }>) => {
      state.modal = action.payload.variant
      state.modalID = action.payload.modalID
    },
    setSearchQuery: (state, action: PayloadAction<{ value: string }>) => {
      state.searchByName = action.payload.value
    },
  },
})

export const {
  setAuthorId,
  setCardsByAuthor,
  setCardsCount,
  setCurrentPage,
  setDeckName,
  setEditDeckName,
  setModal,
  setSearchQuery,
} = decksSlice.actions
