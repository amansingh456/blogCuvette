import { Box, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Login = () => {
  const [obj, setOjb] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogin = async () => {
    try {
      const {
        data: { token, user },
      } = await axios.post("http://localhost:4000/api/auth/login", obj);
      localStorage.setItem("token", token);
      toast({
        title: "Success",
        description: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      //   console.log(user);
      dispatch({ type: "SET_USER", payload: user });
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      toast({
        title: "Error",
        description: error.response.data,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box
      p={4}
      bg="gray.100"
      textAlign={"center"}
      maxW={"container.xl"}
      m={"auto"}
    >
      <Input
        name="email"
        type="email"
        placeholder="Email"
        border={"1px solid gray"}
        onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        mt={2}
        border={"1px solid gray"}
        onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}
      />
      <Button
        mt={4}
        colorScheme="yellow"
        onClick={onLogin}
        border={"1px solid gray"}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
