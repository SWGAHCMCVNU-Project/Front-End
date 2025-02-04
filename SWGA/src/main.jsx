import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/App.scss'
import './assets/styles/responsive.scss'
import GlobalStyles from './styles/GlobalStyles.js' // Import GlobalStyles
import App from './App.jsx'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles />
    <ChakraProvider value={defaultSystem}>
      <App />
      </ChakraProvider>
  </StrictMode>,
)