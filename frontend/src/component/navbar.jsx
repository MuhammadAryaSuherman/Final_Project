import {
  Button,
  color,
  Flex,
  Image,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  console.log("Navbar rendered");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, [window.localStorage.getItem("token")]);

  const [showBorder, setShowBorder] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowBorder(scrollPosition > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      w="95%"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      paddingY="0.5rem"
      bg="white"
      color="black"
      position="sticky"
      zIndex="sticky"
      top={0}
      borderBottom={showBorder ? "none" : "1px solid black"}
      transition="border-bottom 0.3s ease-in-out"
    >
      <Link to="/">
        <Flex
          align="center"
          mr={5}
          cursor="pointer"
          _hover={{ color: "gray" }}
          transition="color 0.2s ease-in-out"
        >
          <Image
            src="../../public/logoBulat.jpg"
            maxHeight={8}
            maxWidth={8}
          ></Image>
          <Text
            fontSize="xl"
            fontWeight="bold"
            fontStyle="oblique"
            align="right"
          >
            FourStore
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLogin && (
          <Link to="/newbook">
            <Button colorScheme="blue">Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} margin={1}>
            Login
          </Button>
        ) : (
          <Button
            colorScheme="red"
            onClick={() => {
              window.localStorage.removeItem("token");
              setIsLogin(false);
              navigate("/");
            }}
          >
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(
                e.target.email.value,
                e.target.password.value
              );
              window.localStorage.setItem("token", token.token);
              navigate("/");
              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent bgColor="gray.700">
            <ModalHeader color="white">Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel color="white">Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    bgColor="white"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="white">Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    bgColor="white"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" colorScheme="blue" mr={3}>
                Login
              </Button>
              <Link to="/register" onClick={onClose}>
                <Button
                  color="white"
                  bgColor="green"
                  _hover={{ bgColor: "darkgreen" }}
                >
                  Doesn't Have Account? Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
