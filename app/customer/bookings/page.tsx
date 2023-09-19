"use client";
import IBOOK from "@/app/models/book.type";
import {
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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BookingList() {
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const [booking, setBooking] = useState<IBOOK[]>([]);
  const router= useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  useEffect(() => {
    async function fetchBooking() {
      await axios
        .get("/api/v1/book")
        .then((response) => {
          console.log(response.data.bookings);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }

    async function fetchUserBookings() {
      try {
        const response = await axios.get("/api/v1/book/users/" + userId);
        const userBookings = response.data.userBookings;
        console.log(response.data.userBookings);
        console.log("User Bookings:", userBookings);
        setBooking(response.data.userBookings);
        // Handle the user bookings data here
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        // Handle the error
      }
    }
    fetchUserBookings();

    fetchBooking();
  }, [userId]);


  const handleUpdate = (itemId: string) => {
    router.push(`/customer/updatebooking/${itemId}`);
  };

  const handleDelete = async (bookingId : string) => {
   try {
    console.log(bookingId);
    await axios.delete(`/api/v1/book/${bookingId}`).then((response) => {
      console.log(response.data.message);
    }).catch((error) => {
      console.log(error)
    })
   } catch (error) {
    console.log(error);
   }
  }

   const handleDelete2 = async (itemId : string) => {
    try {
     console.log(itemId);
     const response = await axios.delete(`api/v1/book/${itemId}`);
       console.log(response);
   
    } catch (error) {
     console.log(error);
    }

  }

  return (
    <>
      <Text fontSize={"3xl"} color={"gray.600"} p={9}>
        Booking List
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Full Names</Th>
              <Th>Pickup time</Th>
              <Th>Delivery time</Th>
              <Th>Phone Number</Th>
              <Th>Booking Status</Th>
              <Th>Update</Th>
            </Tr>
          </Thead>

          {booking.map((item: IBOOK, index) => (
            <Tbody key={item._id}>
              <Td>{item.fullName}</Td>
              <Td>{item.pickupTime}</Td>
              <Td>{item.deliveryTime}</Td>
              <Td>{item.phoneNumber}</Td>
              <Td>{item.bookingStatus}</Td>
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
                    onClick={() => handleDelete(item._id)}
                    size="sm"
                  >
                    Delete
                  </Button>
                </Td>
            </Tbody>
          ))}
        </Table>
      </TableContainer>

      <form>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update my Booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      </form>
    </>
  );
}
