import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex maxW="container.xl" mx="auto" justify="space-between" align="center">
        <ChakraLink as={Link} to="/" fontSize="xl" color="white" fontWeight="bold">
          DropBox
        </ChakraLink>
        <Flex gap={4}>
          <ChakraLink as={Link} to="/upload" color="white">
            Upload
          </ChakraLink>
          <ChakraLink as={Link} to="/download" color="white">
            Download
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar