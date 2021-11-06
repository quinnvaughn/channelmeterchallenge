import { Box, Text } from "@chakra-ui/react"
import { Droppable } from "react-beautiful-dnd"
import { Column as ColumnType } from "../../redux/types"

type IProps = ColumnType

export default function Column(props: IProps) {
  return (
    <Droppable droppableId={props.id}>
      {(provided) => (
        <Box>
          <Text>Hi</Text>
        </Box>
      )}
    </Droppable>
  )
}
