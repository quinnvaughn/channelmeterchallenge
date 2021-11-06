import useBoard from "../../../../hooks/useBoard"
import { Box, Button } from "@chakra-ui/react"

export default function AddColumnButton() {
  const { addColumn } = useBoard()

  return (
    <Box>
      <Button onClick={addColumn}>+ Add a column</Button>
    </Box>
  )
}
