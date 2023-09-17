"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Text,
  useToast,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiMail, FiLock, FiUser, FiPhone } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "../styles/Errors.css";
import { uploadError } from "../Validators/FormValidator";
import IUserRegiter from "../models/admin.type";
import axios from "axios";
import Navigation from "../components/NavBar/HomeNav";

export default function Signup() {
  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserRegiter>();

  const onSubmit = async (data: IUserRegiter) => {
    try {
      console.log(data);
      const userData = {
       'phoneNumber' : data.phoneNumber,
       'emailAddress' : data.emailAddress,
       'fullName' : data.fullName,
       'password' : data.password,
       'is_admin' : false,
      };
      const response = await axios.post("/api/auth/register", userData);
      console.log(response.data);

      // router.push("/pages/dashboard");
      toast({
        title: "Registration Sucessfully",
        description: response.data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Registration Failed",
        description: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
    <Navigation />
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          
          >
            {" "}
            <Stack align={"center"} mb={{ base: 10 }}>
              <Text fontSize={{ base: "xl", md: "4xl" }}>
                Create an account to join M4K
              </Text>
            </Stack>
            <Stack spacing={4} py={13}>
              <FormControl id="name">
                <FormLabel>Full Names</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiUser color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    {...register("fullName", uploadError.fullName)}
                  />
                </InputGroup>
                {errors?.fullName && (
                  <p className="error">{errors.fullName?.message}</p>
                )}
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Contact No.</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiPhone color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="67891234"
                    {...register("phoneNumber", uploadError.phoneNumber)}
                  />
                </InputGroup>
                {errors?.phoneNumber && (
                  <p className="error">{errors.phoneNumber?.message}</p>
                )}
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiMail color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Email address"
                    {...register("emailAddress", uploadError.emailAddress)}
                  />
                </InputGroup>
                {errors?.emailAddress && (
                  <p className="error">{errors.emailAddress.message}</p>
                )}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...register("password", uploadError.loginpassword)}
                  />
                </InputGroup>
                {errors?.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </FormControl>
              <Stack spacing={7}>
          

                <Button
                 colorScheme="pink"
                  type="submit"
                  size={{ base: "sm", md: "md" }}
                  color={"white"}
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  _hover={{
                    bg: "pink.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
    </>
  );
}
