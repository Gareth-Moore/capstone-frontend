import { Text } from "@chakra-ui/react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import BasicCard from "../components/BasicCard";
import BasicCardGrid from "../components/BasicCardGrid";
import SearchBar from "../components/SearchBar";
import useSearchRecipes from "../hooks/useSearchRecipes";

const SearchRecipes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<BasicRecipe[]>([]);
  const [noResults, setNoResults] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    search: string
  ) => {
    e.preventDefault();
    const searchConcat = search.split(" ").join(",");
    setNoResults(false);
    try {
      setIsLoading(true);
      const res = await useSearchRecipes(searchConcat);
      if (res) {
        setRecipes(res.results);
      }
      if (res && res.results.length === 0) {
        setNoResults(true);
      }
    } catch (error: any) {
      setNoResults(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header title={"Back for Seconds?"} image="logo.png" />
      <Text textAlign={"center"} w={"90%"} mx="auto">
        Search for any recipes by name, tag or ingredient
      </Text>
      <SearchBar handleSubmit={handleSubmit} />
      {noResults && (
        <Text textAlign={"center"} fontWeight={"bold"}>
          No results for your search...
        </Text>
      )}
      <BasicCardGrid isLoading={isLoading}>
        {Object.keys(recipes).length !== 0 &&
          recipes.map((recipe, index) => (
            <BasicCard
              isLoading={isLoading}
              key={index}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
            />
          ))}
      </BasicCardGrid>
    </>
  );
};

export default SearchRecipes;
