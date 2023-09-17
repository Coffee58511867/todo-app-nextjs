// // /* eslint-disable @next/next/no-async-client-component */
// // "use client";
// // import React from "react";
// // import {
// //   Box,
// //   Button,
// //   Stack,
// //   Table,
// //   TableContainer,
// //   Tbody,
// //   Td,
// //   Th,
// //   Thead,
// //   Tr,
// // } from "@chakra-ui/react";
// // import { useRouter } from "next/navigation";
// // import Link from "next/link";

// // async function getData() {
// //   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// //   if (!res.ok) {
// //     throw new Error("Failed to fetch data");
// //   }

// //   return res.json();
// // }

// // export default async function Home() {
// //   const router = useRouter();
// //   const data = await getData();

// //   const handleSubmit = async () => {
// //     try {
// //       router.push("/items");
// //       console.log("Clicked Me");
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// //   return (
// //     <Box p={10}>
// //       <Stack padding={5}>
// //         <Button
// //           colorScheme="blue"
// //           type="submit"
// //           onClick={() => handleSubmit()}
// //           size="sm"
// //         >
// //           Go to Dashboard
// //         </Button>
// //         <Link href="/items" style={{ fontWeight: 800, fontSize: 23}}>Go to Dashboard</Link>
// //       </Stack>

// //       <TableContainer>
// //         <Table>
// //           <Thead>
// //             <Tr>
// //               <Th>#</Th>
// //               <Th>Title</Th>
// //               <Th>Body</Th>
// //             </Tr>
// //           </Thead>
// //           <Tbody>
// //             {data.map((item: any, index: number) => (
// //               <Tr key={item.id}>
// //                 <Td>{index + 1}</Td>
// //                 <Td>{item.title}</Td>
// //                 <Td> {item.title}</Td>
// //               </Tr>
// //             ))}
// //           </Tbody>
// //         </Table>
// //       </TableContainer>
// //     </Box>
// //   );
// // }

// "use client";

// import {
//   Flex,
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   Stack,
//   Link,
//   useToast,
//   Button,
//   Heading,
//   useColorModeValue,
//   InputGroup,
//   InputLeftElement,
// } from "@chakra-ui/react";
// import { FiMail, FiLock } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import "./styles/Errors.css";
// import { uploadError } from "./Validators/FormValidator";
// import IUserRegiter from "./models/admin.type";
// import { todoinstance } from "./endpoint/api";
// import axios from "axios";

// export default function Signin() {
//   const toast = useToast();
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<IUserRegiter>();

//   const onSubmit = async (data: IUserRegiter) => {
//     try {
//       console.log(data);
//       await axios.post("/api/auth/v1/login", data).then((responce) => {
//         console.log(responce.data.status);
//         if (responce.data.message === "Authenticated") {
//           console.log(responce.data);
//           localStorage.setItem("token", responce.data.data);
//           router.push("/items");
//         } else {
//           toast({
//             title: "Access denied.",
//             description: "wrong username or password",
//             status: "error",
//             duration: 9000,
//             isClosable: true,
//           });
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Flex
//       minH={"100vh"}
//       align={"center"}
//       justify={"center"}
//       bg={useColorModeValue("gray.50", "gray.800")}
//     >
//       <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           <Box
//             rounded={"lg"}
//             bg={useColorModeValue("white", "gray.700")}
//             boxShadow={"lg"}
//             p={8}
//           >
//             {" "}
//             <Stack align={"center"} mb={{ base: 10 }}>
//               <Heading fontSize={{ base: "xl", md: "4xl" }}>
//                 Sign in to your account
//               </Heading>
//             </Stack>
//             <Stack spacing={4} py={13}>
//               <FormControl id="email">
//                 <FormLabel>Email address</FormLabel>
//                 <InputGroup>
//                   <InputLeftElement pointerEvents="none">
//                     <FiMail color="gray.300" />
//                   </InputLeftElement>
//                   <Input
//                     type="email"
//                     placeholder="Email address"
//                     {...register("emailAddress", uploadError.emailAddress)}
//                   />
//                 </InputGroup>
//                 {errors?.emailAddress && (
//                   <p className="error">{errors.emailAddress.message}</p>
//                 )}
//               </FormControl>
//               <FormControl id="password">
//                 <FormLabel>Password</FormLabel>
//                 <InputGroup>
//                   <InputLeftElement pointerEvents="none">
//                     <FiLock color="gray.300" />
//                   </InputLeftElement>
//                   <Input
//                     type="password"
//                     placeholder="Password"
//                     {...register("password", uploadError.loginpassword)}
//                   />
//                 </InputGroup>
//                 {errors?.password && (
//                   <p className="error">{errors.password.message}</p>
//                 )}
//               </FormControl>
//               <Stack spacing={7}>
//                 <Link color={"blue.400"} ml="auto" href="/resetPassword">
//                   Forgot password?
//                 </Link>

//                 <Button
//                   bg={"blue.400"}
//                   type="submit"
//                   size={{ base: "sm", md: "md" }}
//                   color={"white"}
//                   isLoading={isSubmitting}
//                   loadingText="Submitting"
//                   _hover={{
//                     bg: "blue.500",
//                   }}
//                 >
//                   Sign in
//                 </Button>
//               </Stack>
//             </Stack>
//           </Box>
//         </form>
//       </Stack>
//     </Flex>
//   );
// }

"use client";

import { Text } from "@chakra-ui/react";
import Navigation from "./components/NavBar/HomeNav";

export default function Home() {
  return (
    <>
      <Navigation />
      <Text
        textAlign={"center"}
        fontSize={{ md: "md", lg: "3xl" }}
        color={"pink"}
        padding={10}
      >
        LESOTHO LAUNDRY COMPANY
      </Text>
    </>
  );
}
