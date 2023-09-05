import { Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import Lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";
import animationDataFour from "../animation_llnkx3y0.json"
import { useNavigate } from "react-router";

const Signup = () => {
  const container = useRef(null)
  const [obj, setOjb] = useState({});
  const toast = useToast();
  const navigate = useNavigate()

  const onSignup = async () => {
    if (obj.image == undefined || obj.email == undefined || obj.password == undefined || obj.username == undefined) {
      toast({
        title: "Warning",
        description: "Please fill all the details",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    }
    else{
      try {
        const { data } = await axios.post(
          "https://glamorous-gold-jersey.cyclic.app/api/auth/register",
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
        navigate("/login")
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
    }

  };
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationDataFour,
    })
  }, [])
  return (
    <>
      <Flex justifyContent={"space-between"} flexDirection={{base:"column-reverse", md:"row"}}>
        <Flex
          direction={"column"}
          p={4}
          bg={"#f0ece9"}
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
            mt={2}
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
            maxLength={16}
            minLength={7}
            border={"1px solid gray"}
            onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}

          />


          <Button onClick={onSignup} mt={4} p={5} bg={"#323232"} color={"white"} fontWeight='bold' _hover={{ bg: '#323232' }} _focus={{
            boxShadow:
              '0 0 1px 2px rgba(50, 50, 50, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            bg: "#cec0b8",
            color: "#323232"
          }}>
            Register
          </Button>
        </Flex>
        <Box className="container" ref={container} w={{base:"70%", md:"40%"}} m={"auto"}></Box>
      </Flex>
    </>
  );
};

export default Signup;
