import { useEffect, useState } from "react";
import ContainerWhite from "../components/ContainerWhite";
import convertToBase64 from "../services/convert-image";
import Header from "../components/Header";
import { setRecipes } from "../slices/currentRecipesSlice";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Image,
  Text,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { LuVegan, LuWheat } from "react-icons/lu";
import { GiCow } from "react-icons/gi";
import { BsUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import dbClient from "../services/db-client";
import { useUpdateRecipeMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadRecipe = () => {
  const [recipe, setRecipe] = useState<FullRecipe>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
    cheap: false,
    veryPopular: false,
    sustainable: false,
    lowFodmap: false,
    weightWatcherSmartPoints: -1,
    gaps: "",
    preparationMinutes: -1,
    cookingMinutes: -1,
    aggregateLikes: 0,
    healthScore: -1,
    creditsText: "",
    license: "",
    sourceName: "",
    pricePerServing: -1,
    extendedIngredients: [
      {
        id: -1,
        aisle: "",
        image: "",
        consistency: "",
        name: "",
        nameClean: "",
        original: "",
        originalName: "",
        amount: -1,
        unit: "",
        meta: [],
        measures: {
          us: {
            amount: -1,
            unitShort: "",
            unitLong: "",
          },
          metric: {
            amount: -1,
            unitShort: "",
            unitLong: "",
          },
        },
      },
    ],
    id: generatId(),
    title: "",
    readyInMinutes: -1,
    servings: -1,
    sourceUrl: "",
    image: "",
    imageType: "",
    summary: "",
    cuisines: [""],
    dishTypes: [""],
    diets: [""],
    occasions: [""],
    instructions: "",
    analyzedInstructions: [
      {
        name: "",
        steps: [
          {
            number: -1,
            step: "",
            ingredients: [],
            equipment: [],
          },
        ],
      },
    ],
    originalId: null,
    spoonacularSourceUrl: "",
  });
  const [ingredientsArray, setIngredientsArray] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [instructionsArray, setInstructionsArray] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const { userInfo } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [updateProfile] = useUpdateRecipeMutation();

  const styles = {
    label: {
      whiteSpace: "nowrap",
      lineHeight: { base: "30px", md: "50px" },
      borderBottom: "1px solid lightgray",
      h: { base: "30px", md: "50px" },
      bg: "red.400",
      m: 0,
      px: 5,
      fontFamily: "'Courier Prime', monospace;",
      color: "white",
      fontWeight: "bold",
      w: "fit-content",
    },
    inputFocus: {
      border: "none",
      borderBottom: "3px solid #F56565",
      backgroundColor: "#f0f0f055",
      boxShadow: "0 0 0px blue",
    },
    input: {
      border: "none",
      borderBottom: "1px solid lightgray",
      borderRadius: 0,
      bg: "white",
      h: "50px",
    },
  };

  const onIngredientDelete = (index: number) => {
    const updatedArray = [...ingredientsArray];
    updatedArray.splice(index, 1);
    updatedArray.push("");
    setIngredientsArray([...updatedArray]);
    updateRecipeIngredients(updatedArray);
  };

  const onIngredientChange = (value: string, index: number) => {
    const ingredientArray = [...ingredientsArray];
    ingredientArray[index] = value;
    setIngredientsArray([...ingredientArray]);
    updateRecipeIngredients(ingredientArray);
  };

  const onInstructionsDelete = (index: number) => {
    const updatedArray = [...instructionsArray];
    updatedArray.splice(index, 1);
    updatedArray.push("");
    setInstructionsArray([...updatedArray]);
    updateRecipeInstructions(updatedArray);
  };

  const onInstructionsChange = (value: string, index: number) => {
    const updatedArray = [...instructionsArray];
    updatedArray[index] = value;
    setInstructionsArray([...updatedArray]);
    updateRecipeInstructions(updatedArray);
  };

  const updateRecipeIngredients = (ingredients: string[]) => {
    const convertToIngredient = ingredients.map((value) => {
      return { name: value, id: generatId() };
    });
    setRecipe({ ...recipe, extendedIngredients: convertToIngredient });
  };

  const updateRecipeInstructions = (instructions: string[]) => {
    const instructionStructure = [{ steps: [{}] }];

    for (let i = 0; i < instructions.length; i++) {
      instructionStructure[0].steps.push({
        step: instructions[i],
      });
    }
    instructionStructure[0].steps.shift();
    setRecipe({ ...recipe, analyzedInstructions: instructionStructure });
  };

  function generatId() {
    const array = [];
    for (let i = 0; i < 16; i++) {
      array.push(Math.floor(Math.random() * 10));
    }
    return parseInt(array.join(""));
  }

  const formItemGap = 10;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await dbClient.post(
        "/recipes",
        { ...recipe },
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error: any) {
      console.log(error.message);
    }
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
    navigate("/my-recipes");
  };

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const base64 = await convertToBase64(file);

    setRecipe({ ...recipe, image: base64 as string });
  };

  return (
    <Box mb={5}>
      <Header title="Create your own recipe!" image={"logo.png"} />
      <ContainerWhite
        display="block"
        width={{ mdW: "760", lgW: "900", xlW: "900" }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            w={"40px"}
            mx={"auto"}
            borderBottom={"5px solid lightgray"}
            borderRadius={5}
            mt={5}
          ></Box>
          <Heading
            fontFamily={"'Courier Prime', monospace;"}
            textAlign={"center"}
            mt={3}
            mb={10}
            color={"red.400"}
          >
            Recipe
          </Heading>
          {/* Recipe title */}
          <Stack spacing={4} mb={10}>
            {recipe.image === "" ? (
              <>
                <Center>
                  <label htmlFor="file-input">
                    <Box
                      mb={5}
                      w="80px"
                      h="80px"
                      borderRadius="50%"
                      bg="red.400"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      cursor="pointer"
                      border={"2px solid white"}
                      outline={`5px solid #F56565`}
                    >
                      <BsUpload size={50} color={"white"} />{" "}
                    </Box>
                  </label>
                  <Input
                    required={true}
                    id="file-input"
                    type="file"
                    w="0"
                    h="0"
                    opacity="0"
                    position="absolute"
                    onChange={handleOnChange}
                  />
                </Center>

                <Text textAlign={"center"}>Upload a recipe image</Text>
                <Text textAlign={"center"} mt={-5} fontSize={"sm"}>
                  File types: .jpg, .png, .jpeg
                </Text>
              </>
            ) : (
              <>
                <Box
                  w={"100%"}
                  h={"fit-content"}
                  mx={"auto"}
                  mb={15}
                  borderRadius={0}
                  overflow={"hidden"}
                >
                  <Image
                    src={recipe.image}
                    w="100%"
                    objectFit="cover"
                    top="0"
                    left="0"
                  />
                </Box>
              </>
            )}
          </Stack>
          <FormControl
            id="recipe-name"
            display={{ base: "block", md: "flex" }}
            mb={formItemGap}
          >
            <FormLabel sx={styles.label}>Recipe name</FormLabel>
            <Input
              onChange={(event) => (recipe.title = event.target.value)}
              _focus={styles.inputFocus}
              {...styles.input}
              type="text"
              required={true}
              placeholder="Enter recipe name..."
            />
          </FormControl>
          {/* Recipe summary */}
          <FormControl
            id="recipe-summary"
            display={{ base: "block", md: "flex" }}
            mb={formItemGap}
          >
            <FormLabel sx={styles.label}>Description</FormLabel>
            <Textarea
              overflow={"hidden"}
              paddingTop={3}
              onChange={(event) => (recipe.summary = event.target.value)}
              _focus={{ ...styles.inputFocus, h: "200px" }}
              {...styles.input}
              resize={"none"}
              height={"50px"}
              minHeight={"50px"}
              required={true}
              transition={"height 0.3s ease-in-out"}
              placeholder="Enter description..."
            />
          </FormControl>
          {/* Divider */}
          <Box
            w={"40px"}
            mx={"auto"}
            borderBottom={"5px solid lightgray"}
            borderRadius={5}
            mt={"100px"}
          ></Box>
          <Heading
            fontFamily={"'Courier Prime', monospace;"}
            textAlign={"center"}
            mt={3}
            mb={10}
            color={"red.400"}
          >
            Details
          </Heading>
          {/* Recipe times */}
          <Box display={{ base: "block", md: "flex" }}>
            <FormControl
              id="prep-time"
              mb={formItemGap}
              display={{ base: "block", md: "flex" }}
              w={"33.3%"}
            >
              <FormLabel sx={styles.label} w={"16.6%"}>
                Prep
              </FormLabel>
              <Input
                onChange={(event) =>
                  (recipe.preparationMinutes = parseInt(event.target.value))
                }
                _focus={styles.inputFocus}
                {...styles.input}
                type="number"
                w={"unset"}
                required={true}
                placeholder="Minutes"
              />
            </FormControl>
            <FormControl
              id="cook-time"
              mb={formItemGap}
              display={{ base: "block", md: "flex" }}
              w={"33.3%"}
            >
              <FormLabel sx={styles.label} w={"50%"}>
                Cook
              </FormLabel>
              <Input
                onChange={(event) =>
                  (recipe.cookingMinutes = parseInt(event.target.value))
                }
                _focus={styles.inputFocus}
                {...styles.input}
                type="number"
                w={"unset"}
                required={true}
                placeholder="Minutes"
              />
            </FormControl>
            <FormControl
              id="total-time"
              mb={formItemGap}
              display={{ base: "block", md: "flex" }}
              w={"33.3%"}
            >
              <FormLabel sx={styles.label} w={"50%"}>
                Total
              </FormLabel>
              <Input
                onChange={(event) =>
                  (recipe.readyInMinutes = parseInt(event.target.value))
                }
                _focus={styles.inputFocus}
                {...styles.input}
                type="number"
                w={"unset"}
                required={true}
                placeholder="Minutes"
              />
            </FormControl>
          </Box>
          {/* Dietary preferences */}
          <Box>
            <FormControl
              id="recipe-name"
              display={{ base: "block", md: "flex" }}
              mb={formItemGap}
            >
              <FormLabel sx={styles.label}>Preferences</FormLabel>
              <Button
                fontSize={"10px"}
                w={"100%"}
                h={"50px"}
                borderRadius={0}
                bg={recipe.vegetarian ? "green.300" : "#EDF2F7"}
                color={recipe.vegetarian ? "white" : "black"}
                _hover={{
                  bg: recipe.vegetarian ? "green.400" : "#E2E8F0",
                  color: recipe.vegetarian ? "white" : "black",
                }}
                onClick={() =>
                  setRecipe({
                    ...recipe,
                    vegetarian: recipe.vegan ? true : !recipe.vegetarian,
                  })
                }
              >
                <Box mr={1}>
                  <LuVegan size={"20px"} />
                </Box>
                Vegetarian
              </Button>
              <Button
                fontSize={"10px"}
                w={"100%"}
                h={"50px"}
                borderRadius={0}
                bg={recipe.vegan ? "green.300" : "#EDF2F7"}
                color={recipe.vegan ? "white" : "black"}
                _hover={{
                  bg: recipe.vegan ? "green.400" : "#E2E8F0",
                  color: recipe.vegan ? "white" : "black",
                }}
                onClick={() =>
                  setRecipe({
                    ...recipe,
                    vegan: !recipe.vegan,
                    vegetarian: !recipe.vegan ? true : recipe.vegetarian,
                    dairyFree: !recipe.dairyFree ? true : recipe.dairyFree,
                  })
                }
              >
                <Box mr={1}>
                  <LuVegan size={"20px"} />
                </Box>
                Vegan
              </Button>
              <Button
                fontSize={"10px"}
                w={"100%"}
                h={"50px"}
                borderRadius={0}
                bg={recipe.glutenFree ? "green.300" : "#EDF2F7"}
                color={recipe.glutenFree ? "white" : "black"}
                _hover={{
                  bg: recipe.glutenFree ? "green.300" : "#E2E8F0",
                  color: recipe.glutenFree ? "white" : "black",
                }}
                onClick={() =>
                  setRecipe({ ...recipe, glutenFree: !recipe.glutenFree })
                }
              >
                <Box mr={1}>
                  <LuWheat size={"20px"} />
                </Box>
                Gluten Free
              </Button>
              <Button
                fontSize={"10px"}
                w={"100%"}
                h={"50px"}
                borderRadius={0}
                bg={recipe.dairyFree ? "green.300" : "#EDF2F7"}
                color={recipe.dairyFree ? "white" : "black"}
                _hover={{
                  bg: recipe.dairyFree ? "green.300" : "#E2E8F0",
                  color: recipe.dairyFree ? "white" : "black",
                }}
                onClick={() =>
                  setRecipe({
                    ...recipe,
                    dairyFree: recipe.vegan ? true : !recipe.dairyFree,
                  })
                }
              >
                <Box mr={1}>
                  <GiCow size={"30px"} />
                </Box>
                Dairy Free
              </Button>
            </FormControl>
          </Box>
          {/* Servings */}
          <FormControl
            id="servings"
            mb={formItemGap}
            display={{ base: "block", md: "flex" }}
            w={"33.3%"}
          >
            <FormLabel sx={styles.label} w={"16.6%"}>
              Servings
            </FormLabel>
            <Input
              onChange={(event) =>
                (recipe.servings = parseInt(event.target.value))
              }
              _focus={styles.inputFocus}
              {...styles.input}
              type="number"
              w={"unset"}
              required={true}
              placeholder="Serves..."
            />
          </FormControl>
          {/* Dish type */}
          <FormControl
            id="dish-type"
            display={{ base: "block", md: "flex" }}
            mb={formItemGap}
          >
            <FormLabel sx={styles.label}>Dish type</FormLabel>
            <Input
              onChange={(event) =>
                recipe.dishTypes
                  ? (recipe.dishTypes[0] = event.target.value)
                  : false
              }
              _focus={styles.inputFocus}
              {...styles.input}
              type="text"
              required={true}
              placeholder="Enter dish type (breakfast, dessert, etc)..."
            />
          </FormControl>
          {/* Cuisines */}
          <FormControl
            id="cuisines"
            display={{ base: "block", md: "flex" }}
            mb={formItemGap}
          >
            <FormLabel sx={styles.label}>Cuisines</FormLabel>
            <Input
              onChange={(event) =>
                recipe.cuisines
                  ? (recipe.cuisines[0] = event.target.value)
                  : false
              }
              _focus={styles.inputFocus}
              {...styles.input}
              type="text"
              required={true}
              placeholder="Enter cuisine (Thai, Italian, etc)..."
            />
          </FormControl>
          {/* Divider */}
          <Box
            w={"40px"}
            mx={"auto"}
            borderBottom={"5px solid lightgray"}
            borderRadius={5}
            mt={"100px"}
          ></Box>
          <Heading
            fontFamily={"'Courier Prime', monospace;"}
            textAlign={"center"}
            mt={3}
            mb={10}
            color={"red.400"}
          >
            Ingredients
          </Heading>
          {/* Ingredients list */}
          <Box>
            {ingredientsArray.map((_, index) => (
              <Box
                key={index}
                borderRadius={0}
                display={
                  index === 0
                    ? "flex"
                    : ingredientsArray[index - 1]
                    ? "flex"
                    : "none"
                }
              >
                <Box
                  sx={styles.label}
                  borderBottom="1px solid lightgray"
                  h={{ base: "30px", md: "50px" }}
                  bg="red.400"
                  m={0}
                  w="10px"
                >
                  {index + 1}
                </Box>
                <Input
                  onChange={(event) =>
                    event.target.value === ""
                      ? onIngredientChange(" ", index)
                      : onIngredientChange(event.target.value, index)
                  }
                  sx={styles.input}
                  border={""}
                  placeholder="Enter ingredient..."
                  value={ingredientsArray[index]}
                />
                <Button
                  display={ingredientsArray[index] ? "block" : "none"}
                  sx={styles.label}
                  borderRadius={0}
                  ml={5}
                  onClick={() => onIngredientDelete(index)}
                  _hover={{ bg: "red.500" }}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>
          {/* Divider */}
          <Box
            w={"40px"}
            mx={"auto"}
            borderBottom={"5px solid lightgray"}
            borderRadius={5}
            mt={"100px"}
          ></Box>
          <Heading
            fontFamily={"'Courier Prime', monospace;"}
            textAlign={"center"}
            mt={3}
            mb={10}
            color={"red.400"}
          >
            Instructions
          </Heading>
          {/* Instructions list */}
          <Box>
            {instructionsArray.map((_, index) => (
              <Box
                key={index}
                borderRadius={0}
                display={
                  index === 0
                    ? "flex"
                    : instructionsArray[index - 1]
                    ? "flex"
                    : "none"
                }
              >
                <Box
                  sx={styles.label}
                  borderBottom="1px solid lightgray"
                  h={{ base: "30px", md: "50px" }}
                  bg="red.400"
                  m={0}
                  w="10px"
                >
                  {index + 1}
                </Box>
                <Input
                  onChange={(event) =>
                    event.target.value === ""
                      ? onInstructionsChange(" ", index)
                      : onInstructionsChange(event.target.value, index)
                  }
                  sx={styles.input}
                  border={""}
                  value={instructionsArray[index]}
                  placeholder="Enter instruction..."
                />
                <Button
                  display={instructionsArray[index] ? "block" : "none"}
                  sx={styles.label}
                  borderRadius={0}
                  ml={5}
                  onClick={() => onInstructionsDelete(index)}
                  _hover={{ bg: "red.500" }}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>
          <Box
            w={"40px"}
            mx={"auto"}
            borderBottom={"5px solid lightgray"}
            borderRadius={5}
            mt={"100px"}
          ></Box>
          <Button
            type="submit"
            borderRadius={0}
            display={"block"}
            h={{ base: "30px", md: "50px" }}
            bg="red.400"
            mt={10}
            px={5}
            fontFamily="'Courier Prime', monospace;"
            color="white"
            fontWeight="bold"
            w="100%"
          >
            Submit
          </Button>
        </form>
      </ContainerWhite>
    </Box>
  );
};

export default UploadRecipe;
