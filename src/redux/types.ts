export type Column = {
  id: string
  name: string
  position: number
  cards: Card[]
}

export type Card = {
  id: string
  title: string
  // We just change position instead of having to delete/add a
  // card from an array every time it is moved and map by
  // asc position.
  position: number
  // This makes it easier to move from column to column.
  // Would normally have this field if this was stored in a db.
  columnId: string
}
