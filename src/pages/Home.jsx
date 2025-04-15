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
  HStack
} from '@chakra-ui/react'
import { 
  FaUpload, 
  FaDownload, 
  FaLock 
} from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import Header from '../components/Header'

const FeatureCard = ({ icon, title, description }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="xl"
      border="1px solid"
      borderColor={borderColor}
      textAlign="center"
      boxShadow="lg"
    >
      <Icon as={icon} w={10} h={10} color="purple.500" mb={4} />
      <Heading size="md" mb={2}>{title}</Heading>
      <Text color="gray.500">{description}</Text>
    </Box>
  )
}

const Home = () => {
  return (
    <>
      <Header />
      <Container maxW="container.lg" py={10}>
        <VStack spacing={16}>
          {/* Hero Section with Action Buttons */}
          <VStack spacing={8} textAlign="center">
            <VStack spacing={4}>
              <Heading size="xl">
                Simple and Secure File Sharing
              </Heading>
              <Text fontSize="lg" color="gray.500" maxW="2xl">
                Upload your files and share them with a simple code. No account required.
              </Text>
            </VStack>
            
            {/* Action Buttons */}
            <HStack spacing={4} pt={4}>
              <Button
                as={RouterLink}
                to="/upload"
                size="lg"
                colorScheme="purple"
                leftIcon={<Icon as={FaUpload} />}
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
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Download File
              </Button>
            </HStack>
          </VStack>

          {/* Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            <FeatureCard
              icon={FaUpload}
              title="Easy Upload"
              description="Drag & drop your files or click to upload. Get a sharing code instantly."
            />
            <FeatureCard
              icon={FaDownload}
              title="Quick Download"
              description="Enter the code and download files instantly. No waiting time."
            />
            <FeatureCard
              icon={FaLock}
              title="Secure Sharing"
              description="Your files are encrypted and secure. Only share the code with trusted people."
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </>
  )
}

export default Home