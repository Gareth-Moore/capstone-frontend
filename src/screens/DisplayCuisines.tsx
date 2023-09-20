import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import BasicCardGrid from "../components/BasicCardGrid";
import BasicCard from "../components/BasicCard";
import apiClient from "../services/api-client";
import { useLocation } from "react-router-dom";

const DisplayCuisines = () => {
  const [recipes, setRecipes] = useState<BasicRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cuisine = searchParams.get("cuisine");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<ApiResponseResults>(
          "/recipes/complexSearch",
          {
            params: {
              cuisine,
              number: 12,
            },
          }
        );
        setRecipes(response.data.results);
        console.log(response.data.results);
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
      {cuisine ? (
        <Header title={cuisine + " Cuisine"} image={`../assets/logo.png`} />
      ) : (
        <Header title={"Back for seconds?"} image={"logo.jpg"} />
      )}

      <BasicCardGrid isLoading={isLoading}>
        {recipes &&
          recipes.length > 0 &&
          recipes.map((recipe, index) => (
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

export default DisplayCuisines;
