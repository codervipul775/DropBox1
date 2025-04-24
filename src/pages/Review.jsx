import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  useToast,
  useColorModeValue,
  SimpleGrid,
  HStack,
  Badge,
  Avatar,
  Flex,
  Icon,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  Input,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ScaleFade,
  Fade,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  useBreakpointValue,
  IconButton,
  Tooltip
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FaStar, FaRegStar, FaUser, FaPaperPlane, FaThumbsUp, FaComment, FaShare } from 'react-icons/fa'
import { useReviews } from '../context/ReviewContext'
import { supabase } from '../services/supabase'
import Header from '../components/Header'

const ReviewCard = ({ review, index }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const cardBg = useColorModeValue('white', 'gray.800')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  return (
    <ScaleFade in={true} initialScale={0.9} delay={index * 0.1}>
      <Box
        p={6}
        bg={cardBg}
        borderRadius="2xl"
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow="xl"
        transition="all 0.3s"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: '2xl',
          bg: hoverBg,
        }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="4px"
          bgGradient="linear(to-r, purple.400, pink.400)"
          borderRadius="2xl"
        />
        
        <VStack align="start" spacing={4}>
          <HStack spacing={4} w="full" justify="space-between">
            <HStack spacing={4}>
              <Avatar
                size="lg"
                name={review.name}
                src={review.avatar}
                bg="purple.500"
                color="white"
                boxShadow="lg"
              />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold" fontSize="xl">{review.name}</Text>
                <Text color={textColor} fontSize="sm">
                  {new Date(review.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </VStack>
            </HStack>
            <Badge
              colorScheme="purple"
              px={3}
              py={1}
              borderRadius="full"
              fontSize="sm"
            >
              Verified User
            </Badge>
          </HStack>

          <HStack spacing={1} py={2}>
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                as={i < review.rating ? FaStar : FaRegStar}
                color="yellow.400"
                boxSize={6}
              />
            ))}
          </HStack>

          <Text color={textColor} fontSize="md" lineHeight="tall">
            {review.comment}
          </Text>
        </VStack>
      </Box>
    </ScaleFade>
  )
}

const ReviewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const formBg = useColorModeValue('white', 'gray.800')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      setFormData({
        name: '',
        rating: 5,
        comment: ''
      })
      toast({
        title: "Review submitted successfully",
        description: "Your review is pending approval",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Error submitting review",
        description: error.message,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Fade in={true}>
      <Box
        p={8}
        bg={formBg}
        borderRadius="2xl"
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow="2xl"
        transition="all 0.3s"
        _hover={{
          boxShadow: '3xl',
          bg: hoverBg,
        }}
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <Heading size="lg" bgGradient="linear(to-r, purple.400, pink.400)" bgClip="text">
            Write a Review
          </Heading>
          
          <FormControl isRequired>
            <FormLabel fontSize="lg">Your Name</FormLabel>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              size="lg"
              focusBorderColor="purple.400"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="lg">Rating</FormLabel>
            <Select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              size="lg"
              focusBorderColor="purple.400"
            >
              <option value={5}>5 Stars - Excellent</option>
              <option value={4}>4 Stars - Very Good</option>
              <option value={3}>3 Stars - Good</option>
              <option value={2}>2 Stars - Fair</option>
              <option value={1}>1 Star - Poor</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize="lg">Your Review</FormLabel>
            <Textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Share your experience..."
              rows={4}
              size="lg"
              focusBorderColor="purple.400"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="purple"
            size="lg"
            w="full"
            isLoading={isSubmitting}
            loadingText="Submitting..."
            leftIcon={<FaPaperPlane />}
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
    </Fade>
  )
}

const Review = () => {
  const { approvedReviews, addReview } = useReviews()
  const bgGradient = useColorModeValue(
    'linear(to-b, purple.50, white)',
    'linear(to-b, purple.900, gray.900)'
  )
  const isMobile = useBreakpointValue({ base: true, md: false })

  const handleSubmit = async (reviewData) => {
    await addReview(reviewData)
  }

  const averageRating = approvedReviews.length > 0
    ? approvedReviews.reduce((acc, review) => acc + review.rating, 0) / approvedReviews.length
    : 0

  return (
    <Box bgGradient={bgGradient} minH="100vh">
      <Header />
      <Container maxW="container.xl" py={10}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading 
              size="2xl" 
              bgGradient="linear(to-r, purple.400, pink.400)" 
              bgClip="text"
            >
              Customer Reviews
            </Heading>
            <Text fontSize="xl" color="gray.500" maxW="2xl">
              Read what our customers have to say about their experience with our service.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
            <ReviewForm onSubmit={handleSubmit} />
            
            <VStack spacing={6} align="stretch">
              <Box
                p={6}
                bg={useColorModeValue('white', 'gray.800')}
                borderRadius="2xl"
                boxShadow="xl"
              >
                <VStack spacing={4}>
                  <Stat>
                    <StatLabel fontSize="lg">Average Rating</StatLabel>
                    <StatNumber fontSize="4xl">{averageRating.toFixed(1)}</StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      Based on {approvedReviews.length} reviews
                    </StatHelpText>
                  </Stat>
                  
                  <VStack spacing={2} w="full">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = approvedReviews.filter(r => r.rating === rating).length
                      const percentage = approvedReviews.length > 0
                        ? (count / approvedReviews.length) * 100
                        : 0
                      
                      return (
                        <HStack key={rating} w="full" spacing={4}>
                          <Text minW="100px">{rating} Stars</Text>
                          <Progress
                            value={percentage}
                            w="full"
                            colorScheme="purple"
                            borderRadius="full"
                          />
                          <Text minW="50px" textAlign="right">{count}</Text>
                        </HStack>
                      )
                    })}
                  </VStack>
                </VStack>
              </Box>
            </VStack>
          </SimpleGrid>

          <VStack spacing={6} w="full">
            <Heading size="lg" bgGradient="linear(to-r, purple.400, pink.400)" bgClip="text">
              Recent Reviews
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {approvedReviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Review 