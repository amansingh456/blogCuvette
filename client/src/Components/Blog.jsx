import { Box, Button, Flex, Text, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import SingleComment from "./SingleComment";

const Blog = () => {
  const [data, setData] = useState({});
  const [comment, setComment] = useState("");
  const [totalComments, setTotalComments] = useState([]);
  const toast = useToast();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const loggedInUser = useSelector((state) => state.user);

  async function fetchComments() {
    const { data } = await axios.get(
      `http://13.48.46.179:4003/api/posts/comments/${id}`
    );

    setTotalComments([...data]);
    console.log(totalComments)
    console.log(comment)
  }

  useEffect(() => {
    async function fetchPostById() {
      const { data } = await axios.get(
        `http://13.48.46.179:4003/api/posts/${id}`
      );
      const userid = data.userid;
      const { data: userData } = await axios.post(
        `http://13.48.46.179:4003/api/user/getuser`,
        { userid }
      );
      setUser({ ...userData });
      setData({ ...data });
    }

    fetchPostById();
    fetchComments();
  }, []);

  

  async function addComment() {
    const token = localStorage.getItem("token") || null;
    if (!comment) {
      toast({
        title: "Warning",
        description: "Enter Some Comment..!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    }
    else {
      try {
        if (token) {
          const { data } = await axios.post(
            `http://13.48.46.179:4003/api/posts/addcomment/${id}`,
            { comment },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          toast({
            title: "Success",
            description: data,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setComment("")
          fetchComments();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }

  }
  return (
    <Box bg={"#cec0b8"}>
      <Flex
        direction={"column"}
        align={"center"}
        p={5}
        maxW={"container.xl"}
        m={"auto"}
      >
        <Text fontSize={"xl"} my={2}>
          Posted by <span style={{ fontSize: "18px", fontWeight: "bold", textTransform: "capitalize", fontFamily: "Lugrasimo" }}>{user?.username}</span> on {data.date}
        </Text>
        <Text p={"30px"} fontSize={"3xl"} fontWeight={"bold"} fontFamily={"Lugrasimo"} textDecoration={"underline"}>
          {data.title}
        </Text>
        <Text p={"20px"} textAlign={"left"} letterSpacing={1}>
          &quot;{data.description}&quot;
        </Text>
      </Flex>

      <Box>
        <Text fontSize={"2xl"} textAlign={"center"} fontFamily={"Lugrasimo"} pb={4} textDecoration={"underline"}>
          Comments
        </Text>
        <Flex direction={"column"}>
          {totalComments?.map((comment, i) => {
            return <SingleComment {...comment} key={i} />;
          })}
        </Flex>
        <Flex
          direction={"column"}
          p={5}
          align={"center"}
          gap={4}
          maxW={"container.xl"}
          m={"auto"}
          className="commentz"
          w={{base:"95%", sm:"90%", md:"70%"}}
        >
          {loggedInUser ? (
            <>
              <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
                Add Your Comment
              </Text>
              <Textarea
                placeholder="Enter your comment"
                border={"1px solid gray"}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={addComment} bg={"#323232"} color={"white"} fontWeight='bold' _hover={{ bg: '#323232' }} borderRadius={"100px"} _focus={{
                boxShadow:
                  '0 0 1px 2px rgba(50, 50, 50, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                bg: "#cec0b8",
                color: "#323232"
              }}>
                Submit
              </Button>
            </>
          ) : (
            <>
              <Text fontSize={{base:"18px", sm:"22px", md:"26px"}} textAlign={"center"}>
                please login to comments on this post...
              </Text>
              <Link to="/login">
                <Button bg={"#323232"} color={"white"} fontWeight='bold' _hover={{ bg: '#323232' }} borderRadius={"100px"} _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(50, 50, 50, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                  bg: "#cec0b8",
                  color: "#323232"
                }}>
                  Login
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Box>



    </Box>
  );
};

export default Blog;
