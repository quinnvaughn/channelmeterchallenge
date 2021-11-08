import { Box } from "@chakra-ui/react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import useBoard from "../../hooks/useBoard"
import Column from "./Column"
import AddColumnButton from "./Column/AddColumnButton"

export default function ColumnList() {
  const { columns, moveCard, moveColumn } = useBoard()

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId, type, source } = result
    // If there is no destination, don't do anything.
    if (!destination) return

    // if the card is moved back to the same spot, don't do anything.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    // if a card is moved.
    if (type === "card") {
      moveCard(destination.droppableId, draggableId, destination.index)
    }

    // if column is moved
    if (type === "column") {
      moveColumn(draggableId, destination.index)
    }
  }

  return (
    <Box
      display="block"
      position="relative"
      height="calc(100vh - 96px)"
      overflow="auto"
      paddingLeft="4"
      paddingTop="4"
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {(provided) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              display="flex"
              position="absolute"
              overflowY="auto"
              paddingRight="8px"
              paddingTop="8px"
            >
              {columns.map((col, i) => (
                <Column key={col.id} {...col} index={i} />
              ))}
              {provided.placeholder}
              <AddColumnButton />
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}
