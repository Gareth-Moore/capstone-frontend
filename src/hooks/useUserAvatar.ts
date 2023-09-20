import { useDispatch } from "react-redux";
import dbClient from "../services/db-client";
import { setImage } from "../slices/userProfileImageSlice";

const useUserAvatar = () => {
  const dispatch = useDispatch();

  const fetchUserAvatar = async (id: string) => {
    try {
      const res = await dbClient.get("/image", {
        params: { userId: id },
        withCredentials: true,
      });
      dispatch(setImage({ myFile: res.data.myFile, userId: id }));
    } catch (error: any) {
      dispatch(
        setImage({ myFile: "src/assets/blank-profile.png", userId: "" })
      );
      console.log(error.message);
    }
  };

  return { fetchUserAvatar };
};

export default useUserAvatar;
