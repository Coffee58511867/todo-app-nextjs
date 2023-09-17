"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  useToast,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiMail, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "../styles/Errors.css";
import { uploadError } from "../Validators/FormValidator";
import IUserRegiter from "../models/admin.type";
import axios from "axios";
import { verify } from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import Navigation from "../components/NavBar/HomeNav";

export default function Signin() {
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
      const response = await axios.post("/api/auth/v1/login", data);
      console.log(response.data);

      const tk = response.data.token;
      // console.log(tk);

      // Decode the token to get the user ID
      const decodedToken: any = jwtDecode(tk);
      const userId = decodedToken.userId;
      // console.log("User ID:", userId);
      localStorage.setItem("token", tk);
      localStorage.setItem("userId", userId);
      // router.push("/pages/dashboard");
      router.push("/customer");
    } catch (error) {
      console.log(error);
      toast({
        title: "Access denied.",
        description: "wrong username or password",
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
              <Heading fontSize={{ base: "xl", md: "4xl" }}>
                Sign in to your account
              </Heading>
            </Stack>
            <Stack spacing={4} py={13}>
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
                <Link color={"blue.400"} ml="auto" href="/resetPassword">
                  Forgot password?
                </Link>

                <Button
                  bg={"blue.400"}
                  type="submit"
                  size={{ base: "sm", md: "md" }}
                  color={"white"}
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
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
