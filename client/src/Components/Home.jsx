import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SingleBlog from "./SingleBlog";
import lottie from "lottie-web"
import animationData from "../animation_llnaopyn.json"

const Homepage = () => {
  // const { colorMode } = useColorMode();
  // const bgColor = { light: "gray.100", dark: "gray.700" };
  const [blogPosts, setBlogPosts] = useState([]);
  const container = useRef(null)
  useEffect(() => {
    
    lottie.loadAnimation({
      container:container.current,
      renderer:"svg",
      loop:true,
      autoplay:true,
      animationData: animationData,
    })
    async function fetchPosts() {
      const { data } = await axios.get(
        `http://localhost:4000/api/posts/allposts`
      );
      console.log(data);
      setBlogPosts(data.result);
    }
    fetchPosts();
  }, []);
  return (
    <Box bg={"#cec0b8"}>
      <Box p={4} bg={"#cec0b8"} maxW={"container.xl"} m={"auto"} >
        <Flex align={"center"} justifyContent={"space-between"}>
          <Box>
          <Text mt={20} fontFamily={"Poppins"} fontSize={26}>
            Our home is a unique as you are 😊
        </Text>
        <Text  mt={5} fontFamily={"Poppins"}fontSize={40} fontWeight={"bold"}>
          Brightning homes with posts, comments socialization.
        </Text>
          </Box>
          <Box ref={container}  >
          </Box>
        </Flex>
        
      </Box>
      <Box p={4} bg={"#cec0b8"} maxW={"container.xl"} m={"auto"} >
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} >
          {blogPosts?.map((post, i) => (
            <SingleBlog {...post} key={i} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Homepage;
