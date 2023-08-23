import { Box, SimpleGrid, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleBlog from "./SingleBlog";

const Homepage = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "gray.700" };
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
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
    <Box bg={bgColor[colorMode]}>
      <Box p={4} bg={bgColor[colorMode]} maxW={"container.xl"} m={"auto"}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {blogPosts?.map((post, i) => (
            <SingleBlog {...post} key={i} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Homepage;
