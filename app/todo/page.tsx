"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Stack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ITodo from "../models/todo.type";
import { uploadError } from "../Validators/FormValidator";
import instance from "../endpoint/api";

export default function AddItem() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ITodo>();

  const onSubmit = async (data: ITodo) => {
    try {
      await instance.post("/posts", data).then((response) => {
        console.log(response.data);
     })
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
              <Stack spacing={4} py={13}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Title"
                    {...register("title", uploadError.title)}
                  />
                  {errors?.title && (
                    <p className="error">{errors.title.message}</p>
                  )}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Input
                    placeholder="Description"
                    {...register("body", uploadError.body)}
                  />
                  {errors?.body && (
                    <p className="error">{errors.body.message}</p>
                  )}
                </FormControl>
                <Button
                  size="lg"
                  colorScheme="facebook"
                  type="submit"
                  loadingText="Submitting"
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </Stack>
            </Box>
        </form>
      </Stack>

    </Flex>
  );
}
