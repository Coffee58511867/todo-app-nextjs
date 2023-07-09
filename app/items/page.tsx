"use client";
import { useEffect, useState } from "react";
import IItem from "../models/item.type";
import { todoinstance } from "../endpoint/api";
import { useRouter } from "next/navigation";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";

export default function ItemList() {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await todoinstance.get("/api/v1/items").then((responce) => {
          setItems(responce.data);
          console.log(responce.data);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (itemId: string) => {
    try {
      await  todoinstance.delete(`/api/v1/items/${itemId}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (itemId: string) => {
    router.push(`/items/update/${itemId}`);
  };

  const handleAddItem = () => {
    router.push("/items/addItem");
  }

  if (loading) {
    return <h1>Loading....................</h1>;
  } else if (!items) {
    return <h1>No data available</h1>;
  }
  return (
    <TableContainer>
      <Button colorScheme="teal" 
      onClick={() => handleAddItem()}
      size="sm" style={{padding: 10}}>
        Add New Item
      </Button>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Action</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{item.title}</Td>
              <Td>{item.description}</Td>
              <Td>
                <Button colorScheme="teal"
                 onClick={() => handleUpdate(item._id)}
                size="sm">
                  Update
                </Button>
              </Td>
              <Td>
                {" "}
                <Button colorScheme="red" size="sm"  onClick={() => handleDelete(item._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
