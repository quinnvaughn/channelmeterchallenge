import { Box } from "@chakra-ui/react"
import BoardNameModal from "./components/BoardNameModal"
import ColumnList from "./components/ColumnList"
import NavBar from "./components/Navbar"
import SubNavbar from "./components/SubNavbar"
import useBoard from "./hooks/useBoard"
import background from "./images/background.jpeg"

function App() {
  const { boardName } = useBoard()
  return boardName.length === 0 ? (
    <BoardNameModal />
  ) : (
    <Box
      backgroundImage={background}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      h="100vh"
    >
      <NavBar />
      <SubNavbar />
      <ColumnList />
    </Box>
  )
}

export default App
