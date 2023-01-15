import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useReducer, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SignupReducer, { initialState } from "../reducer/Signup.reducer";

export default function Signup() {
  const navigate = useNavigate();
  const toast = useToast();
  const [state, dispatch] = useReducer(SignupReducer, initialState);
  const { name, email, password, age } = state;
  const [showPassword, setShowPassword] = useState(false);

  const handleSignupBtn = async () => {
    if (name && age && email && password) {
      const data = {
        name,
        age,
        email,
        password,
      };
      await axios
        .post("https://notebook-backend-murex.vercel.app/users/register", data)
        .then(
          () =>
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 5000,
              isClosable: true,
            }),
          navigate("/login")
        )
        .catch((err) =>
          toast({
            description: err.response.data.message,
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
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool Notes ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="Name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      dispatch({ type: "name", payload: e.target.value })
                    }
                    value={name}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="Age" isRequired>
                  <FormLabel>Age</FormLabel>
                  <Input
                    type="number"
                    onChange={(e) =>
                      dispatch({ type: "age", payload: e.target.value })
                    }
                    value={age}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="text"
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
                value={email}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    dispatch({ type: "password", payload: e.target.value })
                  }
                  value={password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
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
                onClick={handleSignupBtn}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to={"/login"} color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
