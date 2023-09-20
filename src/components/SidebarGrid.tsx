import { Grid, Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Comments from "./Comments";
import React from "react";

interface Props {
  children: ReactNode;
  showComments: boolean;
}

const SidebarGrid = ({ children, showComments }: Props) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", lg: "220px 1fr", xl: "300px 1fr" }}
    >
      <Box
        bg={"red.400"}
        height={{ base: "unset", lg: "unset" }}
        minHeight={{ base: "60px", lg: "calc(100vh - 60px)" }}
      >
        {childrenArray[0]}
      </Box>
      <Box minHeight={"calc(100vh - 60px)"}>
        {childrenArray[1]}

        {showComments && <Comments />}
      </Box>
    </Grid>
  );
};

export default SidebarGrid;
