import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const SingleComment = ({ comment, userid, postid, date }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUserById() {
      const { data } = await axios.post(
        `http://13.48.46.179:4003/api/user/getuser`,
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
      w={{base:"95%", sm:"90%", md:"70%"}}
      align={"center"}
      px={{base:2, sm:3, md:4}}
      maxW={"container.xl"}
      m={"auto"}
      mb={2}
      height={"auto"}
    >
      <Flex direction={"column"}>
        <Box w={"60px"} p={2}>
          <Image src={user?.image} borderRadius={"40%"} w={"60px"} />
        </Box>
        <Text fontWeight={"bold"}><span style={{fontSize:"18px", fontWeight:"bold", textTransform:"capitalize", fontFamily:"Lugrasimo"}}>{user?.username}</span></Text>
      </Flex>
      <Flex direction={"column"}>
        <Text fontSize={{base:"14px", sm:"18px", md:"22px"}}>{comment}</Text>
        <Text textAlign={"right"} fontSize={{base:"12px", sm:"16px", md:"18px"}}>{date ? date : null}</Text>
      </Flex>
    </Flex>
  );
};

export default SingleComment;
