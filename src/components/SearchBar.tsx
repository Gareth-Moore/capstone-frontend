import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, search: string) => void;
}

const SearchBar = ({ handleSubmit }: Props) => {
  const [search, setSearch] = useState("");

  return (
    <form onSubmit={(e) => handleSubmit(e, search)}>
      <InputGroup my={5} mx={"auto"} w={{ base: "90%", md: "60%" }}>
        <InputLeftElement children={<SearchIcon color="gray.500" />} />
        <Input
          borderRadius={20}
          placeholder="Enter search"
          variant="outline"
          bg="white"
          display="block"
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputRightElement
          children={<FaArrowRight />}
          as="button"
          type="submit"
        />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
