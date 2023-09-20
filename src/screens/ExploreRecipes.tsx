import { VStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import Header from "../components/Header";
import BasicCard from "../components/BasicCard";
import BasicCardGrid from "../components/BasicCardGrid";

const ExploreRecipes = () => {
  const [recipes, setRecipes] = useState<BasicRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<ApiResponse>("/recipes/random", {
          params: {
            number: 12,
          },
        });
        setRecipes(response.data.recipes);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <VStack>
      <Header title={"Back for Seconds?"} image="logo.png" />
      <Text
        color={"gray.600"}
        textAlign={"center"}
        w={{ base: "90%", lg: "80%" }}
      >
        My recipe website is a labor of love, meticulously curated to inspire
        both novice and seasoned chefs alike. Whether you're seeking comfort in
        a hearty stew, embarking on a global gastronomic adventure, or simply
        looking to whip up a quick, delightful treat, our extensive repertoire
        has something to satisfy every palate and craving.
      </Text>
      <BasicCardGrid isLoading={isLoading}>
        {recipes.map((recipe, index) => (
          <BasicCard
            isLoading={isLoading}
            id={recipe.id}
            title={recipe.title}
            key={index}
            image={recipe.image}
          ></BasicCard>
        ))}
      </BasicCardGrid>
    </VStack>
  );
};

export default ExploreRecipes;
