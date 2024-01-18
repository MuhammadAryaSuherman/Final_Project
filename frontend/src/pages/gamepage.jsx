import React from 'react';
import { VStack, HStack, Box, ChakraProvider, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@chakra-ui/react';

const GamePage = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 48em)');
    return (
      <ChakraProvider>
        <VStack align="center" spacing={isSmallScreen ? '5' : '10'} mt="20px">
        <HStack spacing="10">
          {}
          <Link to="/homepage"> {}
            <Box
              width={isSmallScreen ? '100px' : '200px'}
              height={isSmallScreen ? '100px' : '200px'}
             
              margin={isSmallScreen ? '2':'4'}
              rounded="lg"
              _hover={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transform: 'scale(1.05)',
              }}
            >
              <Image
                src="https://i.ytimg.com/vi/RDaq0-cNlYs/maxresdefault.jpg"
                alt="Deskripsi Gambar 1"
                objectFit="cover"
                width="100%"
                height="100%"
                rounded="lg"
              />
            </Box>
          </Link>

        {}
        <Link to="/homepage?page=2"> {}
          <Box
            width={isSmallScreen ? '100px' : '200px'}
            height={isSmallScreen ? '100px' : '200px'}
            margin={isSmallScreen ? '2':'4'}
            rounded="lg"
            _hover={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transform: 'scale(1.05)',
            }}
          >
            <Image
              src="https://wallpaperaccess.com/full/1272749.jpg"
              alt="Deskripsi Gambar 2"
              objectFit="cover"
              width="100%"
              height="100%"
              rounded="lg"
            />
          </Box>
        </Link>
        </HStack>

        {/* Kotak 3 dengan Gambar */}
        <HStack spacing="10">
        <Link to="/homepage?page=3">
        <Box
          width={isSmallScreen ? '100px' : '200px'}
          height={isSmallScreen ? '100px' : '200px'}
        
          margin={isSmallScreen ? '2':'4'}
          rounded="lg"
          _hover={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1.05)',
          }}
        >
          <Image
            src="https://www.xtrafondos.com/wallpapers/free-fire-logo-3537.jpg"
            alt="Deskripsi Gambar 3"
            objectFit="cover"
            width="100%"
            height="100%"
            rounded="lg"
          />
        </Box>
        </Link>

        {}
        <Link to="/homepage?page=4">
        <Box
          width={isSmallScreen ? '100px' : '200px'}
          height={isSmallScreen ? '100px' : '200px'}
       
          margin={isSmallScreen ? '2':'4'}
          rounded="lg"
          _hover={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1.05)',
          }}
        >
          <Image
            src="https://mir-s3-cdn-cf.behance.net/projects/404/e20935161181355.Y3JvcCwyNzYxLDIxNjAsNTQwLDA.jpg"
            alt="Deskripsi Gambar 4"
            objectFit="cover"
            width="100%"
            height="100%"
            rounded="lg"
          />
        </Box>
        </Link>
        </HStack>

        {}
        <HStack spacing="10">
        <Link to="/homepage?page=5">
        <Box
          width={isSmallScreen ? '100px' : '200px'}
          height={isSmallScreen ? '100px' : '200px'}
         
          margin={isSmallScreen ? '2':'4'}
          rounded="lg"
          _hover={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transform: 'scale(1.05)',
          }}
        >
          <Image
            src="https://i.ytimg.com/vi/WGk24reSk54/maxresdefault.jpg"
            alt="Deskripsi Gambar 5"
            objectFit="cover"
            width="100%"
            height="100%"
            rounded="lg"
          />
        </Box>
        </Link>
        </HStack>
        </VStack>
    </ChakraProvider>
  );
};

export default GamePage;
