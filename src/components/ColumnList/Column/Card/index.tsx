import { Draggable } from "react-beautiful-dnd"
import { Box } from "@chakra-ui/react"
import { Card as CardType } from "../../../../redux/types"

type IProps = CardType

export default function Card(props: IProps) {
  return (
    <Draggable draggableId={props.id} index={props.position}>
      {(provided) => (
        <Box
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          m="5px"
          p="10px"
          minHeight="80px"
          borderWidth="1px"
          bg="white"
          cursor="pointer"
          borderRadius="md"
          overflow="auto"
          _hover={{ backgroundColor: "rgb(227, 234, 240)" }}
        >
          <div>{props.title}</div>
        </Box>
      )}
    </Draggable>
  )
}
