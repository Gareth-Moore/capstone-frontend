import { VStack, Skeleton } from "@chakra-ui/react";

const IngredientCardSkeleton = () => {
  return (
    <VStack
      bg={"white"}
      w={"100%"}
      borderRadius={15}
      height={"200px"}
      justify={"space-between"}
      overflow={"hidden"}
      _hover={{ border: "2px solid lightgray" }}
    >
      <Skeleton w={"100%"} h={"100%"}></Skeleton>
    </VStack>
  );
};

export default IngredientCardSkeleton;
