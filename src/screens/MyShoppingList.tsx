import ShoppingCard from "../components/ShoppingCard";
import MyShoppingList from "../components/MyShoppingList";
import SidebarGrid from "../components/SidebarGrid";
import { useEffect } from "react";

const MyShopping = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SidebarGrid showComments={false}>
      <MyShoppingList />
      <ShoppingCard />
    </SidebarGrid>
  );
};

export default MyShopping;
