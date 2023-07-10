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
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import IItem from "@/app/models/item.type";
import { useRouter } from "next/navigation";
import { todoinstance } from "@/app/endpoint/api";
import { uploadError } from "@/app/Validators/FormValidator";
import withAuth from "@/app/withAuth/page";

function AddItem() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IItem>();

  const router = useRouter();

  const onSubmit = async (data: IItem) => {
    try {
      await todoinstance.post("/api/v1/items/addItem", data).then((response) => {
       router.push("/items");
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
              <Stack align={"center"} mb={{ base: 10 }}>
              <Heading fontSize={{ base: "xl", md: "4xl" }}>
               Add New Item To List
              </Heading>
            </Stack>
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
export default withAuth(AddItem);
