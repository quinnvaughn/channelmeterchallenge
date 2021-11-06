import { Box, Text } from "@chakra-ui/react"
import useBoard from "../../hooks/useBoard"

export default function SubNavbar() {
  const { boardName } = useBoard()
  return (
    <Box p="4">
      <Text>{boardName}</Text>
    </Box>
  )
}
