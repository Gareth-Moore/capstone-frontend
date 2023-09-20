import { VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  display: "block" | "flex";
  width?: {
    mdW: string;
    lgW: string;
    xlW: string;
  };
}

const ContainerWhite = ({ children, display, width }: Props) => {
  return (
    <VStack
      mt={50}
      bg={"white"}
      borderRadius={15}
      w={
        width
          ? {
              base: "90%",
              md: `${width.mdW ? width.mdW : "760"}px`,
              lg: `${width.lgW ? width.lgW : "760"}px`,
              xl: `${width.xlW ? width.xlW : "760"}px`,
            }
          : { base: "90%", md: "760px" }
      }
      mx={"auto"}
      p={{ base: 5, md: 10 }}
      border={"1px solid lightgray"}
      align={"flex-start"}
      display={display}
    >
      {children}
    </VStack>
  );
};

export default ContainerWhite;
