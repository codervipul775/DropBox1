import { useState } from 'react'
import { 
  Box, 
  Input, 
  Button, 
  VStack, 
  Text, 
  useToast,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading,
  Center,
  Icon,
  useColorModeValue,
  Link,
  Code,
  HStack,
  useClipboard
} from '@chakra-ui/react'
import { FaCloudUploadAlt, FaCopy, FaCheck } from 'react-icons/fa'
import { uploadFile } from '../services/supabase'

// Add this helper function at the top of your file, before the component
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const FileUpload = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedCode, setUploadedCode] = useState(null)
  const [error, setError] = useState(null)
  const [fileSize, setFileSize] = useState(null)
  const toast = useToast()
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  const { hasCopied, onCopy } = useClipboard('')

  const handleUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    setIsUploading(true)
    setError(null)
    setUploadedCode(null)
    setFileSize(file.size)
    
    try {
      const code = await uploadFile(file)
      setUploadedCode(code)
      toast({
        title: 'Upload successful',
        description: 'File has been uploaded successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (err) {
      setError(err.message)
      toast({
        title: 'Upload failed',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleUpload({ target: { files: [file] } })
    }
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        {uploadedCode && (
          <Box
            p={6}
            bg={useColorModeValue('blue.50', 'blue.900')}
            rounded="xl"
            borderWidth={1}
            borderColor={useColorModeValue('blue.200', 'blue.700')}
          >
            <VStack spacing={3} align="stretch">
              <Text fontSize="sm" color={useColorModeValue('blue.600', 'blue.200')}>
                Your File Code
              </Text>
              <HStack justify="space-between" align="center">
                <VStack align="start" spacing={1}>
                  <Code
                    fontSize="2xl"
                    fontWeight="bold"
                    color={useColorModeValue('blue.600', 'blue.200')}
                    bg="transparent"
                  >
                    {uploadedCode}
                  </Code>
                  {fileSize && (
                    <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                      File size: {formatFileSize(fileSize)}
                    </Text>
                  )}
                </VStack>
                <Button
                  size="sm"
                  onClick={() => onCopy(uploadedCode)}
                  leftIcon={hasCopied ? <FaCheck /> : <FaCopy />}
                  colorScheme="blue"
                  variant="ghost"
                >
                  {hasCopied ? 'Copied!' : 'Copy'}
                </Button>
              </HStack>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                Share this code to let others download your file
              </Text>
            </VStack>
          </Box>
        )}

        <VStack spacing={2}>
          <Heading size="xl">Convert File to URL</Heading>
          <Text color="gray.500" textAlign="center">
            Easily convert any file to a shareable URL with DropBox's free file converter. 
            Generate URLs instantly for easy sharing.
          </Text>
        </VStack>

        <Box
          as="label"
          htmlFor="file-upload"
          cursor="pointer"
          borderWidth={2}
          borderStyle="dashed"
          borderColor={borderColor}
          rounded="xl"
          p={10}
          _hover={{ bg: hoverBg }}
          transition="all 0.2s"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Center flexDirection="column" h="full">
            <Icon as={FaCloudUploadAlt} w={12} h={12} color="blue.500" mb={4} />
            <VStack spacing={1}>
              <Text fontSize="xl">Drop, paste or</Text>
              <Text color="blue.500" fontWeight="bold">upload here</Text>
              <Text color="gray.500" fontSize="sm">
                Accepts files (up to 100MB)
              </Text>
            </VStack>
          </Center>
          <input
            id="file-upload"
            type="file"
            onChange={handleUpload}
            style={{ display: 'none' }}
            disabled={isUploading}
          />
        </Box>

        <Text fontSize="sm" color="gray.500" textAlign="center">
          By uploading your file, you agree to our{' '}
          <Link color="blue.500" href="#">Terms of Use</Link>
          {' '}&{' '}
          <Link color="blue.500" href="#">Privacy Policy</Link>
        </Text>

        {/* Features section */}
        <VStack spacing={4} pt={4}>
          <Text fontSize="lg" fontWeight="medium">
            ✓ Ad free
          </Text>
          <Text fontSize="lg" fontWeight="medium">
            ✓ No credit card required
          </Text>
          <Text fontSize="lg" fontWeight="medium">
            ✓ Fast and secure
          </Text>
        </VStack>

        {isUploading && (
          <Alert status="info">
            <AlertIcon />
            <AlertTitle>Uploading...</AlertTitle>
          </Alert>
        )}

        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Upload Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {uploadedCode && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Upload Successful!</AlertTitle>
            <AlertDescription>
              Your file code is: {uploadedCode}
            </AlertDescription>
          </Alert>
        )}
      </VStack>
    </Container>
  )
}

export default FileUpload