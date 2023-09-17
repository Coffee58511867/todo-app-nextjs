"use client";
import IBOOK from "@/app/models/book.type";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BookingList() {
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const [booking, setBooking] = useState<IBOOK[]>([]);

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
        const response = await axios.get("/api/v1/users/" + userId);
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
            </Tr>
          </Thead>

          {booking.map((item: IBOOK, index) => (
            <Tbody key={item._id}>
              <Td>{item.fullName}</Td>
              <Td>{item.pickupTime}</Td>
              <Td>{item.deliveryTime}</Td>
              <Td>{item.phoneNumber}</Td>
              <Td>{item.bookingStatus}</Td>
            </Tbody>
          ))}
        </Table>
      </TableContainer>
    </>
  );
}
