import { Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  //   { user, onLogin, onLogout, onCreate }
  const token = localStorage.getItem("token") || null;
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  useEffect(() => {
    async function getUser() {
      const { data } = await axios.get(
        `http://localhost:4000/api/auth/loggedinuser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "SET_USER", payload: data });
    }
    if (token) {
      getUser();
    }
  }, []);
  return (
    <Box bg={"#cec0b8"} padding={"10px"} position={"sticky"}>
     <Box bg={"#dcd2cd"} className="navBoxTwo" position={"sticky"}>
     <Flex
        as="nav"
        align="center"
        justify="space-between"
        p={4}
        // bg={"blackAlpha.800"}
        color="#323232"
        maxW={"container.xl"}
        m={"auto"}
      >
        <Box>
          <Link to="/">
            <Text fontSize="2rem" fontFamily={"Lugrasimo"} fontWeight={"bold"} color={"#323232"}>
              #blog_Cuvette
            </Text>
          </Link>
        </Box>
        <Flex gap={3}>
          {user && token ? (
            <>
              <Link to="/create">
                <Button p={2} colorScheme="green">
                  Create Post
                </Button>
              </Link>
              <Button
                p={5}
                colorScheme="red"
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button p={5} bg={"#323232"} color={"white"} fontWeight='bold' _hover={{ bg: '#323232' }} borderRadius={"100px"} _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(50, 50, 50, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg: "#cec0b8",
                  color: "#323232"
                }}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button p={5} bg={"#323232"} color={"white"} fontWeight='bold' _hover={{ bg: '#323232' }} borderRadius={"100px"} _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(50, 50, 50, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg: "#cec0b8",
                  color: "#323232"
                }}>
                  SignUp
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
     </Box>
    </Box>
  );
};

export default Navbar;
