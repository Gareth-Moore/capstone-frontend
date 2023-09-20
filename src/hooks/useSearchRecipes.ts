import apiClient from "../services/api-client";

interface Results {
  results: BasicRecipe[];
}

const useSearchRecipes = async (search: string) => {
  try {
    const response = await apiClient.get<Results>("/recipes/complexSearch", {
      params: {
        query: search,
        number: 12,
      },
    });
    return { results: response.data.results };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return undefined;
  }
};

export default useSearchRecipes;
