import {
  Box,
  Container,
  VStack,
  Heading,
  Input,
  Button,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useColorModeValue,
  Text,
  HStack,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Divider
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FaTrash, FaEdit, FaStar, FaKey } from 'react-icons/fa'
import { useReviews } from '../context/ReviewContext'
import { supabase } from '../services/supabase'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [selectedReview, setSelectedReview] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onClose: onPasswordModalClose } = useDisclosure()
  const toast = useToast()
  
  const { reviews, deleteReview, updateReviewStatus, updateReview } = useReviews()
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'admin_password')
        .single()

      if (error) throw error

      if (password === data.setting_value) {
        setIsAuthenticated(true)
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
        })
      } else {
        toast({
          title: "Invalid password",
          status: "error",
          duration: 3000,
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      toast({
        title: "Error during login",
        description: error.message,
        status: "error",
        duration: 3000,
      })
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        status: "error",
        duration: 3000,
      })
      return
    }

    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'admin_password',
          setting_value: newPassword
        })

      if (error) throw error

      toast({
        title: "Password changed successfully",
        status: "success",
        duration: 3000,
      })
      onPasswordModalClose()
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error('Password change error:', error)
      toast({
        title: "Error changing password",
        description: error.message,
        status: "error",
        duration: 3000,
      })
    }
  }

  const handleEditReview = (review) => {
    setSelectedReview(review)
    onOpen()
  }

  const handleUpdateReview = (e) => {
    e.preventDefault()
    updateReview(selectedReview.id, {
      name: selectedReview.name,
      rating: selectedReview.rating,
      comment: selectedReview.comment
    })
    onClose()
  }

  if (!isAuthenticated) {
    return (
      <Container maxW="container.sm" py={20}>
        <VStack spacing={8}>
          <Heading>Admin Login</Heading>
          <Box
            p={8}
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            w="full"
          >
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                />
              </FormControl>
              <Button
                colorScheme="purple"
                onClick={handleLogin}
                w="full"
              >
                Login
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Heading>Review Management</Heading>
          <Button
            leftIcon={<FaKey />}
            onClick={onPasswordModalOpen}
            colorScheme="purple"
            variant="outline"
          >
            Change Password
          </Button>
        </HStack>
        
        <Box
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          overflow="hidden"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Name</Th>
                <Th>Rating</Th>
                <Th>Comment</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reviews.map((review) => (
                <Tr key={review.id}>
                  <Td>{review.date}</Td>
                  <Td>{review.name}</Td>
                  <Td>
                    <HStack>
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} color="#FFD700" />
                      ))}
                    </HStack>
                  </Td>
                  <Td maxW="300px">
                    <Text noOfLines={2}>{review.comment}</Text>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={review.status === 'approved' ? 'green' : 'yellow'}
                    >
                      {review.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      {review.status === 'pending' && (
                        <Button
                          size="sm"
                          colorScheme="green"
                          onClick={() => updateReviewStatus(review.id, 'approved')}
                        >
                          Approve
                        </Button>
                      )}
                      <IconButton
                        icon={<FaEdit />}
                        onClick={() => handleEditReview(review)}
                        aria-label="Edit review"
                        size="sm"
                        colorScheme="blue"
                      />
                      <IconButton
                        icon={<FaTrash />}
                        onClick={() => deleteReview(review.id)}
                        aria-label="Delete review"
                        size="sm"
                        colorScheme="red"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>

      {/* Edit Review Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={selectedReview?.name || ''}
                  onChange={(e) => setSelectedReview({
                    ...selectedReview,
                    name: e.target.value
                  })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Rating</FormLabel>
                <Select
                  value={selectedReview?.rating || 5}
                  onChange={(e) => setSelectedReview({
                    ...selectedReview,
                    rating: Number(e.target.value)
                  })}
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Comment</FormLabel>
                <Textarea
                  value={selectedReview?.comment || ''}
                  onChange={(e) => setSelectedReview({
                    ...selectedReview,
                    comment: e.target.value
                  })}
                />
              </FormControl>

              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleUpdateReview}
                w="full"
              >
                Update Review
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Change Password Modal */}
      <Modal isOpen={isPasswordModalOpen} onClose={onPasswordModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Admin Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </FormControl>

              <Button
                colorScheme="purple"
                onClick={handleChangePassword}
                w="full"
              >
                Change Password
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default Admin 