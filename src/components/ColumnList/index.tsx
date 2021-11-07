import { Box } from "@chakra-ui/react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import useBoard from "../../hooks/useBoard"
import Column from "./Column"
import AddColumnButton from "./Column/AddColumnButton"

export default function ColumnList() {
  const { columns, moveCard } = useBoard()

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    moveCard(
      result.destination.droppableId,
      result.draggableId,
      result.destination.index
    )
  }

  return (
    <Box
      display="block"
      position="relative"
      height="calc(100vh - 90px)"
      overflowX="auto"
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
