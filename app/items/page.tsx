"use client"

import { useEffect, useState, useRef } from "react";
import React from "react";
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
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

export default function ItemList() {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<IItem>();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await todoinstance.get("/api/v1/items").then((response) => {
          setItems(response.data);
          console.log(response.data);
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
      await todoinstance.delete(`/api/v1/items/${itemId}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (itemId: string) => {
    router.push(`/items/update/${itemId}`);
  };

  const handleUpdateModal = (itemId: string) => {
    const selectedItem = items.find((item) => item._id === itemId);
    setSelectedItem(selectedItem);
    onOpen();
  };

  const handleAddItem = () => {
    router.push("/items/addItem");
  };

 const handleSave =   async() => {
    try {
        // await todoinstance.put(`/api/v1/items/${selectedItem._id}`, {
        //   title: initialRef.current.value,
        //   description: finalRef.current.value,
        // });
        console.log("Item updated successfully!");
      } catch (error) {
        console.log(error);
      }
      onClose();
    onClose();
  };

  if (loading) {
    return <h1>Loading....................</h1>;
  } else if (!items) {
    return <h1>No data available</h1>;
  }

  return (
    <Box>
      <TableContainer>
        <Button
          colorScheme="teal"
          onClick={() => handleAddItem()}
          size="sm"
          style={{ padding: 10 }}
        >
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
                  <Button
                    colorScheme="teal"
                    onClick={() => handleUpdate(item._id)}
                    size="sm"
                  >
                    Update
                  </Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleUpdateModal(item._id)}
                  >
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Title"
                defaultValue={selectedItem?.title || ""}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                ref={finalRef}
                isDisabled
                placeholder="Description"
                defaultValue={selectedItem?.description || ""}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
