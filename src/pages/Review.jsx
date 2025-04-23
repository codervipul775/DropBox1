import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Avatar,
  HStack,
  useColorModeValue,
  Icon,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  Stack
} from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { useState } from 'react'
import Header from '../components/Header'
import { useReviews } from '../context/ReviewContext'

const ReviewCard = ({ review }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="lg"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="md"
      _hover={{
        boxShadow: 'lg',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.2s"
    >
      <VStack align="start" spacing={4}>
        <HStack spacing={4}>
          <Avatar name={review.name} src={review.avatar} />
          <Box>
            <Heading size="sm">{review.name}</Heading>
            <Text fontSize="sm" color="gray.500">{review.date}</Text>
          </Box>
        </HStack>
        
        <HStack>
          {[...Array(review.rating)].map((_, i) => (
            <Icon
              key={i}
              as={FaStar}
              color="yellow.400"
            />
          ))}
        </HStack>
        
        <Text>{review.comment}</Text>
      </VStack>
    </Box>
  )
}

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  })

  const { addReview } = useReviews()

  const handleSubmit = (e) => {
    e.preventDefault()
    addReview({
      ...formData,
      avatar: `https://bit.ly/${formData.name.toLowerCase().replace(' ', '-')}`
    })
    setFormData({ name: '', rating: 5, comment: '' })
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="lg"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      boxShadow="md"
    >
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Your Name</FormLabel>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Rating</FormLabel>
          <Select
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
          >
            <option value={5}>5 Stars - Excellent</option>
            <option value={4}>4 Stars - Very Good</option>
            <option value={3}>3 Stars - Good</option>
            <option value={2}>2 Stars - Fair</option>
            <option value={1}>1 Star - Poor</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Your Review</FormLabel>
          <Textarea
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            placeholder="Share your experience with our service..."
            rows={4}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="purple"
          size="lg"
          w="full"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          transition="all 0.2s"
        >
          Submit Review
        </Button>
      </VStack>
    </Box>
  )
}

const Review = () => {
  const { approvedReviews } = useReviews()
  const bgGradient = useColorModeValue(
    'linear(to-b, purple.50, white)',
    'linear(to-b, purple.900, gray.900)'
  )

  return (
    <Box bgGradient={bgGradient} minH="100vh">
      <Header />
      <Container maxW="container.xl" py={20}>
        <VStack spacing={10}>
          <Heading
            size="2xl"
            textAlign="center"
            bgGradient={useColorModeValue(
              'linear(to-r, purple.600, pink.600)',
              'linear(to-r, purple.200, pink.200)'
            )}
            bgClip="text"
          >
            Share Your Experience
          </Heading>
          
          <Text
            fontSize="xl"
            color="gray.500"
            textAlign="center"
            maxW="2xl"
          >
            Help others by sharing your experience with our file sharing service
          </Text>

          <Stack spacing={10} w="full" direction={{ base: 'column', lg: 'row' }}>
            <Box flex={1}>
              <ReviewForm />
            </Box>
            
            <Box flex={2}>
              <VStack spacing={6} w="full">
                {approvedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </VStack>
            </Box>
          </Stack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Review 