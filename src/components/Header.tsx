import { VStack, Heading, Image } from "@chakra-ui/react";

interface Props {
  image: string;
  title: string;
}

const Header = ({ image, title }: Props) => {
  return (
    <VStack>
      <Heading
        fontFamily={"'Courier Prime', monospace"}
        fontSize={{ base: "lg", md: "2xl", lg: "4xl" }}
        mt={50}
      >
        {title && title}
      </Heading>
      <Image
        src={`/src/assets/${image && image}`}
        w={{ base: "96px", lg: "128px" }}
        mt={5}
        mb={10}
      />
    </VStack>
  );
};

export default Header;
