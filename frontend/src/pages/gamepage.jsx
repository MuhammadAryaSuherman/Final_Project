import React from 'react';
import { Box, ChakraProvider, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const GamePage = () => {
    return (
      <ChakraProvider>
        <Box display="flex">
          {}
          <Link to="/homepage"> {}
            <Box
              width="200px"
              height="200px"
             
              margin="4"
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
            width="200px"
            height="200px"
         
            margin="4"
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

        {/* Kotak 3 dengan Gambar */}
        <Link to="/homepage?page=3">
        <Box
          width="200px"
          height="200px"
        
          margin="4"
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
          width="200px"
          height="200px"
       
          margin="4"
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


        {}
        <Link to="/homepage?page=5">
        <Box
          width="200px"
          height="200px"
         
          margin="4"
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
      </Box>
    </ChakraProvider>
  );
};

export default GamePage;
