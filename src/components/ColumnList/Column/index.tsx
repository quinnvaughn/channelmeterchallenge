import {
  Box,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
  Button,
} from "@chakra-ui/react"
import React, { useState, useRef, useLayoutEffect } from "react"
import {
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
} from "react-beautiful-dnd"
import { Column as ColumnType } from "../../../redux/types"
import { GrDrag } from "react-icons/gr"
import { FiMoreHorizontal } from "react-icons/fi"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import useBoard from "../../../hooks/useBoard"
import CardList from "./CardList"

type IProps = ColumnType & { index: number }

export default function Column(props: IProps) {
  const [columnName, setColumnName] = useState(props.name)
  const {
    deleteColumn,
    editColumnName,
    addCard,
    sortedCards: sortCards,
  } = useBoard()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [editVisibility, setEditVisibility] = useState(false)

  const sortedCards = sortCards(props.id)

  useLayoutEffect(() => {
    if (editVisibility && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editVisibility])

  const renderColumnTitle = (
    draggable: DraggableProvidedDragHandleProps | undefined
  ) => {
    if (editVisibility) {
      return (
        <Input
          ref={inputRef}
          value={columnName}
          size="sm"
          onBlur={changeName}
          onChange={(e) => setColumnName(e.target.value)}
          bg="white"
          onKeyDown={handleKeyDown}
        />
      )
    } else {
      return (
        <Heading
          {...draggable}
          as="h6"
          size="sm"
          ml="10px"
          mt="5px"
          textAlign="center"
        >
          <HStack spacing={2}>
            <GrDrag /> <Text>{columnName}</Text>
          </HStack>
        </Heading>
      )
    }
  }

  const changeName = () => {
    setEditVisibility(false)
    editColumnName(props.id, columnName)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      changeName()
    }
  }

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          width="270px"
          height="calc(100vh - 96px)"
          overflowY="auto"
          marginRight="10px"
        >
          <Box bg="#f0f0f0" pb="5px" rounded="sm">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {renderColumnTitle(provided.dragHandleProps)}
              <Box my="10px" mr="10px" cursor="grab" display="flex">
                <Menu>
                  <MenuButton aria-label="Options">
                    <FiMoreHorizontal />
                  </MenuButton>
                  <MenuList justifyContent="center" alignItems="center">
                    <MenuItem onClick={() => setEditVisibility(true)}>
                      <AiOutlineEdit />
                      <Text marginLeft="5px">Edit</Text>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => deleteColumn(props.id)}>
                      <AiOutlineDelete />
                      <Text marginLeft="5px">Delete</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>
            <Droppable droppableId={props.id} type="card">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  minHeight="2px"
                >
                  <CardList cards={sortedCards} />
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
            <Box display="flex" justifyContent="center">
              <Button
                color="gray.500"
                size="sm"
                my="10px"
                mx="auto"
                width="80%"
                variant="ghost"
                onClick={() => addCard(props.id)}
              >
                + Add a card
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  )
}
