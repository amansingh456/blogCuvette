import { Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { EditIcon, DeleteIcon} from '@chakra-ui/icons'

const SingleComment = ({ commentid, comment, userid, postid, date }) => {
  const [user, setUser] = useState({});
  const toast = useToast()
  const handleDlt = async(id) => {
    let token = localStorage.getItem("token") 
    if(token){
      try {
        const { dat } = await axios.delete(
          `http://13.48.46.179:4003/api/posts/comments/${id}`
        );
        window.location.reload(false)
      } catch (error) {
        console.log('error: ', error);
      }
    }
    else{
      toast({
        title: "Error",
        description: "Please Login First..!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    }
    
  }
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
      <Flex>
        <EditIcon className="icon" cursor={"pointer"} color={"#138808"}  p={1} w={7} h={7}/> &nbsp; &nbsp;
        <DeleteIcon onClick={()=>handleDlt(commentid)} className="icon" cursor={"pointer"} color={"#ff2400"}  p={1} w={7} h={7}/>
      </Flex>
      <Flex direction={"column"}>
        <Text fontSize={{base:"14px", sm:"18px", md:"22px"}}>{comment}</Text>
        <Text textAlign={"right"} fontSize={{base:"12px", sm:"16px", md:"18px"}}>{date ? date : null}</Text>
      </Flex>
    </Flex>
  );
};

export default SingleComment;
