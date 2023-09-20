import dbClient from "../services/db-client";

const useUpdateShoppingList = async (id: number, name: string) => {
  try {
    const res = await dbClient.post(
      `/shopping-list`,
      { id, name },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error: any) {
    return error.response.status;
  }
};

export default useUpdateShoppingList;
