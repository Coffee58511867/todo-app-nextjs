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
import { FiMail, FiLock, FiUser, FiPhone, FiUploadCloud, FiDatabase } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "../styles/Errors.css";
import { uploadError } from "../../Validators/FormValidator";
import axios from "axios";
import IBOOK from "@/app/models/book.type";

export default function Signup() {
  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IBOOK>();

  const onSubmit = async (data: IBOOK) => {
    try {
      console.log(data);

      const response = await axios.post("/api/auth/register", data);
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
                  Experience the Best in Laundry Care
                </Text>
              </Stack>
              <Stack spacing={4} py={13}>
                <Stack direction={{ base: "column", md: "row" }}>
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
                </Stack>
                <Stack direction={{ base: "column", md: "row" }}>
                  <FormControl id="name">
                    <FormLabel>Location</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FiUploadCloud color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Maseru"
                        {...register("location", uploadError.location)}
                      />
                    </InputGroup>
                    {errors?.location && (
                      <p className="error">{errors.location?.message}</p>
                    )}
                  </FormControl>

                  <FormControl id="phone">
                    <FormLabel>Pickup Time</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FiDatabase color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="time"
                        placeholder="6789"
                        {...register("pickupTime", uploadError.pickupTime)}
                      />
                    </InputGroup>
                    {errors?.pickupTime && (
                      <p className="error">{errors.pickupTime?.message}</p>
                    )}
                  </FormControl>
                </Stack>
                <Stack direction={{ base: "column", md: "row" }}>
                  <FormControl id="name">
                    <FormLabel>Pickup Date</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FiUploadCloud color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="date"
                        
                        {...register("pickupDate", uploadError.pickupDate)}
                      />
                    </InputGroup>
                    {errors?.pickupDate && (
                      <p className="error">{errors.pickupDate?.message}</p>
                    )}
                  </FormControl>

                  <FormControl id="phone">
                    <FormLabel>Delivery Time</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FiDatabase color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="time"
                        placeholder="6789"
                        {...register("deliveryTime", uploadError.deliveryTime)}
                      />
                    </InputGroup>
                    {errors?.deliveryTime && (
                      <p className="error">{errors.deliveryTime?.message}</p>
                    )}
                  </FormControl>
                </Stack>
                <Stack direction={{ base: "column", md: "row" }}>
                  <FormControl id="name">
                    <FormLabel>Delivery Date</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FiUploadCloud color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="date"
                        placeholder="Maseru"
                        {...register("deliveryDate", uploadError.deliveryDate)}
                      />
                    </InputGroup>
                    {errors?.deliveryDate && (
                      <p className="error">{errors.deliveryDate?.message}</p>
                    )}
                  </FormControl>

                  <FormControl id="phone">
                    <FormLabel>Laundry Type</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FiDatabase color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="6789"
                        {...register("laundryType", uploadError.laundryType)}
                      />
                    </InputGroup>
                    {errors?.laundryType && (
                      <p className="error">{errors.laundryType?.message}</p>
                    )}
                  </FormControl>
                </Stack>
                <Stack direction={{ base: "column", md: "row" }}>
                  <FormControl id="name">
                    <FormLabel>Laundry Container</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FiUploadCloud color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Maseru"
                        {...register("LaundryContainer", uploadError.LaundryContainer)}
                      />
                    </InputGroup>
                    {errors?.LaundryContainer && (
                      <p className="error">{errors.LaundryContainer?.message}</p>
                    )}
                  </FormControl>

                  <FormControl id="phone">
                    <FormLabel>Quantity</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FiDatabase color="gray.300" />
                      </InputLeftElement>
                      <Input
                        type="number"
                        placeholder="6789"
                        {...register("quantity", uploadError.quantity)}
                      />
                    </InputGroup>
                    {errors?.quantity && (
                      <p className="error">{errors.quantity?.message}</p>
                    )}
                  </FormControl>
                </Stack>

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
                    Submit
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
