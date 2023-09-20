import { VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  display: "block" | "flex";
}

const ContainerBlank = ({ children, display }: Props) => {
  return (
    <VStack
      w={{ base: "360px", md: "760px" }}
      mx={"auto"}
      p={{ base: 5, md: 10 }}
      align={"flex-start"}
      display={display}
    >
      {children}
    </VStack>
  );
};

export default ContainerBlank;
