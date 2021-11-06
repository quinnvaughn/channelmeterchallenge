import { Box, Heading } from "@chakra-ui/react"
import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { Column as ColumnType } from "../../../redux/types"

type IProps = ColumnType & { index: number }

export default function Column(props: IProps) {
  const [columnName, setColumnName] = useState(props.name)
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          width="270px"
          height="calc(100vh - 90px)"
          overflowY="auto"
          mt="10px"
          mx="10px"
        >
          <Box bg="#f0f0f0" pb="5px" rounded="sm">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading
                {...provided.dragHandleProps}
                as="h6"
                size="sm"
                ml="10px"
                mt="5px"
                textAlign="center"
              >
                <Box display="flex">Drag {columnName}</Box>
              </Heading>
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  )
}
