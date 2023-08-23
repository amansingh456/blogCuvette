import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const SingleComment = ({ comment, userid, postid, date }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUserById() {
      const { data } = await axios.post(
        `http://localhost:4000/api/user/getuser`,
        { userid }
      );
      setUser({ ...data });
    }
    fetchUserById();
  }, []);
  return (
    <Flex
      className="commentz"
      justify={"space-between"}
      // border={"1px solid gray"}
      w={"70%"}
      align={"center"}
      px={6}
      maxW={"container.xl"}
      m={"auto"}
      mb={2}
      height={"auto"}
    >
      <Flex direction={"column"}>
        <Box w={"40px"} p={2}>
          <Image src={user?.image} borderRadius={"40%"} w={"60px"} />
        </Box>
        <Text fontWeight={"bold"}><span style={{fontSize:"18px", fontWeight:"bold", textTransform:"capitalize", fontFamily:"Lugrasimo"}}>{user?.username}</span></Text>
      </Flex>
      <Flex direction={"column"}>
        <Text fontSize={"xl"}>{comment}</Text>
        <Text textAlign={"right"}>{date ? date : null}</Text>
      </Flex>
    </Flex>
  );
};

export default SingleComment;
