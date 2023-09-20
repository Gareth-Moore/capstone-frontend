import {
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  Image,
  Button,
  Divider,
  ListItem,
  OrderedList,
  ListIcon,
  List,
} from "@chakra-ui/react";
import {
  AiFillStar,
  AiFillCaretRight,
  AiOutlineStar,
  AiOutlineSave,
  AiFillHeart,
  AiOutlineComment,
} from "react-icons/ai";
import { LuVegan, LuWheat } from "react-icons/lu";
import { GiCow } from "react-icons/gi";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { toast } from "react-toastify";
import { useUpdateRecipeMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { setRecipes } from "../slices/currentRecipesSlice";
import ContainerWhite from "./ContainerWhite";
import ContainerBlank from "./ContainerBlank";
import useAddAllShoppingList from "../hooks/useAddAllShoppingList";

const RecipeCard = () => {
  const [useMetric, setUseMetric] = useState(true);
  const createMarkup = (html: any) => ({ __html: html });

  const { recipe } = useSelector((state: any) => state.recipe);
  const { userInfo } = useSelector((state: any) => state.auth);

  const [updateProfile] = useUpdateRecipeMutation();

  const dispatch = useDispatch();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        recipeId: recipe.id,
        recipeName: recipe.title,
      }).unwrap();
      dispatch(setRecipes(res.recipes));

      toast.success("New recipe added!");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleCommentClick = () => {
    const boxElement = document.querySelector("#recipeBox");
    if (boxElement) {
      boxElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onAddIngredients = async () => {
    try {
      await useAddAllShoppingList(recipe.extendedIngredients);
      toast.success("Items added to your shopping list");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      {recipe.id && (
        <Box>
          <ContainerWhite display="flex">
            <Box>
              <VStack
                justify={"flex-start"}
                align={"flex-start"}
                fontSize={{ base: "sm", md: "md" }}
              >
                <Image borderRadius={5} src={recipe.image} w="100%"></Image>
                <Heading
                  mt={5}
                  color={"red.400"}
                  fontFamily={"'Courier Prime', monospace"}
                >
                  {recipe.title}
                </Heading>
                <Text
                  mb={2}
                  lineHeight={1.8}
                  mt={2}
                  fontSize={{ base: "sm", md: "md" }}
                  dangerouslySetInnerHTML={createMarkup(recipe.summary)}
                ></Text>
                <HStack mb={2}>
                  <AiFillStar color="gold" size="24px" />
                  <AiFillStar color="gold" size="24px" />
                  <AiFillStar color="gold" size="24px" />
                  <AiFillStar color="gold" size="24px" />
                  <AiOutlineStar color="gold" size="24px" />
                  <Text>({recipe.aggregateLikes} reviews)</Text>
                </HStack>
                <HStack justify={"center"} w={"100%"} my={5}>
                  {recipe.preparationMinutes < 0 || (
                    <>
                      <VStack>
                        <Text fontWeight={"bold"}>Prep Time</Text>
                        <Text>
                          {Math.floor(recipe.preparationMinutes / 60) > 0
                            ? `${Math.floor(
                                recipe.preparationMinutes / 60
                              )} hr `
                            : ""}
                          {Math.floor(recipe.preparationMinutes % 60) > 0
                            ? `${Math.floor(
                                recipe.preparationMinutes % 60
                              )} min`
                            : ""}
                        </Text>
                      </VStack>

                      <Box
                        h={{ base: "60px", md: "60px" }}
                        borderLeft={"1px solid lightgray"}
                        mx={{ base: 1, md: 5 }}
                      ></Box>
                    </>
                  )}
                  {recipe.cookingMinutes < 0 || (
                    <>
                      <VStack>
                        <Text fontWeight={"bold"}>Cook Time</Text>
                        <Text>
                          {Math.floor(recipe.cookingMinutes / 60) > 0
                            ? `${Math.floor(recipe.cookingMinutes / 60)} hr `
                            : ""}
                          {Math.floor(recipe.cookingMinutes % 60) > 0
                            ? `${Math.floor(recipe.cookingMinutes % 60)} min`
                            : ""}
                        </Text>
                      </VStack>
                      <Box
                        h={{ base: "60px", md: "60px" }}
                        borderLeft={"1px solid lightgray"}
                        mx={{ base: 1, md: 5 }}
                      ></Box>
                    </>
                  )}
                  {recipe.readyInMinutes < 0 || (
                    <VStack>
                      <Text fontWeight={"bold"}>Ready in?</Text>
                      <Text>
                        {Math.floor(recipe.readyInMinutes / 60) > 0
                          ? `${Math.floor(recipe.readyInMinutes / 60)} hr `
                          : ""}
                        {Math.floor(recipe.readyInMinutes % 60) > 0
                          ? `${Math.floor(recipe.readyInMinutes % 60)} min`
                          : ""}
                      </Text>
                    </VStack>
                  )}
                </HStack>
                <HStack
                  flexWrap={"wrap"}
                  justify={"center"}
                  w={"100%"}
                  spacing={10}
                >
                  {recipe.vegan ? (
                    <VStack>
                      <LuVegan size={"48px"} color={"green"} />
                      <Text>Vegan</Text>
                    </VStack>
                  ) : recipe.vegetarian ? (
                    <VStack>
                      <LuVegan size={"48px"} color={"green"} />
                      <Text>Vegetarian</Text>
                    </VStack>
                  ) : null}
                  {!recipe.dairyFree && (
                    <VStack>
                      <GiCow size={"48px"} color={"gray"} />
                      <Text>Dairy</Text>
                    </VStack>
                  )}
                  {!recipe.glutenFree && (
                    <VStack>
                      <LuWheat size={"48px"} color={"gold"} />
                      <Text>Gluten</Text>
                    </VStack>
                  )}
                  {recipe.veryHealthy && (
                    <VStack>
                      <AiFillHeart size={"48px"} color={"red"} />
                      <Text>Healthy</Text>
                    </VStack>
                  )}
                </HStack>
                <VStack align={"flex-start"}>
                  <Text>
                    <strong>Serving Size:</strong> {recipe.servings}
                  </Text>
                  <Text>
                    <strong>Course:</strong>{" "}
                    {recipe.dishTypes[0] ? recipe.dishTypes[0] : "-/"}
                  </Text>
                  <Text>
                    <strong>Cuisine:</strong>{" "}
                    {recipe.cuisines[0] ? recipe.cuisines[0] : "-/"}
                  </Text>
                </VStack>
              </VStack>
              <HStack justify={"center"} mt={8}>
                <Button
                  onClick={handleSave}
                  w={"40%"}
                  bg={"red.400"}
                  color={"white"}
                  _hover={{ bg: "red.500" }}
                >
                  Save
                  <Box ml={3}>
                    <AiOutlineSave size={"24px"} />
                  </Box>
                </Button>
                <Button w={"40%"} onClick={handleCommentClick}>
                  Comment
                  <Box ml={3}>
                    <AiOutlineComment size={"24px"} />
                  </Box>
                </Button>
              </HStack>
            </Box>
          </ContainerWhite>
          <ContainerBlank display="flex">
            <Heading
              fontFamily={"'Courier Prime', monospace"}
              textAlign={"left"}
              mt={50}
            >
              Ingredients
            </Heading>
            <List spacing={4}>
              {recipe.extendedIngredients &&
                recipe.extendedIngredients.map(
                  (ingredient: Ingredient, index: number) => (
                    <ListItem key={index} pl={5}>
                      <ListIcon as={AiFillCaretRight} color={"red.400"} />
                      {ingredient.measures
                        ? useMetric
                          ? `${
                              ingredient.measures.metric.amount % 1 === 0
                                ? ingredient.measures.metric.amount
                                : ingredient.measures.metric.amount.toFixed(2)
                            } ${ingredient.measures.metric.unitShort} ${
                              ingredient.originalName
                            }`
                          : `${
                              ingredient.measures.us.amount % 1 === 0
                                ? ingredient.measures.us.amount
                                : ingredient.measures.us.amount.toFixed(2)
                            } ${ingredient.measures.us.unitShort} ${
                              ingredient.originalName
                            }`
                        : ingredient.name === ""
                        ? false
                        : ingredient.name}
                    </ListItem>
                  )
                )}
            </List>
            <HStack>
              {recipe.sourceName ? (
                <Button mt={5} onClick={() => setUseMetric(!useMetric)}>
                  {useMetric ? "In imperial" : "In metric"}
                </Button>
              ) : (
                <></>
              )}
              <Button
                onClick={onAddIngredients}
                mt={5}
                bg={"red.400"}
                color={"white"}
                _hover={{ bg: "red.500" }}
              >
                Save to shopping list
              </Button>
            </HStack>
            <Heading
              fontFamily={"'Courier Prime', monospace"}
              textAlign={"left"}
              mt={50}
            >
              Instructions
            </Heading>
            <OrderedList spacing={5} pl={3}>
              {recipe.analyzedInstructions.map(
                (instructions: AnalyzedInstruction) =>
                  instructions.steps.map((step, index) =>
                    step.step ? (
                      <ListItem key={index} pl={5}>
                        {step.step}
                      </ListItem>
                    ) : (
                      false
                    )
                  )
              )}
            </OrderedList>
            {recipe.sourceName != "" && (
              <>
                <Divider my={50} borderTop={"1px solid gray"} />
                <Text fontSize={"sm"} fontWeight={"bold"} color={"gray.500"}>
                  Credit: {recipe.sourceName}
                </Text>
                <Text
                  mb={50}
                  as="a"
                  color={"red.400"}
                  target="_blank"
                  href={recipe.sourceUrl}
                  fontSize={"sm"}
                >
                  {recipe.sourceUrl}
                </Text>
              </>
            )}
          </ContainerBlank>
        </Box>
      )}
    </>
  );
};

export default RecipeCard;
