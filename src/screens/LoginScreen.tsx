("use client");

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import useUserAvatar from "../hooks/useUserAvatar";

const LoginSceen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchUserAvatar } = useUserAvatar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      await fetchUserAvatar(res._id);
      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Box
      width="100%"
      height="calc(100vh - 133px)"
      backgroundImage="url('./src/assets/background-hero.jpg')"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Flex align={"center"} justify={"center"} minH={"100%"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack align={"center"} pb={5}>
              <Heading
                fontSize={"4xl"}
                fontFamily={"'Courier Prime', monospace"}
              >
                Welcome back!
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                Sign in and let's get cooking{" "}
              </Text>
            </Stack>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                  >
                    <Text>New user? </Text>
                    <Text color={"blue.400"} as={"a"} href="/register">
                      Register here
                    </Text>
                  </Stack>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    _hover={{
                      bg: "red.500",
                    }}
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default LoginSceen;
