import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SingleBlog = ({ userid, title, description, img, date, postid }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      const { data } = await axios.post(
        `http://localhost:4000/api/users/getUser`,
        { userid }
      );

      setUser({ ...data });
    }
    fetchUser();
  }, []);

  return (
    <Box
      key={userid}
      bg="white"
      p={4}
      boxShadow="md"
      borderRadius="md"
      width="100%"
      border={"1px solid gray"}
    >
      <Flex
        justify={"space-between"}
        align={"center"}
        // border={"2px solid gray"}
        borderRadius={"10px"}
        p={2}
      >
        <Box w={"25%"} p={2}>
          <Image src={user?.image} alt={title} borderRadius={"40%"} />
        </Box>
        <Flex direction={"column"}>
          <Text
            w={"100%"}
            fontWeight={"bold"}
            fontSize={{ base: "1.5rem", md: "1rem" }}
          >
            {date}
          </Text>
          <Text fontWeight={"bold"} fontSize={{ base: "1.5rem", md: "1rem" }}>
            Posted By {user?.username}
          </Text>
        </Flex>
      </Flex>

      <Image src={img} alt={title} w={"300px"} m={"auto"} h={"250px"} my={4} />
      <Text fontWeight={"bold"} fontSize={"1.2rem"} fontStyle={"italic"}>
        {title}
      </Text>
      <Text>
        {description.substring(0, 120) + "......"}
        <Link to={`/blog/${postid}`} style={{ color: "skyblue" }}>
          Read More
        </Link>
      </Text>
    </Box>
  );
};

export default SingleBlog;
