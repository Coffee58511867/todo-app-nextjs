/* eslint-disable @next/next/no-async-client-component */
"use client";
import React from "react";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <Box>
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
