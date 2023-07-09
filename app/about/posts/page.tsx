"use client";

import instance from "@/app/endpoint/api";
import IPost from "@/app/models/posts.type";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";

export default function Posts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const responce = await instance.get("/posts");
      setPosts(responce.data);
      setLoading(false);
    }

    fetchData();
  }, []);
  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }
  else if(!posts){
    return <h2>No Data Available</h2>
  }
  return (
    <div>
      <Head>
        <title>Lebelo Posts</title>
      </Head>
      <h2>Posts Below</h2>
      {posts.map((post, index) => (
        <ul key={index}>
          <li>{post.title}</li>
        </ul>
      ))}
    </div>
  );
}
