import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export default function CreateNote() {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };

  const handleCreateBtn = async () => {
    if (title && note && category) {
      const data = {
        title,
        note,
        category,
      };
      await axios
        .post(
          "https://notebook-backend-murex.vercel.app/notes/create",
          data,
          config
        )
        .then(
          () =>
            toast({
              title: "Notes created.",
              description: "We've created your Notes for you.",
              status: "success",
              duration: 5000,
              isClosable: true,
            }),
          setTitle(""),
          setNote(""),
          setCategory("")
        )
        .catch((err) =>
          toast({
            description: err.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        );
    } else {
      toast({
        description: "Please enter the required details.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
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
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="title" isRequired>
                  <FormLabel>title</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="note" isRequired>
                  <FormLabel>note</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="category" isRequired>
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleCreateBtn}
              >
                CreateNote
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
