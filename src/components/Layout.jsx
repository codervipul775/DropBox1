import { Box, Container, Flex, Button, Heading, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaMoon, FaSun, FaStar } from 'react-icons/fa'

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Box 
        as="nav" 
        position="fixed" 
        w="100%" 
        zIndex={10} 
        bg={bgColor} 
        borderBottom="1px solid" 
        borderColor={borderColor}
        px={4}
        py={2}
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading 
              as={RouterLink} 
              to="/" 
              size="lg" 
              color="purple.500"
              _hover={{ textDecoration: 'none' }}
            >
              DropBox
            </Heading>
            <Flex gap={4} align="center">
              <Button
                as={RouterLink}
                to="/upload"
                variant="ghost"
                colorScheme="purple"
              >
                Upload
              </Button>
              <Button
                as={RouterLink}
                to="/download"
                variant="ghost"
                colorScheme="purple"
              >
                Download
              </Button>
              <Button
                as={RouterLink}
                to="/reviews"
                variant="ghost"
                colorScheme="purple"
                leftIcon={<FaStar />}
              >
                Reviews
              </Button>
              <Button
                onClick={toggleColorMode}
                variant="ghost"
                color="current"
              >
                {colorMode === 'light' ? <FaMoon /> : <FaSun />}
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Box pt="72px">
        {children}
      </Box>
    </Box>
  )
}

export default Layout