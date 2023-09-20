import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
}

const BasicCardGrid = ({ children, isLoading }: Props) => {
  const skeletons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
      alignItems={"center"}
      justifyItems={"center"}
      maxWidth={{ md: "700px", lg: "1100px" }}
      mx={"auto"}
      gridGap={10}
      padding={10}
    >
      {isLoading &&
        skeletons.map((value) => (
          <Box
            key={value}
            w={"300px"}
            h={"390px"}
            bg={"white"}
            borderTopRightRadius={15}
            borderBottomLeftRadius={15}
            border={"1px solid lightgray"}
            borderLeft={"1px solid lightgray"}
          >
            <Skeleton w={"100%"} h={"300px"}></Skeleton>
            <SkeletonText w={"100%"} h={"90px"}></SkeletonText>
          </Box>
        ))}
      {children}
    </Grid>
  );
};

export default BasicCardGrid;
