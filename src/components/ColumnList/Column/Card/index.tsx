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
        >
          <div>{props.title}</div>
        </Box>
      )}
    </Draggable>
  )
}
