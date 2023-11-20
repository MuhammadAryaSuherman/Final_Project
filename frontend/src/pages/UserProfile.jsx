import React, { useEffect, useState } from 'react';
import { Box, Avatar, Text, Flex, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { getUserbyid } from "../modules/fetch";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await getUserbyid(id);
        setUser(response); 
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserById();
  }, [id]);

  const handleEditProfile = () => {
    console.log('Edit Profile clicked');
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        p={4}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        textAlign="center"
        width="400px"
        maxWidth="80%"
        backgroundColor="white"
      >
        <Text fontSize="xl" fontWeight="bold" mt={2} color="black">
          User Profile
        </Text>
        <Avatar src={user.photoURL} size="2xl" mt={2} />
        <Text fontSize="xl" fontWeight="bold" mt={4} color="gray.600">
          {user.username}
        </Text>
        <Text fontSize="md" color="gray.500" mt={1}>
          {user.email}
        </Text>
        
        {user.profileDescription && (
          <Text fontSize="sm" color="gray.100" mt={2}>
            {user.profileDescription}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default UserProfile;
