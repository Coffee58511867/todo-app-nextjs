"use client"
import { Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";

export default function BookingList(){
    
     useEffect(() => {
        async function fetchBooking(){
            await axios.get('/api/v1/book').then((response) => {
                console.log(response.data.bookings);
            }).catch((error) => {
                console.log(error)
            })
        } 
        async function fetchUserBooking(){
            await axios.get('/api/v1/book').then((response) => {
                console.log(response.data.bookings);
            }).catch((error) => {
                console.log(error)
            })
        } 

        fetchBooking();
     })
    return(
        <>
        <Text fontSize={'3xl'} color={'gray.600'} p={9}>
            Booking List
        </Text>
        
        </>
    )
}