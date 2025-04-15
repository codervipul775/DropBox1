import React, { useState } from 'react';
import { Box, Container, Heading, Text, useToast } from '@chakra-ui/react';
import FileUpload from '../components/FileUpload';
import { validateFileSize } from '../utils/fileUtils.js';  // Make sure path is correct

const Upload = () => {
  const toast = useToast();

  const handleFileUpload = (file) => {
    try {
      validateFileSize(file);
      // Proceed with upload logic
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
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
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Box textAlign="center">
        <Heading mb={8}>Upload File</Heading>
        <FileUpload onFileUpload={handleFileUpload} />
      </Box>
    </Container>
  );
};

export default Upload;