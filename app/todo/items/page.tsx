"use client";
import instance from "@/app/endpoint/api";
import IPost from "@/app/models/posts.type";
import { Box, Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function TodoItems() {
  const [post, setPost] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        instance.get("/posts").then((responce) => {
          setPost(responce.data);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <Center p={20}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  } else if (!post) {
    return <h3>NO DATA AVAILABLE</h3>;
  }

  return (
    <Flex minH={"100vh"} p={10}>
      <Box bg="blue.300" color="white">
        <Heading>Posts Lists Maroba Hlalele</Heading>
        {post.map((item, index) => (
          <Text key={index}>{item.title}</Text>
        ))}
      </Box>
      <Box bg="green.50">
        <Heading>Posts Lists</Heading>
      </Box>
    </Flex>
  );
}
