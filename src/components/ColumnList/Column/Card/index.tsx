import { Draggable } from "react-beautiful-dnd"
import { Box, Textarea, Text } from "@chakra-ui/react"
import { Card as CardType } from "../../../../redux/types"
import { useState, useRef, useLayoutEffect } from "react"
import useBoard from "../../../../hooks/useBoard"

type IProps = CardType

export default function Card(props: IProps) {
  const [cardTitle, setCardTitle] = useState(props.title)
  const { editCard } = useBoard()
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const [editVisibility, setEditVisibility] = useState(false)

  useLayoutEffect(() => {
    if (editVisibility && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editVisibility])

  const renderCardTitle = () => {
    if (editVisibility) {
      return (
        <Textarea
          ref={inputRef}
          value={cardTitle}
          size="sm"
          onBlur={changeName}
          onChange={(e) => setCardTitle(e.target.value)}
          bg="white"
          onKeyDown={handleKeyDown}
        />
      )
    } else {
      return <Text>{cardTitle}</Text>
    }
  }

  const changeName = () => {
    setEditVisibility(false)
    editCard(props.columnId, props.id, cardTitle)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      changeName()
    }
  }

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
          onClick={() => setEditVisibility(true)}
        >
          {renderCardTitle()}
        </Box>
      )}
    </Draggable>
  )
}
