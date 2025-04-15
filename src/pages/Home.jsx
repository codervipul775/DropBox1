import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Container, 
  Icon, 
  useColorModeValue,
  SimpleGrid,
  HStack,
  Flex
} from '@chakra-ui/react'
import { 
  FaUpload, 
  FaDownload, 
  FaLock,
  FaShare 
} from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import Header from '../components/Header'

const FeatureCard = ({ icon, title, description }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      p={8}
      bg={bgColor}
      borderRadius="xl"
      border="1px solid"
      borderColor={borderColor}
      textAlign="center"
      boxShadow="lg"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      }}
      transition="all 0.3s"
    >
      <Icon as={icon} w={12} h={12} color="purple.500" mb={6} />
      <Heading size="md" mb={4}>{title}</Heading>
      <Text color="gray.500" fontSize="lg">{description}</Text>
    </Box>
  )
}

const Home = () => {
  const bgGradient = useColorModeValue(
    'linear(to-b, purple.50, white)',
    'linear(to-b, purple.900, gray.900)'
  )

  return (
    <Box bgGradient={bgGradient}>
      <Header />
      <Container maxW="container.xl" py={20}>
        <VStack spacing={20}>
          {/* Hero Section */}
          <VStack spacing={8} textAlign="center">
            <VStack spacing={6}>
              <Heading 
                size="2xl" 
                color={useColorModeValue('black', 'white')}
              >
                Simple and Secure File Sharing
              </Heading>
              <Text fontSize="xl" color="gray.500" maxW="2xl">
                Upload your files and share them with a simple code. 
                No account required, just drag & drop.
              </Text>
            </VStack>
            
            {/* Action Buttons */}
            <Flex gap={6} pt={6} flexWrap="wrap" justify="center">
              <Button
                as={RouterLink}
                to="/upload"
                size="lg"
                colorScheme="purple"
                leftIcon={<Icon as={FaUpload} />}
                px={8}
                h={14}
                fontSize="lg"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Upload File
              </Button>
              <Button
                as={RouterLink}
                to="/download"
                size="lg"
                colorScheme="purple"
                variant="outline"
                leftIcon={<Icon as={FaDownload} />}
                px={8}
                h={14}
                fontSize="lg"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Download File
              </Button>
            </Flex>
          </VStack>

          {/* Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            <FeatureCard
              icon={FaUpload}
              title="Easy Upload"
              description="Drag & drop or click to upload. Get a sharing code instantly."
            />
            <FeatureCard
              icon={FaShare}
              title="Quick Sharing"
              description="Share your files securely using a simple code system."
            />
            <FeatureCard
              icon={FaLock}
              title="Secure Storage"
              description="Files are encrypted and stored securely on Supabase servers."
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Home