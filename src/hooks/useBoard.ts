import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  selectBoardName,
  addColumn as ac,
  addBoardName as abn,
  addCard as aCard,
  deleteCard as dCard,
  deleteColumn as dc,
  editCard as eCard,
  editColumnName as ecn,
  moveCard as mCard,
  moveColumn as mc,
  selectSortedColumns,
} from "../redux/slices/board"

export default function useBoard() {
  const boardName = useAppSelector(selectBoardName)
  const columns = useAppSelector(selectSortedColumns)
  const dispatch = useAppDispatch()

  // Doing it this way allows the consumer to not even need
  // to know we're using Redux/allows it to be replaced if
  // necessary.
  const addColumn = () => {
    dispatch(ac())
  }

  const sortedCards = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId)
    if (!column) return []

    return [...column.cards].sort((a, b) => a.position - b.position)
  }

  const addBoardName = (name: string) => {
    dispatch(abn(name))
  }

  const addCard = (columnId: string) => {
    dispatch(aCard(columnId))
  }

  const deleteCard = (columnId: string, cardId: string) => {
    dispatch(dCard({ columnId, cardId }))
  }

  const deleteColumn = (columnId: string) => {
    dispatch(dc(columnId))
  }

  const editCard = (columnId: string, cardId: string, title: string) => {
    dispatch(eCard({ columnId, cardId, title }))
  }

  const editColumnName = (columnId: string, name: string) => {
    dispatch(ecn({ name, id: columnId }))
  }

  const moveCard = (columnId: string, cardId: string, position: number) => {
    dispatch(mCard({ columnId, cardId, position }))
  }

  const moveColumn = (columnId: string, position: number) => {
    dispatch(mc({ id: columnId, newPosition: position }))
  }

  return {
    boardName,
    columns,
    addColumn,
    addBoardName,
    addCard,
    deleteCard,
    deleteColumn,
    editCard,
    editColumnName,
    moveCard,
    moveColumn,
    sortedCards,
  }
}
