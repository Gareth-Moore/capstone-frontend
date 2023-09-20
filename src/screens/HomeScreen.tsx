import {
  Stack,
  Flex,
  Image,
  Text,
  useBreakpointValue,
  Button,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const HomeScreen = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex
      width="100%"
      height="calc(100vh - 133px)"
      backgroundImage="url('./src/assets/background-hero.jpg')"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      justify={"center"}
      align={"center"}
    >
      <HStack
        mx={3}
        backgroundColor={"white"}
        height={"350px"}
        justify={"space-between"}
        borderRadius={10}
        align={"flex-start"}
      >
        <Box padding={10}>
          <Text
            fontFamily={"'Courier Prime', monospace"}
            textAlign={"left"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            Back for Seconds?
          </Text>
          <Box display={userInfo && userInfo.firstName ? "none" : "block"}>
            <Text
              mt={5}
              mb={8}
              color={"gray.600"}
              fontWeight={300}
              fontSize={"lg"}
              maxWidth={"400px"}
            >
              With all the recipes under the sun in an easy to find collection
              you'll be cooking up a storm in no time!
            </Text>
            <Stack direction={"row"} mt={"80px"}>
              <Button
                as={Link}
                minWidth={"150px"}
                bg={"red.400"}
                color={"white"}
                _hover={{ bg: "red.500" }}
                to="/login"
              >
                Sign in
              </Button>
              <Button
                as={Link}
                minWidth={"150px"}
                bg={"gray.300"}
                color={"white"}
                _hover={{ bg: "gray.500" }}
                to={"/register"}
              >
                Register
              </Button>
            </Stack>
          </Box>
          <Box>
            <Text
              display={userInfo && userInfo.firstName ? "block" : "none"}
              mt={5}
              mb={8}
              color={"gray.600"}
              fontWeight={300}
              fontSize={"lg"}
              maxWidth={"400px"}
            >
              Welcome! Now that you're signed in, why not take a look around for
              some delicious recipes!
            </Text>
            {userInfo && userInfo.firstName && (
              <Button
                mt={{ base: "10px", sm: "60px" }}
                as={Link}
                minWidth={"100%"}
                bg={"red.400"}
                color={"white"}
                _hover={{ bg: "red.500" }}
                to="/explore-recipes"
              >
                Get started
              </Button>
            )}
          </Box>
        </Box>
        <Image
          display={{ base: "none", md: "block" }}
          src="./src/assets/welcome.jpg"
          height={"100%"}
          borderRightRadius={10}
        ></Image>
      </HStack>
    </Flex>
  );
};

export default HomeScreen;
