import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { RootState } from "../store"

type ColumnState = {
  columns: Column[]
}

type Column = {
  id: string
  name: string
}

const initialState: ColumnState = {
  columns: [],
}

export const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addColumn: (state) => {
      const column: Column = {
        id: uuidv4(),
        name: "Add a name",
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
      if (newPosition < 0 || newPosition > state.columns.length) return

      const oldPosition = state.columns.findIndex((col) => col.id === id)

      if (oldPosition === -1) return

      const column = state.columns[oldPosition]

      state.columns.splice(oldPosition, 1)
      state.columns.splice(newPosition, 0, column)
    },
  },
})

export const { addColumn, deleteColumn, editColumnName, moveColumn } =
  columnSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectColumns = (state: RootState) => state.columns

export default columnSlice.reducer
