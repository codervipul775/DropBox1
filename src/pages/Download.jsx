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
  Spinner
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { getFileByCode } from '../services/supabase'
import { FaDownload, FaFile, FaSearch, FaCheck, FaTimes, FaEye } from 'react-icons/fa'

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

  const handleSearch = async () => {
    if (!code) {
      toast({
        title: 'Please enter a code',
        status: 'error',
        duration: 3000,
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
      })
    } catch (error) {
      setFileData(null)
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
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
      // Open in new tab but with preview mode
      const previewUrl = fileData.url.replace('/download/', '/view/')
      window.open(previewUrl, '_blank')
    }
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack 
        spacing={6} 
        w="full" 
        maxW="500px" 
        mx="auto" 
        mt={8}
        p={8}
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        bg={bgColor}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Icon as={FaDownload} w={12} h={12} color="purple.400" mb={4} />
          <Heading size="xl" mb={2}>
            Download File
          </Heading>
          <Text color="gray.500">
            Enter the file code to download your file
          </Text>
        </Box>

        <VStack spacing={4} w="full">
          <Input
            placeholder="Enter file code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            
            borderRadius="lg"
            _focus={{
              borderColor: 'purple.400',
              boxShadow: '0 0 0 1px purple.400',
            }}
          />
          
          <Button
            colorScheme="purple"
            onClick={handleSearch}
            isLoading={loading}
            w="full"
            leftIcon={<Icon as={FaSearch} />}
            
            borderRadius="lg"
            isDisabled={!code}
          >
            Search File
          </Button>

          {fileData && (
            <Box 
              w="full" 
              p={6} 
              borderRadius="lg" 
              border="1px solid" 
              borderColor={borderColor}
            >
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <Icon as={FaFile} w={8} h={8} color="purple.400" />
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">
                      {fileData.name}
                    </Text>
                  </Box>
                </HStack>

                <HStack spacing={4} w="full">
                  <Button
                    colorScheme="purple"
                    w="full"
                    leftIcon={<Icon as={FaEye} />}
                    borderRadius="lg"
                    onClick={handleView}
                    variant="outline"
                  >
                    View File
                  </Button>

                  <Link href={fileData.url} isExternal w="full">
                    <Button
                      colorScheme="purple"
                      w="full"
                      leftIcon={<Icon as={FaDownload} />}
                      borderRadius="lg"
                      onClick={handleDownload}
                      isLoading={isDownloading}
                      loadingText="Downloading..."
                    >
                      Download
                    </Button>
                  </Link>
                </HStack>
              </VStack>
            </Box>
          )}

          {loading && !fileData && (
            <Box textAlign="center" py={4}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="purple.500"
                size="xl"
              />
              <Text mt={4} color="gray.500">
                Searching for your file...
              </Text>
            </Box>
          )}
        </VStack>
      </VStack>
    </Container>
  )
}

export default Download