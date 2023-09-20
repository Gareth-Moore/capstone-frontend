"use client";

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
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/userApiSlice";
import useUserAvatar from "../hooks/useUserAvatar";

const SignupScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { fetchUserAvatar } = useUserAvatar();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);

  const [register] = useRegisterMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      fetchUserAvatar(res._id);
      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <Box
      width="100%"
      height="calc(100% - 60px)"
      backgroundImage="url('./src/assets/background-hero.jpg')"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Flex align={"center"} justify={"center"} bg={"transparent"}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={10} px={6}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack align={"center"} pb={10}>
                <Heading
                  fontSize={"4xl"}
                  textAlign={"center"}
                  fontFamily={"'Courier Prime', monospace"}
                >
                  Let's get cooking!
                </Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  Sign up now to explore our recipes
                </Text>
              </Stack>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
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
                    bg={"red.400"}
                    color={"white"}
                    _hover={{
                      bg: "red.500",
                    }}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link href="/login" color={"blue.400"}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
};

export default SignupScreen;
