import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Container, 
  Icon, 
  useColorModeValue,
  SimpleGrid,
  HStack,
  Flex,
  ScaleFade,
  Fade,
  Badge,
  useBreakpointValue,
  Image,
  AspectRatio,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Tooltip
} from '@chakra-ui/react'
import { 
  FaUpload, 
  FaDownload, 
  FaLock,
  FaShare,
  FaRocket,
  FaShieldAlt,
  FaBolt,
  FaChartLine,
  FaUsers,
  FaGlobe,
  FaInfoCircle
} from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import Header from '../components/Header'
import { useState } from 'react'

const FeatureCard = ({ icon, title, description, delay, stats }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  return (
    <ScaleFade in={true} initialScale={0.9} delay={delay}>
      <Box
        p={8}
        bg={bgColor}
        borderRadius="2xl"
        borderWidth="1px"
        borderColor={borderColor}
        textAlign="center"
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
        <Icon as={icon} w={12} h={12} color="purple.500" mb={6} />
        <Heading size="md" mb={4}>{title}</Heading>
        <Text color="gray.500" fontSize="lg" mb={4}>{description}</Text>
        {stats && (
          <Stat>
            <StatLabel fontSize="sm" color="gray.500">{stats.label}</StatLabel>
            <StatNumber fontSize="2xl" color="purple.500">{stats.value}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {stats.help}
            </StatHelpText>
          </Stat>
        )}
      </Box>
    </ScaleFade>
  )
}

const StepCard = ({ number, title, description, icon }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Fade in={true} delay={number * 0.2}>
      <VStack spacing={4}>
        <Box
          w={20}
          h={20}
          borderRadius="full"
          bgGradient="linear(to-r, purple.400, pink.400)"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="3xl"
          fontWeight="bold"
          boxShadow="xl"
          position="relative"
        >
          {number}
          <Icon
            as={icon}
            position="absolute"
            right={-2}
            bottom={-2}
            bg="white"
            color="purple.500"
            borderRadius="full"
            p={2}
            boxSize={8}
            boxShadow="md"
          />
        </Box>
        <Heading size="md">{title}</Heading>
        <Text color="gray.500" textAlign="center">
          {description}
        </Text>
      </VStack>
    </Fade>
  )
}

const Home = () => {
  const bgGradient = useColorModeValue(
    'linear(to-b, purple.50, white)',
    'linear(to-b, purple.900, gray.900)'
  )
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      <Header />
      <Container maxW="container.xl" py={20}>
        <VStack spacing={20}>
          {/* Hero Section */}
          <VStack spacing={12} textAlign="center">
            <VStack spacing={8}>
              <Badge
                colorScheme="purple"
                px={4}
                py={1}
                borderRadius="full"
                fontSize="lg"
                mb={4}
                boxShadow="md"
              >
                Simple & Secure File Sharing
              </Badge>
              <Heading 
                size="2xl" 
                bgGradient="linear(to-r, purple.400, pink.400)" 
                bgClip="text"
                maxW="3xl"
                lineHeight="tall"
              >
                Share Your Files with Ease
              </Heading>
              <Text fontSize="xl" color="gray.500" maxW="2xl">
                Upload your files and share them with a simple code. 
                No account required, just drag & drop.
              </Text>
            </VStack>
            
            {/* Action Buttons */}
            <Flex gap={6} pt={6} flexWrap="wrap" justify="center">
              <Button
                as={RouterLink}
                to="/upload"
                size="lg"
                colorScheme="purple"
                leftIcon={<Icon as={FaUpload} />}
                px={8}
                h={14}
                fontSize="lg"
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
                px={8}
                h={14}
                fontSize="lg"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Download File
              </Button>
            </Flex>
          </VStack>

          {/* Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            <FeatureCard
              icon={FaRocket}
              title="Lightning Fast"
              description="Upload and share files in seconds with our optimized system."
              delay={0.1}
              stats={{
                label: "Average Upload Time",
                value: "2.3s",
                help: "Faster than competitors"
              }}
            />
            <FeatureCard
              icon={FaShieldAlt}
              title="Bank-Grade Security"
              description="Your files are encrypted and protected with enterprise-grade security."
              delay={0.2}
              stats={{
                label: "Security Score",
                value: "99.9%",
                help: "Industry leading"
              }}
            />
            <FeatureCard
              icon={FaBolt}
              title="Instant Access"
              description="Recipients can download files immediately with a simple code."
              delay={0.3}
              stats={{
                label: "Download Speed",
                value: "10x",
                help: "Faster downloads"
              }}
            />
          </SimpleGrid>

          {/* How It Works Section */}
          <VStack spacing={12} w="full">
            <VStack spacing={4} textAlign="center">
              <Heading 
                size="xl" 
                bgGradient="linear(to-r, purple.400, pink.400)" 
                bgClip="text"
              >
                How It Works
              </Heading>
              <Text fontSize="lg" color="gray.500" maxW="2xl">
                Share files in three simple steps
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              <StepCard
                number={1}
                title="Upload"
                description="Drag & drop your file or click to browse"
                icon={FaUpload}
              />
              <StepCard
                number={2}
                title="Get Code"
                description="Receive a unique code for your file"
                icon={FaShare}
              />
              <StepCard
                number={3}
                title="Share"
                description="Share the code with anyone to download"
                icon={FaDownload}
              />
            </SimpleGrid>
          </VStack>

          {/* CTA Section */}
          <VStack spacing={8} textAlign="center" w="full">
            <Heading size="lg">Ready to Share Your Files?</Heading>
            <Text fontSize="xl" color="gray.500" maxW="2xl">
              Join thousands of users who trust our platform for secure file sharing
            </Text>
            <Button
              as={RouterLink}
              to="/upload"
              size="lg"
              colorScheme="purple"
              leftIcon={<Icon as={FaUpload} />}
              px={8}
              h={14}
              fontSize="lg"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Start Sharing Now
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default Home