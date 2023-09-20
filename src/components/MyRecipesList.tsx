import {
  Box,
  Collapse,
  HStack,
  Heading,
  List,
  ListItem,
  Show,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { useGetUserRecipesMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { setRecipes } from "../slices/currentRecipesSlice";
import { useDeleteUserRecipeMutation } from "../slices/userApiSlice";
import useRecipeById from "../hooks/useRecipeById";
import { setId, setRecipe } from "../slices/currentRecipeSlice";
import dbClient from "../services/db-client";

interface UserRecipes {
  id: number;
  name: string;
}

const MyRecipesList = () => {
  const [isLargerThanLg] = useMediaQuery("(min-width: 992px)");
  const [isListOpen, setIsListOpen] = useState(false);
  const { recipes } = useSelector((state: any) => state.recipes);
  const fetchRecipeById = useRecipeById(-1);
  const [isHovered, setIsHovered] = useState(-1);

  const dispatch = useDispatch();

  const toggleList = () => {
    if (!isLargerThanLg) {
      setIsListOpen((prevIsListOpen) => !prevIsListOpen);
    }
  };

  const [getRecipes] = useGetUserRecipesMutation();
  const [deleteUserRecipe] = useDeleteUserRecipeMutation();

  const fetchRecipes = async () => {
    try {
      const res = await getRecipes({});
      if ("data" in res) {
        const data = res.data;
        dispatch(setRecipes(data.recipes));
      } else if ("error" in res) {
        const errorMessage = res.error.toString();
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const showSelectedRecipe = async (id: number) => {
    const checkIdLength = id.toString();
    if (checkIdLength.length < 14) {
      try {
        await fetchRecipeById(id);
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      try {
        const res = await dbClient.get("/recipes", {
          params: {
            id: id,
          },
          withCredentials: true,
        });
        console.log({ ...res.data.recipe });
        dispatch(setId(id));
        dispatch(setRecipe({ ...res.data.recipe }));
      } catch (error) {}
    }
  };

  const onDelete = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) => {
    event.stopPropagation();
    try {
      const res = await deleteUserRecipe({ id });
      if ("data" in res) {
        const data = res.data;
        dispatch(setRecipes(data));
        toast.warning("Recipe has been deleted");
      } else if ("error" in res) {
        const errorMessage = res.error.toString();
        toast.error(errorMessage);
      }
    } catch (error) {}
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRecipes();
    setIsListOpen(isLargerThanLg);
  }, [isLargerThanLg]);

  return (
    <>
      <Box color={"white"}>
        <VStack
          pt={5}
          px={{ base: 0, lg: 5 }}
          align={{ base: "center", lg: "start" }}
        >
          <HStack spacing={5} cursor="pointer" onClick={toggleList}>
            <Heading
              fontSize={{ base: "lg" }}
              fontFamily={"'Courier Prime', monospace"}
              mt={1}
            >
              My Recipes
            </Heading>
            <Show below="lg">
              {isListOpen ? (
                <AiOutlineMinusSquare size="24px" />
              ) : (
                <AiOutlinePlusSquare size="24px" />
              )}
            </Show>
          </HStack>
          <Box
            width={{ base: "90%", md: "80%", lg: "100%" }}
            pb={isListOpen ? 5 : 0}
          >
            <Collapse in={isListOpen} animateOpacity>
              <List
                backgroundColor={{ base: "white", lg: "white" }}
                fontWeight={"bold"}
                fontFamily={"'Courier Prime', monospace"}
                color="red.400"
                w={"100%"}
                borderRadius={10}
                p={3}
              >
                {recipes?.length > 0 ? (
                  recipes.map((value: UserRecipes, index: number) => (
                    <ListItem
                      key={index}
                      onClick={() => showSelectedRecipe(value.id)}
                      padding={2}
                      overflow={"none"}
                      whiteSpace={"nowrap"}
                      _hover={{
                        color: "white",
                        cursor: "pointer",
                        bg: "#F56565",
                        borderRadius: 5,
                      }}
                      style={{
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        display: "flex",
                        overflow: "hidden",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(-1)}
                    >
                      <span
                        style={{
                          textOverflow: "ellipsis",
                          maxWidth:
                            isHovered != -1 && isHovered === index
                              ? "calc(100% - 24px)"
                              : "100%",
                          overflow: "hidden",
                        }}
                      >
                        {value.name}
                      </span>
                      {isHovered === index && (
                        <AiOutlineDelete
                          onClick={(event: any) => onDelete(event, value.id)}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </ListItem>
                  ))
                ) : (
                  <ListItem
                    padding={2}
                    overflow={"none"}
                    whiteSpace={"nowrap"}
                    style={{
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                      display: "block",
                      overflow: "hidden",
                    }}
                  >
                    No recipes yet...
                  </ListItem>
                )}
              </List>
            </Collapse>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default MyRecipesList;
