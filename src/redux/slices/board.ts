import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { RootState } from "../store"

type BoardState = {
  name: string
  columns: Column[]
}

type Column = {
  id: string
  name: string
  cards: Card[]
}

type Card = {
  id: string
  title: string
  description?: string
  // We just change position instead of having to delete/add a
  // card from an array every time it is moved and map by
  // asc position.
  position: number
  // This makes it easier to move from column to column.
  // Would normally have this field if this was stored in a db.
  columnId: string
}

const initialState: BoardState = {
  columns: [],
  name: "",
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoardName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    addColumn: (state) => {
      const column: Column = {
        id: uuidv4(),
        name: "Add a name",
        cards: [],
      }
      state.columns.push(column)
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      const index = state.columns.findIndex((col) => col.id === action.payload)

      if (index === -1) return

      state.columns.splice(index, 1)
    },
    editColumnName: (
      state,
      action: PayloadAction<{ name: string; id: string }>
    ) => {
      const column = state.columns.find((col) => col.id === action.payload.id)

      if (!column) return

      column.name = action.payload.name
    },
    moveColumn: (
      state,
      action: PayloadAction<{ id: string; newPosition: number }>
    ) => {
      const { newPosition, id } = action.payload
      if (newPosition < 0 || newPosition > state.columns.length + 1) return

      const oldPosition = state.columns.findIndex((col) => col.id === id)

      if (oldPosition === -1) return

      const column = state.columns[oldPosition]

      state.columns.splice(oldPosition, 1)
      state.columns.splice(newPosition, 0, column)
    },
    addCard: (state, action: PayloadAction<string>) => {
      const column = state.columns.find((col) => col.id === action.payload)

      if (!column) return

      const card: Card = {
        id: uuidv4(),
        title: "Add a title",
        columnId: action.payload,
        position: column.cards.length,
      }

      column.cards.push(card)
    },
    editCard: (
      state,
      action: PayloadAction<{
        columnId: string
        cardId: string
        title?: string
        description?: string
      }>
    ) => {
      const { columnId, cardId, ...rest } = action.payload
      const column = state.columns.find((col) => col.id === columnId)

      if (!column) return

      let card = column.cards.find((card) => card.id === cardId)

      if (!card) return

      card = { ...card, ...rest }
    },
    deleteCard: (
      state,
      action: PayloadAction<{ columnId: string; cardId: string }>
    ) => {
      const { columnId, cardId } = action.payload

      const column = state.columns.find((col) => col.id === columnId)

      if (!column) return
      column.cards = column.cards.filter((c) => c.id !== cardId)
    },
    moveCard: (
      state,
      action: PayloadAction<{
        columnId: string
        cardId: string
        position: number
      }>
    ) => {
      const { columnId, cardId, position } = action.payload
      // Unfortunately had to do this because cards are
      // only a subfield.
      // Would be easier in a db since you'd just search for the card directly.
      // Easier to deal with cards this way though than make asyncThunks for all
      // of its actions.
      let card: Card | null = null
      for (let col of state.columns) {
        for (let c of col.cards) {
          if (c.id === cardId) {
            card = c
          }
        }
      }
      if (!card) return
      // Means you are moving the card to a new column.
      if (card.columnId !== columnId) {
        // get old and new column.
        const currentColumn = state.columns.find(
          (col) => col.id === card!.columnId
        )
        const newColumn = state.columns.find((col) => col.id === columnId)
        if (!currentColumn || !newColumn) return

        if (position < 0 || position > newColumn.cards.length + 1) return

        // remove card from currentColumn.
        currentColumn.cards = currentColumn.cards.filter(
          (c) => c.id !== card!.id
        )

        // change position and columnId
        card.position = position
        card.columnId = newColumn.id
        // add card into new column
        newColumn.cards.push(card)
      } else {
        // moving inside same column.
        const column = state.columns.find((col) => col.id === card!.columnId)

        if (!column) return

        if (position < 0 || position > column.cards.length + 1) return

        // set new position.
        card.position = position
      }
    },
  },
})

export const {
  addColumn,
  deleteColumn,
  editColumnName,
  moveColumn,
  addCard,
  editCard,
  moveCard,
  deleteCard,
  addBoardName,
} = boardSlice.actions

export const selectBoard = (state: RootState) => state.board

export const selectColumns = (state: RootState) => state.board.columns

export default boardSlice.reducer
