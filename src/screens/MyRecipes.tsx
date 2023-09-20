import SidebarGrid from "../components/SidebarGrid";
import RecipeCard from "../components/RecipeCard";
import MyRecipesList from "../components/MyRecipesList";
import { useEffect } from "react";

const MyRecipes = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SidebarGrid showComments={true}>
      <MyRecipesList />
      <RecipeCard />
    </SidebarGrid>
  );
};

export default MyRecipes;
