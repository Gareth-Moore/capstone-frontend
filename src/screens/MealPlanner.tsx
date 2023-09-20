import { useEffect } from "react";

const MealPlanner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div>MealPlanner</div>;
};

export default MealPlanner;
