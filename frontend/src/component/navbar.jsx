import {
  Button,
  Flex,
  Image,
  Text,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(() => {
    const token = window.localStorage.getItem('token');
    return !!token;
  });
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const getUser = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setIsLogin(true);
      setUserId(decoded.id);
    } else {
      setIsLogin(false);
      setUserId(null);
    }
  };

  useEffect(() => {
    getUser();
  }, [window.localStorage.getItem('token')]);

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
      bg="gray.100"
      color="black"
      position="sticky"
      zIndex="5"
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
          <Image src="/logoBulat.jpg" maxHeight={8} maxWidth={8}></Image>
          <Text fontSize="xl" fontWeight="bold" fontStyle="oblique" align="right">
            FourStore
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLogin && userId && (
          <Menu>
            <MenuButton as={Avatar} size="sm" bg="gray.800" _hover={{ opacity: "50%" }}></MenuButton>
            <MenuList>
              <MenuItem as={Link} to={`/user/${userId}`}>
                Akun
              </MenuItem>
              <MenuItem as={Link} to={`/order-history`}>
                Riwayat Pembelian
              </MenuItem>
              <MenuItem onClick={() => {
                window.localStorage.removeItem("token");
                setIsLogin(false);
                navigate("/");
              }}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        {!isLogin && (
          <Link to="/login">
            <Button margin={1}>Login</Button>
          </Link>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;
