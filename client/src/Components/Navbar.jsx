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
        `http://16.170.208.211:4000/api/auth/loggedinuser`,
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
    <Box bg={"blackAlpha.800"}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        p={4}
        // bg={"blackAlpha.800"}
        color="white"
        maxW={"container.xl"}
        m={"auto"}
      >
        <Box>
          <Link to="/">
            <Text fontSize="2rem" fontWeight={"bold"} color={"yellow.400"}>
              Blogger
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
                <Button p={5} colorScheme="yellow">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button p={5} colorScheme="yellow">
                  SignUp
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
