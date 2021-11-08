import { Box, Text } from "@chakra-ui/react"

export default function NavBar() {
  return (
    <Box p="4px" bgColor="#617278" display="flex" justifyContent="center">
      <Text color="white" fontWeight="bold" fontSize="20px" mt="2px">
        Trello
      </Text>
    </Box>
  )
}
