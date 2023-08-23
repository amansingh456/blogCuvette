import {
  Box,
  Button,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const CreateBlog = () => {
  const [obj, setOjb] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  async function onSubmit() {
    const token = localStorage.getItem("token") || null;

    try {
      if (token) {
        const { data } = await axios.post(
          "http://localhost:4000/api/posts/addpost",
          obj,
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
        navigate("/");
      } else {
        toast({
          title: "Error",
          description: "Please Login First",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
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

  return (
    <Box bg={"gray.100"}>
      <Box p={4} maxW={"container.xl"} m={"auto"}>
        <Heading>Create Post</Heading>
        <Input
          placeholder="Title"
          mt={4}
          name="title"
          border={"1px solid gray"}
          onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}
        />
        <Input
          placeholder="Image Link"
          mt={2}
          name="image"
          border={"1px solid gray"}
          onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}
        />
        <Textarea
          placeholder="Blog Description"
          mt={2}
          name="description"
          border={"1px solid gray"}
          onChange={(e) => setOjb({ ...obj, [e.target.name]: e.target.value })}
        />
        <Button
          mt={4}
          colorScheme="yellow"
          onClick={onSubmit}
          border={"1px solid gray"}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CreateBlog;
