import { Box } from "@chakra-ui/react"
import ColumnList from "./components/ColumnList"
import NavBar from "./components/Navbar"
import SubNavbar from "./components/SubNavbar"
import background from "./images/background.jpeg"

function App() {
  return (
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
