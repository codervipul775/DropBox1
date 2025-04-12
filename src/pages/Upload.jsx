import React from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'
import FileUpload from '../components/FileUpload'

const Upload = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Box textAlign="center">
        <Heading mb={8}>Upload File</Heading>
        <FileUpload />
      </Box>
    </Container>
  )
}

export default Upload