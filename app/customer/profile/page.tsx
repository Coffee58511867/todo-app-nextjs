"use client"

import { Text } from "@chakra-ui/react"

export default function Profile(){
  
    const userId = localStorage.getItem("userId");
     console.log(userId);
    return(
        <div>
            <Text fontSize={'4xl'}>Welcome to M4K Laundry {userId}</Text>
        </div>
    )
}