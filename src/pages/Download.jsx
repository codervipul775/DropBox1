import { useState, useEffect } from 'react'
import { 
  Box, 
  Input, 
  Button, 
  VStack, 
  Text, 
  Link, 
  useToast,
  Container,
  Heading,
  Icon,
  useColorModeValue,
  Badge,
  HStack,
  Progress,
  Flex,
  Divider,
  Spinner,
  ScaleFade,
  Fade,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useBreakpointValue,
  IconButton,
  Tooltip,
  Collapse,
  SimpleGrid
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { getFileByCode } from '../services/supabase'
import { FaDownload, FaFile, FaSearch, FaCheck, FaTimes, FaEye, FaLock, FaClock, FaFileAlt } from 'react-icons/fa'
import Header from '../components/Header'

const Download = () => {
  const { code: urlCode } = useParams()
  const [code, setCode] = useState(urlCode || '')
  const [fileData, setFileData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const toast = useToast()
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const bgColor = useColorModeValue('white', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.800')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')
  const isMobile = useBreakpointValue({ base: true, md: false })

  const handleSearch = async () => {
    if (!code) {
      toast({
        title: 'Please enter a code',
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      return
    }

    try {
      setLoading(true)
      setDownloadProgress(0)
      const data = await getFileByCode(code)
      if (!data) {
        throw new Error('File not found')
      }
      setFileData(data)
      toast({
        title: 'File found!',
        description: 'Click the download button to get your file',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    } catch (error) {
      setFileData(null)
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (fileData?.url) {
      window.open(fileData.url, '_blank')
    }
  }

  const handleView = () => {
    if (fileData?.url) {
      const previewUrl = fileData.url.replace('/download/', '/view/')
      window.open(previewUrl, '_blank')
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Box minH="100vh" bgGradient={useColorModeValue(
      'linear(to-b, purple.50, white)',
      'linear(to-b, purple.900, gray.900)'
    )}>
      <Header />
      <Container maxW="container.xl" py={10}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading 
              size="2xl" 
              bgGradient="linear(to-r, purple.400, pink.400)" 
              bgClip="text"
            >
              Download Your File
            </Heading>
            <Text fontSize="xl" color="gray.500" maxW="2xl">
              Enter your unique code to access and download your file securely
            </Text>
          </VStack>

          <ScaleFade in={true} initialScale={0.9}>
            <Box
              p={8}
              bg={cardBg}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="2xl"
              transition="all 0.3s"
              _hover={{
                boxShadow: '3xl',
                bg: hoverBg,
              }}
              w="full"
              maxW="600px"
            >
              <VStack spacing={6}>
                <HStack w="full" spacing={4}>
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter your file code"
                    size="lg"
                    focusBorderColor="purple.400"
                  />
                  <Button
                    colorScheme="purple"
                    size="lg"
                    onClick={handleSearch}
                    isLoading={loading}
                    loadingText="Searching..."
                    leftIcon={<FaSearch />}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    transition="all 0.2s"
                  >
                    Search
                  </Button>
                </HStack>

                <Collapse in={!!fileData} animateOpacity>
                  <Box
                    p={6}
                    bg={useColorModeValue('gray.50', 'gray.700')}
                    borderRadius="xl"
                    w="full"
                  >
                    <VStack spacing={4} align="start">
                      <HStack spacing={4} w="full" justify="space-between">
                        <HStack spacing={4}>
                          <Icon as={FaFileAlt} boxSize={8} color="purple.500" />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold" fontSize="lg">{fileData?.name}</Text>
                            <Text color="gray.500" fontSize="sm">
                              {formatFileSize(fileData?.size || 0)}
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
                          {fileData?.type || 'File'}
                        </Badge>
                      </HStack>

                      <Divider />

                      <HStack spacing={4} w="full" justify="space-between">
                        <HStack spacing={4}>
                          <Tooltip label="Download">
                            <IconButton
                              icon={<FaDownload />}
                              colorScheme="purple"
                              onClick={handleDownload}
                              aria-label="Download"
                              size="lg"
                            />
                          </Tooltip>
                          <Tooltip label="Preview">
                            <IconButton
                              icon={<FaEye />}
                              colorScheme="purple"
                              variant="outline"
                              onClick={handleView}
                              aria-label="Preview"
                              size="lg"
                            />
                          </Tooltip>
                        </HStack>
                        <HStack spacing={2}>
                          <Icon as={FaLock} color="green.500" />
                          <Text fontSize="sm" color="gray.500">Secure Download</Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </Box>
                </Collapse>
              </VStack>
            </Box>
          </ScaleFade>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            <Box
              p={6}
              bg={cardBg}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="lg"
            >
              <VStack spacing={4}>
                <Icon as={FaLock} boxSize={8} color="purple.500" />
                <Text fontWeight="bold" fontSize="lg">Secure Downloads</Text>
                <Text color="gray.500" textAlign="center">
                  Your files are encrypted and protected during transfer
                </Text>
              </VStack>
            </Box>

            <Box
              p={6}
              bg={cardBg}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="lg"
            >
              <VStack spacing={4}>
                <Icon as={FaClock} boxSize={8} color="purple.500" />
                <Text fontWeight="bold" fontSize="lg">Fast Access</Text>
                <Text color="gray.500" textAlign="center">
                  Quick and easy access to your files with a simple code
                </Text>
              </VStack>
            </Box>

            <Box
              p={6}
              bg={cardBg}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="lg"
            >
              <VStack spacing={4}>
                <Icon as={FaFile} boxSize={8} color="purple.500" />
                <Text fontWeight="bold" fontSize="lg">Multiple Formats</Text>
                <Text color="gray.500" textAlign="center">
                  Support for various file types and sizes
                </Text>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Download