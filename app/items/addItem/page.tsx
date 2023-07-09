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
import IItem from "@/app/models/item.type";
import { todoinstance } from "@/app/endpoint/api";
import { uploadError } from "@/app/Validators/FormValidator";

export default function AddItem() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IItem>();

  const onSubmit = async (data: IItem) => {
    try {
      await todoinstance.post("/api/v1/items/addItem", data).then((response) => {
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
                    {...register("description", uploadError.body)}
                  />
                  {errors?.description && (
                    <p className="error">{errors.description.message}</p>
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
