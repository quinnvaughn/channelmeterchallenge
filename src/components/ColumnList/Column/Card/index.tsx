import { Draggable } from "react-beautiful-dnd"
import { Box, Textarea, Text } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"
import { Card as CardType } from "../../../../redux/types"
import { useState, useRef, useLayoutEffect } from "react"
import useBoard from "../../../../hooks/useBoard"
import "./card.css"

type IProps = CardType

export default function Card(props: IProps) {
  const [cardTitle, setCardTitle] = useState(props.title)
  const { editCard, deleteCard } = useBoard()
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const [editVisibility, setEditVisibility] = useState(false)

  useLayoutEffect(() => {
    if (editVisibility && inputRef.current) {
      inputRef.current.focus()
      // text area will focus at the beginning otherwise.
      inputRef.current.selectionStart = inputRef.current.value.length
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
    // do not let people make a card with no length.
    if (cardTitle.length === 0) return
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
          boxShadow="0 1px 0 #091e4240"
          m="8px"
          p="10px"
          minHeight="80px"
          borderWidth="1px"
          bg="white"
          cursor="pointer"
          borderRadius="md"
          overflow="auto"
          position="relative"
          _hover={{ backgroundColor: "rgb(227, 234, 240)" }}
          onClick={() => setEditVisibility(true)}
        >
          {renderCardTitle()}
          {!editVisibility && (
            <MdDelete
              id="delete"
              onClick={(e) => {
                // so it doesn't also flip the visibility.
                e.stopPropagation()
                deleteCard(props.columnId, props.id)
              }}
            />
          )}
        </Box>
      )}
    </Draggable>
  )
}
