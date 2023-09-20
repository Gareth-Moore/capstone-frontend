import dbClient from "../services/db-client";

const useComments = (id: string) => {
  const getComments = async () => {
    try {
      const res = await dbClient.get<Comment[]>("/comments", {
        params: {
          recipeId: id,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (error: any) {
      return error.response.status;
    }
  };
  return getComments;
};

export default useComments;
