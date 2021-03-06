import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { Provider } from "react-redux"
import reportWebVitals from "./reportWebVitals"
import { store } from "./redux/store"
import theme from "./theme"
import "./index.css"

const AppWithProviders = () => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
