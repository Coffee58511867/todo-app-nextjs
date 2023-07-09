/* eslint-disable @next/next/no-async-client-component */
"use client";
import React from "react";
import {
  Box,
  Button,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const router = useRouter();
  const data = await getData();

  const handleSubmit = async () => {
    try {
      router.push("/items");
      console.log("Clicked Me");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box p={10}>
      <Stack padding={5}>
        <Button
          colorScheme="blue"
          type="submit"
          onClick={() => handleSubmit()}
          size="sm"
        >
          Go to Dashboard
        </Button>
        <Link href="/items">Go to Dashboard</Link>
      </Stack>

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Body</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item: any, index: number) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>{item.title}</Td>
                <Td> {item.title}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
