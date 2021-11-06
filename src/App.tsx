import { Box } from "@chakra-ui/react"
import ColumnList from "./components/ColumnList"
import NavBar from "./components/Navbar"
import SubNavbar from "./components/SubNavbar"

function App() {
  return (
    <Box h="100vh">
      <NavBar />
      <SubNavbar />
      <ColumnList />
    </Box>
  )
}

export default App
