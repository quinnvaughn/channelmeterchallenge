import { Box } from "@chakra-ui/react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import useBoard from "../../hooks/useBoard"
import Column from "./Column"
import AddColumnButton from "./Column/AddColumnButton"

export default function ColumnList() {
  const { columns } = useBoard()

  const onDragEnd = (result: DropResult) => {}

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
