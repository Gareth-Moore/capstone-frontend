import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Center,
  Input,
  Image,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { BsUpload } from "react-icons/bs";
import convertToBase64 from "../services/convert-image";
import dbClient from "../services/db-client";
import { setImage } from "../slices/userProfileImageSlice";

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [uploadImage, setUploadImage] = useState({ myFile: "", userId: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);

  const [updateProfile] = useUpdateUserMutation();

  useEffect(() => {
    window.scrollTo(0, 0);

    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
  }, [userInfo.setName, userInfo.setEmail]);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        firstName,
        lastName,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("User profile updated!");
    } catch (error: any) {
      console.log(error.message);
    }
    try {
      await dbClient.put(
        "/image",
        { ...uploadImage, userId: userInfo._id },
        {
          withCredentials: true,
        }
      );
      dispatch(
        setImage({ myFile: uploadImage.myFile, userId: uploadImage.userId })
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const base64 = await convertToBase64(file);
    setUploadImage({
      ...uploadImage,
      myFile: base64 as string,
      userId: userInfo._id,
    });
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
      <Flex
        height={"calc(100vh - 60px)"}
        align={"center"}
        justify={"center"}
        bg={"transparent"}
      >
        <form onSubmit={submitHandler}>
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
                  Update Profile
                </Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  Change your profile details below
                </Text>
              </Stack>
              <Stack spacing={4}>
                {!uploadImage.myFile ? (
                  <>
                    <Center>
                      <label htmlFor="file-input">
                        <Box
                          mb={5}
                          w="80px"
                          h="80px"
                          borderRadius="50%"
                          bg="red.400"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          cursor="pointer"
                          border={"2px solid white"}
                          outline={`5px solid #F56565`}
                        >
                          <BsUpload size={50} color={"white"} />{" "}
                        </Box>
                      </label>
                      <Input
                        id="file-input"
                        type="file"
                        w="0"
                        h="0"
                        opacity="0"
                        position="absolute"
                        onChange={handleOnChange}
                      />
                    </Center>

                    <Text textAlign={"center"}>Upload a profile image</Text>
                    <Text textAlign={"center"} mt={-5} fontSize={"sm"}>
                      File types: .jpg, .png, .jpeg
                    </Text>
                  </>
                ) : (
                  <>
                    <Box
                      w={"150px"}
                      h={"150px"}
                      mx={"auto"}
                      mb={15}
                      borderRadius={"50%"}
                      bg={"red"}
                      border={"2px solid white"}
                      outline={`5px solid #F56565`}
                      position="relative"
                    >
                      <Image
                        src={uploadImage.myFile}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderRadius="50%"
                        position="absolute"
                        top="0"
                        left="0"
                      />
                    </Box>
                  </>
                )}
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
                    Update Info
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Flex>
    </Box>
  );
};

export default ProfileScreen;
