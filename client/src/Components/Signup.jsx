import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [obj, setOjb] = useState({});
  const toast = useToast();

  console.log(obj);
  const onSignup = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/register",
        obj
      );
      toast({
        title: "Success",
        description: data,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <Flex
      direction={"column"}
      p={4}
      bg={"gray.100"}
      gap={2}
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
        name="username"
        type="text"
        placeholder="Username"
        border={"1px solid gray"}
        onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}
      />
      <Input
        name="image"
        type="text"
        placeholder="Profile image link"
        mt={2}
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
        onClick={onSignup}
        border={"1px solid gray"}
      >
        Register
      </Button>
    </Flex>
  );
};

export default Signup;
