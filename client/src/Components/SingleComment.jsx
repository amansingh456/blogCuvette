import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const SingleComment = ({ comment, userid, postid, date }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUserById() {
      const { data } = await axios.post(
        `http://localhost:4000/api/users/getUser`,
        { userid }
      );
      setUser({ ...data });
    }
    fetchUserById();
  }, []);
  return (
    <Flex
      justify={"space-between"}
      border={"1px solid gray"}
      w={"100%"}
      align={"center"}
      px={6}
      maxW={"container.xl"}
      m={"auto"}
    >
      <Flex direction={"column"}>
        <Box w={"40px"} p={2}>
          <Image src={user?.image} borderRadius={"40%"} w={"60px"} />
        </Box>
        <Text fontWeight={"bold"}>{user?.username}</Text>
      </Flex>
      <Flex direction={"column"}>
        <Text fontWeight={"bold"}>{comment}</Text>
        <Text fontWeight={"bold"}>{date ? date : null}</Text>
      </Flex>
    </Flex>
  );
};

export default SingleComment;
