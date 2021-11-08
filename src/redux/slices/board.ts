import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { RootState } from "../store"
import { Column, Card } from "../types"

type BoardState = {
  name: string
  columns: Column[]
}

const initialState: BoardState = {
  columns: [],
  name: "So cool",
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
        position: state.columns.length,
        cards: [],
      }
      state.columns.push(column)
    },
    deleteColumn: (state, action: PayloadAction<string>) => {
      const index = state.columns.findIndex((col) => col.id === action.payload)

      if (index === -1) return

      // get all the cards of the column and move them.
      // if it's the last column.
      if (index === state.columns.length - 1) {
        // if it's the only column do nothing, they'll get deleted.
        if (state.columns.length === 1) {
        } else {
          // assign cards to the previous column.
          // sort by position so they'll be in the same order in the new column.
          state.columns[index].cards.sort((a, b) => a.position - b.position)
          const newColumn = state.columns[index - 1]
          for (let card of state.columns[index].cards) {
            // add the card to the end of the new column
            // assign new position and columnId
            card.columnId = newColumn.id
            card.position = newColumn.cards.length
            newColumn.cards.push(card)
          }
        }
      } else {
        // not the last column.
        // sort cards.
        const sortedCards = [...state.columns[index].cards].sort(
          (a, b) => a.position - b.position
        )
        const newColumn = state.columns[index + 1]
        for (let card of sortedCards) {
          // add the card to the end of the new column
          // assign new position and columnId
          card.columnId = newColumn.id
          card.position = newColumn.cards.length
          newColumn.cards.push(card)
        }
      }

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
      action: PayloadAction<{ id: string; position: number }>
    ) => {
      const { position, id } = action.payload

      if (position < 0 || position > state.columns.length + 1) return

      const column = state.columns.find((col) => col.id === id)

      if (!column) return
      const positionDifference = column.position - position

      // if you are moving the column right
      if (positionDifference < 0) {
        // get the columns between old and new spot.
        for (let updatedColumn of state.columns) {
          if (
            updatedColumn.position > column.position &&
            updatedColumn.position <= position &&
            updatedColumn.id !== column.id
          ) {
            updatedColumn.position -= 1
          }
        }
      } else {
        // moving the column left.
        // get the columns between old and new spot.
        for (let updatedColumn of state.columns) {
          if (
            updatedColumn.position >= position &&
            updatedColumn.position < column.position &&
            updatedColumn.id !== column.id
          ) {
            updatedColumn.position += 1
          }
        }
      }

      // set new position.
      column.position = position
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
        title: string
      }>
    ) => {
      const { columnId, cardId, title } = action.payload
      const column = state.columns.find((col) => col.id === columnId)

      if (!column) return

      let card = column.cards.find((card) => card.id === cardId)

      if (!card) return

      card.title = title
    },
    deleteCard: (
      state,
      action: PayloadAction<{ columnId: string; cardId: string }>
    ) => {
      const { columnId, cardId } = action.payload

      const column = state.columns.find((col) => col.id === columnId)

      if (!column) return
      column.cards = column.cards.filter((c) => c.id !== cardId)

      for (let updatedCard of column.cards) {
        // does not need to check for column,
        // as it's already removed.
        if (updatedCard.position > column.position) {
          // subtract all positions down.
          updatedCard.position -= 1
        }
      }
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

        for (let updatedCard of newColumn.cards) {
          if (updatedCard.position >= position && updatedCard.id !== card.id) {
            updatedCard.position += 1
          }
        }
        for (let updatedCard of currentColumn.cards) {
          // if the card is below the just moved card
          // drop its position.
          if (updatedCard.position > card.position) {
            updatedCard.position -= 1
          }
        }

        card.position = position
        card.columnId = newColumn.id
        // add card into new column
        newColumn.cards.push(card)
      } else {
        // moving inside same column.
        const column = state.columns.find((col) => col.id === card!.columnId)

        if (!column) return

        if (position < 0 || position > column.cards.length + 1) return

        const positionDifference = card.position - position

        // if you are moving the card down
        if (positionDifference < 0) {
          // get the cards between old and new spot.
          for (let updatedCard of column.cards) {
            if (
              updatedCard.position > card.position &&
              updatedCard.position <= position &&
              updatedCard.id !== card.id
            ) {
              updatedCard.position -= 1
            }
          }
        } else {
          // moving the card up.
          // get the cards between old and new spot.
          for (let updatedCard of column.cards) {
            if (
              updatedCard.position >= position &&
              updatedCard.position < card.position &&
              updatedCard.id !== card.id
            ) {
              updatedCard.position += 1
            }
          }
        }

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

export const selectBoardName = (state: RootState) => state.board.name

export const selectSortedColumns = (state: RootState) =>
  [...state.board.columns].sort((a, b) => a.position - b.position)

export default boardSlice.reducer
