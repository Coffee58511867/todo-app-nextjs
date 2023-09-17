"use client"

import IUserRegiter from "@/app/models/admin.type";
import { Text } from "@chakra-ui/react"
import axios, { isAxiosError } from "axios";
import { error } from "console";
import { useEffect, useState } from "react";

export default function Profile(){

    const [userProfile , setUserProfile] = useState<IUserRegiter[]>([]);
  
    const userId = localStorage.getItem("userId");
     console.log(userId);
     useEffect(() => {
       axios.get('/api/auth/register/' +userId).then((response) => {
        console.log(response.data.user);
        setUserProfile(response.data.user);
       }).catch((error) => {
        console.log(error);
       })
    

     }, [userId]);

     
    return(
        <div>
            <Text fontSize={'4xl'}>Welcome to M4K Laundry {userId}</Text>
        </div>
    )
}