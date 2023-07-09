"use client";

import { FormControl, FormLabel, Input, SimpleGrid , Button} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ITodo from "../models/todo.type";
import { uploadError } from "../Validators/FormValidator";



export default function AddItem() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<ITodo>();

    const onSubmit = async (data: ITodo) => {
        console.log(data);
    }
  return (
    <SimpleGrid p={20}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input placeholder="Title"    {...register("title", uploadError.title)}/>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input placeholder="Description"   {...register("body", uploadError.body)} />
        </FormControl>
        <Button size='lg' colorScheme='facebook' type="submit">Submit</Button>
      </form>
    </SimpleGrid>
  );
}
