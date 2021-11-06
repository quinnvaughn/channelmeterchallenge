import { Box } from "@chakra-ui/react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import useBoard from "../../hooks/useBoard"
import Column from "../Column"

export default function ColumnList() {
  const { columns } = useBoard()

  const onDragEnd = (result: DropResult) => {}

  return (
    <Box
      display="block"
      position="relative"
      height="calc(100vh-90px)"
      overflowX="auto"
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              display="flex"
              position="absolute"
              overflowY="auto"
            >
              {columns.map((col) => (
                <Column {...col} />
              ))}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}
