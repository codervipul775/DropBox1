import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  useToast,
  VStack,
  useColorModeValue,
  SimpleGrid,
  HStack,
  Icon,
  ScaleFade,
  Fade
} from '@chakra-ui/react';
import { FaUpload, FaLock, FaClock, FaFileAlt } from 'react-icons/fa';
import FileUpload from '../components/FileUpload';
import { validateFileSize } from '../utils/fileUtils.js';
import Header from '../components/Header';

const FeatureCard = ({ icon, title, description }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  return (
    <Box
      p={6}
      bg={bgColor}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="lg"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
        bg: hoverBg,
      }}
    >
      <VStack spacing={4}>
        <Icon as={icon} boxSize={8} color="purple.500" />
        <Text fontWeight="bold" fontSize="lg">{title}</Text>
        <Text color="gray.500" textAlign="center">{description}</Text>
      </VStack>
    </Box>
  )
}

const Upload = () => {
  const toast = useToast();
  const bgGradient = useColorModeValue(
    'linear(to-b, purple.50, white)',
    'linear(to-b, purple.900, gray.900)'
  )

  const handleFileUpload = (file) => {
    try {
      validateFileSize(file);
      // Proceed with upload logic
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    
    try {
      validateFileSize(file);
      // Proceed with upload
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      <Header />
      <Container maxW="container.xl" py={10}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading 
              size="2xl" 
              bgGradient="linear(to-r, purple.400, pink.400)" 
              bgClip="text"
            >
              Upload Your File
            </Heading>
            <Text fontSize="xl" color="gray.500" maxW="2xl">
              Drag and drop your file or click to browse. Get a sharing code instantly.
            </Text>
          </VStack>

          <ScaleFade in={true} initialScale={0.9}>
            <FileUpload onFileUpload={handleFileUpload} />
          </ScaleFade>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            <FeatureCard
              icon={FaUpload}
              title="Easy Upload"
              description="Drag & drop or click to upload files up to 10MB. Get a sharing code instantly."
            />
            <FeatureCard
              icon={FaLock}
              title="Secure Storage"
              description="Your files are encrypted and stored securely on our servers."
            />
            <FeatureCard
              icon={FaClock}
              title="Quick Sharing"
              description="Share your files instantly with a simple code system."
            />
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Upload;