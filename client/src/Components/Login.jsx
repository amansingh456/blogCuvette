import { Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import Lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import animationDataThree from "../animation_llnk1xtq.json"

const Login = () => {
  const container = useRef(null)
  const [obj, setOjb] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogin = async () => {
    try {
      const {
        data: { token, user },
      } = await axios.post("http://13.48.46.179:4003/api/auth/login", obj);
      localStorage.setItem("token", token);
      toast({
        title: "Success",
        description: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      dispatch({ type: "SET_USER", payload: user });
      navigate("/");
    } catch (error) {
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

  useEffect(()=>{
    Lottie.loadAnimation({
      container:container.current,
      renderer:"svg",
      loop:true,
      autoplay:true,
      animationData: animationDataThree,
    })
  },[])

  return (
   <>
   <Flex justifyContent={"space-between"} flexDirection={{base:"column-reverse", md:"row"}}>
    
    <Box
      p={4}
      bg="#f0ece9"
      textAlign={"center"}
      maxW={"container.xl"}
      m={"auto"}
      borderRadius={"20px"}
      ml={10}
      mr={10}
      mb={{base:"40px", md:"auto"}}
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
      <Button onClick={onLogin} mt={4} p={5} bg={"#323232"} color={"white"} fontWeight='bold' _hover={{ bg: '#323232' }} borderRadius={"100px"} _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(50, 50, 50, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg: "#cec0b8",
                  color: "#323232"
                }}>
        Login
      </Button>
    </Box>
    <Box className="container" ref={container}>

    </Box>
   </Flex>
   </>
  );
};

export default Login;
