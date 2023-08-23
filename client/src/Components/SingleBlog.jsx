import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SingleBlog = ({ userid, title, description, img, date, postid }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchUser() {
      const { data } = await axios.post(
        `http://localhost:4000/api/user/getuser`,
        { userid }
      );

      setUser({ ...data });
    }
    fetchUser();
  }, []);

  return (
    <Box
      onClick={()=>navigate(`/blog/${postid}`)}
      key={userid}
      bg="#f0ece9"
      p={4}
      borderRadius="md"
      width="100%"
      cursor={"pointer"}
      className="blogBox"
    >
      <Flex
        justify={"space-between"}
        align={"center"}
        borderRadius={"10px"}
        p={2}
      >
        <Box w={"25%"} p={2}>
          <Image src={user?.image} alt={title} borderRadius={"50%"} />
        </Box>
        <Flex direction={"column"}>
          <Text
            w={"100%"}
            fontSize={{ base: "1.5rem", md: "1rem" }}
          >
            {date}
          </Text>
          <Text  fontSize={{ base: "1.5rem", md: "1rem" }}>
            Posted By <span style={{fontSize:"18px", fontWeight:"bold", textTransform:"capitalize", fontFamily:"Lugrasimo"}}>{user?.username}</span>
          </Text>
        </Flex>
      </Flex>

      <Image src={img} alt={title} w={"300px"} m={"auto"} h={"250px"} my={4} />
      <Text fontWeight={"bold"} fontSize={"1.2rem"} fontFamily={"Lugrasimo"}>
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
