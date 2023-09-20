import apiClient from "../services/api-client";

interface Results {
  results: Ingredient[];
}

const useRecipeById = async (search: string) => {
  console.log("started search");
  try {
    const res = await apiClient.get<Results | undefined>(
      `/food/ingredients/search`,
      {
        params: {
          query: search,
          number: 20,
        },
      }
    );
    console.log(res);
    if (res) {
      return res?.data?.results;
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export default useRecipeById;
