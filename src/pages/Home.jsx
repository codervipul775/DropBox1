import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Container, 
  Flex, 
  Icon, 
  useColorModeValue,
  SimpleGrid,
  IconButton,
  HStack,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Divider,
  Progress,
  Tag,
  Tooltip,
  Avatar,
  AvatarGroup,
  useToast,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Select,
  ModalFooter
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { 
  FaUpload, 
  FaDownload, 
  FaShieldAlt, 
  FaLock, 
  FaRocket, 
  FaInfinity,
  FaArrowRight,
  FaTimes,
  FaUsers,
  FaGlobe,
  FaChartLine,
  FaStar,
  FaHeart,
  FaRegHeart,
  FaComment
} from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Header from '../components/Header'
import { Link as RouterLink } from 'react-router-dom'

const MotionBox = motion(Box)
const MotionButton = motion(Button)

const features = [
  {
    icon: FaShieldAlt,
    title: 'Secure Sharing',
    description: 'End-to-end encryption for all your files',
    tags: ['Security', 'Privacy'],
    users: 12000
  },
  {
    icon: FaLock,
    title: 'Privacy First',
    description: 'Your files are yours alone',
    tags: ['Encryption', 'Control'],
    users: 8500
  },
  {
    icon: FaRocket,
    title: 'Lightning Fast',
    description: 'Upload and download at maximum speed',
    tags: ['Performance', 'Speed'],
    users: 15000
  },
  {
    icon: FaInfinity,
    title: 'Unlimited Storage',
    description: 'Store as much as you need',
    tags: ['Storage', 'Flexibility'],
    users: 20000
  }
]

const testimonials = []  // Empty array for testimonials

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
  const bgGradient = useColorModeValue(
    'linear(to-r, purple.500, pink.500)',
    'linear(to-r, purple.400, pink.400)'
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const toast = useToast()
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [reviewData, setReviewData] = useState({
    name: '',
    role: '',
    rating: 5,
    review: ''
  })

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: !isLiked ? "Thank you for your support!" : "Removed from favorites",
      status: !isLiked ? "success" : "info",
      duration: 2000,
      isClosable: true,
    })
  }

  const handleReviewSubmit = () => {
    if (!reviewData.name || !reviewData.review) {
      toast({
        title: 'Please fill in required fields',
        status: 'error',
        duration: 3000,
      })
      return
    }

    // Here you would typically send the review to your backend
    toast({
      title: 'Thank you for your review!',
      description: 'Your feedback helps us improve.',
      status: 'success',
      duration: 3000,
    })

    // Add the new review to testimonials (in a real app, this would come from the backend)
    testimonials.unshift({
      name: reviewData.name,
      role: reviewData.role || 'User',
      text: reviewData.review,
      rating: parseInt(reviewData.rating)
    })

    setReviewData({
      name: '',
      role: '',
      rating: 5,
      review: ''
    })
    setIsReviewModalOpen(false)
  }

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