import { Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {DeleteIcon} from '@chakra-ui/icons'

const SingleBlog = ({ userid, title, description, img, date, postid }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate()
  const toast = useToast()
  const handleDlt = async(id) => {
    let token = localStorage.getItem("token") 
    if(token){
      try {
        const { dat } = await axios.delete(
          `http://13.48.46.179:4003/api/posts/${id}`
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
    async function fetchUser() {
      const { data } = await axios.post(
        `http://13.48.46.179:4003/api/user/getuser`,
        { userid }
      );

      setUser({ ...data });
    }
    fetchUser();
  }, []);

  return (
    <Box
      
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
            fontSize={{ base: "1rem", md: "1rem" }}
          >
            {date}
          </Text>
          <Text  fontSize={{ base: "1rem", md: "1rem" }}>
            Posted By <span style={{fontSize:"18px", fontWeight:"bold", textTransform:"capitalize", fontFamily:"Lugrasimo"}}>{user?.username}</span>
          </Text>
        </Flex>
        <DeleteIcon onClick={()=>handleDlt(postid)} className="icon" cursor={"pointer"} color={"#ff2400"}  zIndex={10}/>
      </Flex>

      <Image onClick={()=>navigate(`/blog/${postid}`)} src={img} alt={title} w={"300px"} m={"auto"} h={"250px"} my={4} />
      <Text fontWeight={"bold"} fontSize={"1.2rem"} fontFamily={"Lugrasimo"}>
        {title}
      </Text>
      <Text onClick={()=>navigate(`/blog/${postid}`)}>
        {description.substring(0, 120) + "......"}
        <Link to={`/blog/${postid}`} style={{ color: "skyblue" }}>
          Read More
        </Link>
      </Text>
    </Box>
  );
};

export default SingleBlog;
