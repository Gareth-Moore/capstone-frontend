import dbClient from "../services/db-client";

const useAddAllShoppingList = async (ingredients: Ingredient[]) => {
  try {
    const res = await dbClient.post(
      `/shopping-list/addall`,
      { ingredients },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error: any) {
    return error.response.status;
  }
};

export default useAddAllShoppingList;
