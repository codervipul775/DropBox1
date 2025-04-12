import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

const Header = () => {
  const bgColor = useColorModeValue('purple.500', 'purple.600')
  const textColor = useColorModeValue('white', 'gray.100')

  return (
    <Box bg={bgColor} py={8} mb={8}>
      <Container maxW="container.md">
        <Heading 
          size="2xl" 
          color={textColor}
          fontWeight="bold"
          textAlign="center"
        >
          DropBox
        </Heading>
        <Text
          color={textColor}
          fontSize="lg"
          mt={2}
          textAlign="center"
          opacity={0.9}
        >
          Share files easily and securely
        </Text>
      </Container>
    </Box>
  )
}

export default Header