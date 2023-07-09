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
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateItem() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IItem>();

  const router = useRouter();

  const [item, setItem] = useState<IItem[]>([]);
  const params = useParams();
  const id = params.update?.toString();
  console.log(id);

  // useEffect(() => {
  
  //   const fetchItem = async () => {
  //    await todoinstance.get(`/api/v1/items/${id}`).then((res) => {
  //     setItem(res.data);
  //     console.log(res.data);
  //    })
  //   }
  //   fetchItem();
  // }, [id])

  const onSubmit = async (data: IItem) => {
    try {
      await todoinstance.put(`/api/v1/items/${id}`, data).then((response) => {
        console.log(response.data);
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
                  Update
                </Button>
              </Stack>
            </Box>
        </form>
      </Stack>

    </Flex>
  );
}
