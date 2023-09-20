import { Grid } from "@chakra-ui/react";
import Header from "./Header";
import IngredientCard from "./IngredientCard";
import SearchBar from "./SearchBar";
import ContainerBlank from "./ContainerBlank";
import useSearchIngredients from "../hooks/useSearchIngredients";
import { useState } from "react";
import IngredientCardSkeleton from "./IngredientCardSkeleton";

const ShoppingCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const skeleton = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  const [searchResults, setSearchResults] = useState<Ingredient[] | undefined>(
    []
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    search: string
  ) => {
    e.preventDefault();
    setSearchResults([]);
    setIsLoading(true);
    try {
      const res = await useSearchIngredients(search);
      setSearchResults(res);
      console.log(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title={"Shopping List"} image="cart.png"></Header>
      <SearchBar handleSubmit={handleSubmit} />
      <ContainerBlank display={"flex"}>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }}
          w={"100%"}
          gap={5}
        >
          {isLoading &&
            skeleton.map((value) => <IngredientCardSkeleton key={value} />)}
          {searchResults != undefined &&
            searchResults.length > 0 &&
            searchResults.map((value: Ingredient, index: number) => (
              <IngredientCard key={index} ingredient={value} />
            ))}
        </Grid>
      </ContainerBlank>
    </>
  );
};

export default ShoppingCard;
