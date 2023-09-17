"use client"
import IBOOK from "@/app/models/book.type";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BookingList(){
    const userId = localStorage.getItem("userId");
    const [booking, setBooking] = useState<IBOOK[]>([]);

     useEffect(() => {
        async function fetchBooking(){
            await axios.get('/api/v1/book').then((response) => {
                console.log(response.data.bookings);
                setBooking(response.data.bookings);
            }).catch((error) => {
                console.log(error)
            })
        } 
        async function fetchUserBooking(){
            await axios.get("/api/v1/book/" + userId).then((response) => {
                console.log("My Bookings " , response.data.bookings);
            }).catch((error) => {
                console.log(error)
            })
        } 

        fetchBooking();
        fetchUserBooking();
     })
    return(
        <>
        <Text fontSize={'3xl'} color={'gray.600'} p={9}>
            Booking List
        </Text>
        <Text p={10} color={'gray.600'} >
            {booking.map((item : IBOOK, index) => (
                <h1 key={index}>
                    {item.phoneNumber}
                </h1>
            ))}
        </Text>
        
        </>
    )
}