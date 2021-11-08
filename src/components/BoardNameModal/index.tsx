import { Button } from "@chakra-ui/button"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Input,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react"
import { useState } from "react"
import useBoard from "../../hooks/useBoard"

export default function BoardNameModal() {
  const { addBoardName } = useBoard()
  const [boardName, setBoardName] = useState("")

  return (
    <Modal isOpen={true} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Name your board</ModalHeader>
        <ModalBody>
          <Input
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            bg="#32e699"
            _hover={{ backgroundColor: "#2cc985" }}
            color="white"
            variant="solid"
            disabled={boardName.length === 0}
            onClick={() => addBoardName(boardName)}
          >
            Create board
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
