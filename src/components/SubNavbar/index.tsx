import { Box, Text } from "@chakra-ui/react"
import useBoard from "../../hooks/useBoard"

export default function SubNavbar() {
  const { boardName } = useBoard()
  return (
    <Box p="4" bgColor="#82949a">
      <Text fontWeight="bold" color="white">
        {boardName}
      </Text>
    </Box>
  )
}
