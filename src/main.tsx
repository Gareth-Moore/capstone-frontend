import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./styles.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignupScreen from "./screens/SignupScreen.tsx";
import LoginSceen from "./screens/LoginScreen.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";
import ProfileScreen from "./screens/ProfileScreen.tsx";
import store from "./store.ts";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.tsx";
import ExploreRecipes from "./screens/ExploreRecipes.tsx";
import SearchRecipes from "./screens/SearchRecipes.tsx";
import MyRecipes from "./screens/MyRecipes.tsx";
import MyShopping from "./screens/MyShoppingList.tsx";
import Cuisines from "./screens/Cuisines.tsx";
import DisplayCuisines from "./screens/DisplayCuisines.tsx";
import MealPlanner from "./screens/MealPlanner.tsx";
import UploadRecipe from "./screens/UploadRecipe.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginSceen />} />
      <Route path="/register" element={<SignupScreen />} />

      {/* Private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/explore-recipes" element={<ExploreRecipes />} />
        <Route path="/search-recipes" element={<SearchRecipes />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/shopping-list" element={<MyShopping />} />
        <Route path="/cuisines" element={<Cuisines />} />
        <Route path="/cuisine/results" element={<DisplayCuisines />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/upload-recipe" element={<UploadRecipe />} />
        {/*ADD TO NEW ROUTE IN useEffect: window.scrollTo(0, 0); */}
      </Route>
    </Route>
  )
);

const variantOutlined = () => ({
  field: {
    _focus: {
      borderColor: "var(--chakra-ui-focus-ring-color)",
      boxShadow: "0 0 0 2px var(--chakra-ui-focus-ring-color)",
    },
  },
});

const variantFilled = () => ({
  field: {
    _focus: {
      borderColor: "var(--chakra-ui-focus-ring-color)",
      boxShadow: "0 0 0 1px var(--chakra-ui-focus-ring-color)",
    },
  },
});

const variantFlushed = () => ({
  field: {
    _focus: {
      borderColor: "var(--chakra-ui-focus-ring-color)",
      boxShadow: "0 1px 0 0 var(--chakra-ui-focus-ring-color)",
    },
  },
});

// Chakra UI theme
export const theme = extendTheme({
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif",
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      ":host,:root": {
        "--chakra-ui-focus-ring-color": "#F56565",
      },
    },
  },
  shadows: {
    outline: "0 0 0 3px var(--chakra-ui-focus-ring-color)",
  },
  components: {
    Input: {
      variants: {
        outline: variantOutlined,
        filled: variantFilled,
        flushed: variantFlushed,
      },
    },
    Select: {
      variants: {
        outline: variantOutlined,
        filled: variantFilled,
        flushed: variantFlushed,
      },
    },
    Textarea: {
      variants: {
        outline: () => variantOutlined().field,
        filled: () => variantFilled().field,
        flushed: () => variantFlushed().field,
      },
    },
  },
});

// font-family: 'Courier Prime', monospace;
// font-family: 'Montserrat', sans-serif;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ChakraProvider>
);
