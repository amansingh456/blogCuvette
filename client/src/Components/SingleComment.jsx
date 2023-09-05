import { Box, Button, Flex, Image, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const SingleComment = ({ commentid, comment, userid, postid, date }) => {
  const [user, setUser] = useState({});
  const [updateComment, setUpdatedComment] = useState("")
  const navigate = useNavigate()
  const toast = useToast()
  const handleUpdate = async (id) => {
    let token = localStorage.getItem("token")
    if (token) {
      try {
        const { dat } = await axios.patch(
          `https://glamorous-gold-jersey.cyclic.app/api/posts/comments/${id}`, { "comment": updateComment }
        );
        navigate("/")
        // window.location.reload(false)
      } catch (error) {
        console.log('error: ', error);
      }
    }
    else {
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
  const handleDlt = async (id) => {
    let token = localStorage.getItem("token")
    if (token) {
      try {
        const { dat } = await axios.delete(
          `https://glamorous-gold-jersey.cyclic.app/api/posts/comments/${id}`
        );
        navigate("/")
        // window.location.reload(false)
        console.log("jjooojjo")
      } catch (error) {
        console.log('error: ', error);
      }
    }
    else {
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
        `https://glamorous-gold-jersey.cyclic.app/api/user/getuser`,
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
      w={{ base: "95%", sm: "90%", md: "70%" }}
      align={"center"}
      px={{ base: 2, sm: 3, md: 4 }}
      maxW={"container.xl"}
      m={"auto"}
      mb={2}
      height={"auto"}
    >
      <Flex direction={"column"}>
        <Box w={"60px"} p={2}>
          <Image src={user?.image} borderRadius={"40%"} w={"60px"} />
        </Box>
        <Text fontWeight={"bold"}><span style={{ fontSize: "18px", fontWeight: "bold", textTransform: "capitalize", fontFamily: "Lugrasimo" }}>{user?.username}</span></Text>
      </Flex>
      <Flex>

        <Popup className="popup-content" trigger={<EditIcon className="icon" cursor={"pointer"} color={"#138808"} p={1} w={7} h={7} />}
          position="right center">
          <Input placeholder="New Comment" type="text" value={updateComment} onChange={(e) => setUpdatedComment(e.target.value)} />
          <br></br>
          <br></br>
          <Button onClick={() => handleUpdate(commentid)} bg={"#323232"} color={"white"} fontWeight='bold' _hover={{ bg: '#323232' }} borderRadius={"100px"} _focus={{
            boxShadow:
              '0 0 1px 2px rgba(50, 50, 50, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            bg: "#cec0b8",
            color: "#323232"
          }}>
            Update
          </Button>
        </Popup> &nbsp; &nbsp;

        <DeleteIcon onClick={() => handleDlt(commentid)} className="icon" cursor={"pointer"} color={"#ff2400"} p={1} w={7} h={7} />
      </Flex>
      <Flex direction={"column"}>
        <Text fontSize={{ base: "14px", sm: "18px", md: "22px" }}>{comment}</Text>
        <Text textAlign={"right"} fontSize={{ base: "12px", sm: "16px", md: "18px" }}>{date ? date : null}</Text>
      </Flex>
    </Flex>
  );
};

export default SingleComment;
