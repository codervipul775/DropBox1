import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Download from './pages/Download'
import Review from './pages/Review'
import Admin from './pages/Admin'
import Layout from './components/Layout'
import { ReviewProvider } from './context/ReviewContext'

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  colors: {
    purple: {
      50: '#f5e9ff',
      100: '#dbc1ff',
      200: '#c199ff',
      300: '#a770ff',
      400: '#8d48ff',
      500: '#741fff',
      600: '#5a15cc',
      700: '#400e99',
      800: '#270866',
      900: '#100233',
    },
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ReviewProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/download" element={<Download />} />
              <Route path="/reviews" element={<Review />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Layout>
        </Router>
      </ReviewProvider>
    </ChakraProvider>
  )
}

export default App