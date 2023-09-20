import { VStack, Text, Image, Flex, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useRecipeById from "../hooks/useRecipeById";

interface Props {
  id: number;
  title: string;
  image: string;
  isLoading: boolean;
}

const BasicCard = ({ id, title, image }: Props) => {
  const navigate = useNavigate();
  const fetchRecipeById = useRecipeById(id);

  const handleClick = async () => {
    try {
      await fetchRecipeById(id);
    } catch (error: any) {
      console.log(error.message);
    }
    navigate("/my-recipes");
  };

  return (
    <VStack
      key={id}
      position={"relative"}
      w={"300px"}
      h={"390px"}
      bg={"white"}
      borderRadius={15}
      border={"1px solid lightgray"}
      onClick={handleClick}
    >
      <Image
        src={image}
        h={"300px"}
        objectFit={"cover"}
        borderTopLeftRadius={15}
        borderTopRightRadius={15}
      />
      <Flex h={"70px"} align={"center"}>
        <Text
          color={"gray.700"}
          overflow="hidden"
          fontWeight={"bold"}
          textOverflow="ellipsis"
          maxW="280px"
          maxH="70px"
          textAlign={"center"}
        >
          {title}
        </Text>
      </Flex>
      <Box
        _hover={{ opacity: "1" }}
        borderRadius={15}
        w={"300px"}
        h={"390px"}
        left={"0"}
        top={"0"}
        opacity={"0"}
        position={"absolute"}
        border={"5px solid #F56565"}
      ></Box>
    </VStack>
  );
};

export default BasicCard;
