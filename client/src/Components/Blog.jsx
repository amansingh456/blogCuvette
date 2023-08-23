import { Box, Button, Flex, Text, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import SingleComment from "./SingleComment";
import imgx from "../pngwing.com.png" 

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
      `http://localhost:4000/api/posts/comments/${id}`
    );

    setTotalComments([...data]);
  }

  useEffect(() => {
    async function fetchPostById() {
      const { data } = await axios.get(
        `http://localhost:4000/api/posts/${id}`
      );
      const userid = data.userid;
      console.log(userid);
      const { data: userData } = await axios.post(
        `http://localhost:4000/api/user/getuser`,
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

    try {
      if (token) {
        const { data } = await axios.post(
          `http://localhost:4000/api/posts/addcomment/${id}`,
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
  console.log(user);
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



      <Flex justifyContent={"space-between"} >
        <Box marginLeft={40}  style={{display:"flex",flexDirection:"column", alignContent:"center", justifyContent:"center"}}>
          <Text fontSize={"2xl"} textAlign={"center"}  fontFamily={"Lugrasimo"} pb={4} textDecoration={"underline"}>
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
          // pb={60}
          >
            {loggedInUser ? (
              <>
                <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
                  Add Your Comment
                </Text>
                <Textarea
                  placeholder="Enter your comment"
                  border={"1px solid gray"}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  colorScheme="yellow"
                  border={"1px solid gray"}
                  onClick={addComment}
                >
                  Submit
                </Button>
              </>
            ) : (
              <>
                <Text fontSize={"2xl"} textAlign={"center"}>
                  please login to comments on this post...
                </Text>
                <Link to="/login">
                  <Button
                    colorScheme="yellow"
                    border={"1px solid gray"}
                    onClick={addComment}
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </Flex>
        </Box>
        <Box marginRight={40}  style={{display:"flex", alignContent:"center", justifyContent:"center"}} width={"auto"}>
            <img src={imgx} width={"50%"} height={"20%"} alt="nothing" />
        </Box>
      </Flex>

    </Box>
  );
};

export default Blog;
