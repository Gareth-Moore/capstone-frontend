import {
  Box,
  Grid,
  HStack,
  Show,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cuisines = () => {
  const [isHovered, setIsHovered] = useState(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cuisines = [
    {
      cuisine: "Eastern European",
      image: "./src/assets/eastern european.jpg",
      description:
        "Eastern European cuisine: Hearty dishes & rich flavors embody the history & traditions of diverse cultures across the region.",
    },
    {
      cuisine: "European",
      image: "./src/assets/european.jpg",
      description:
        "European cuisine: A tapestry of flavors, techniques & ingredients from various countries, reflecting the continent's culinary diversity.",
    },
    {
      cuisine: "French",
      image: "./src/assets/french.jpg",
      description:
        "French cuisine: Elegance meets indulgence, showcasing culinary artistry, delicate flavors & timeless classics from across France.",
    },
    {
      cuisine: "German",
      image: "./src/assets/german.jpg",
      description:
        "German cuisine: Robust sausages, hearty breads & savory dishes celebrate centuries-old traditions & regional specialties.",
    },
    {
      cuisine: "Greek",
      image: "./src/assets/greek.jpg",
      description:
        "Greek cuisine: Sun-soaked flavors & wholesome ingredients harmonize in dishes that embody Mediterranean vibrancy & cultural heritage.",
    },
    {
      cuisine: "Indian",
      image: "./src/assets/indian.jpg",
      description:
        "Indian cuisine: A symphony of spices, colors & aromas tantalize the senses, reflecting a rich tapestry of regional culinary traditions.",
    },
    {
      cuisine: "Irish",
      image: "./src/assets/irish.jpg",
      description:
        "Irish cuisine: From hearty stews to fresh seafood, Ireland's dishes are a reflection of its lush landscapes & warm hospitality.",
    },
    {
      cuisine: "Italian",
      image: "./src/assets/italian.jpg",
      description:
        "Italian cuisine: Time-honored recipes & artisanal ingredients create soul-satisfying dishes that celebrate family & conviviality.",
    },
    {
      cuisine: "Japanese",
      image: "./src/assets/japanese.jpg",
      description:
        "Japanese cuisine: A delicate balance of tradition & innovation, with sublime flavors & meticulous presentation capturing the essence of Japan.",
    },
    {
      cuisine: "Jewish",
      image: "./src/assets/jewish.jpg",
      description:
        "Jewish cuisine: Culinary history & religious traditions intertwine, resulting in dishes rich in symbolism, flavor & cultural significance.",
    },
    {
      cuisine: "Korean",
      image: "./src/assets/korean.jpg",
      description:
        "Korean cuisine: Harmony of bold spices, pickled delights & umami-rich ingredients reflects the dynamic spirit of South Korea.",
    },
    {
      cuisine: "Latin American",
      image: "./src/assets/latin american.jpg",
      description:
        "Latin American cuisine: A fiesta of flavors from across the Americas, blending indigenous ingredients & colonial influences in a vibrant culinary tapestry.",
    },
    {
      cuisine: "Mediterranean",
      image: "./src/assets/mediterranean.jpg",
      description:
        "Mediterranean cuisine: Bountiful produce, olive oil & wholesome ingredients unite in a heart-healthy culinary journey across the Mediterranean region.",
    },
    {
      cuisine: "Mexican",
      image: "./src/assets/mexican.jpg",
      description:
        "Mexican cuisine: Spicy, colorful & festive, Mexico's dishes showcase ancient traditions & complex flavors rooted in Mesoamerican heritage.",
    },
    {
      cuisine: "Middle Eastern",
      image: "./src/assets/middle eastern.jpg",
      description:
        "Middle Eastern cuisine: A tapestry of spices, grains & grilled delights, reflecting the warmth, generosity & hospitality of the region.",
    },
    {
      cuisine: "Nordic",
      image: "./src/assets/nordic.jpg",
      description:
        "Nordic cuisine: Clean, minimalist flavors inspired by nature's bounty, capturing the essence of Scandinavian landscapes & traditions.",
    },
    {
      cuisine: "Southern",
      image: "./src/assets/southern.jpg",
      description:
        "Southern cuisine: Comforting soul food with deep roots, showcasing a mix of flavors, textures & hospitality from the American South.",
    },
    {
      cuisine: "Spanish",
      image: "./src/assets/spanish.jpg",
      description:
        "Spanish cuisine: Bold and vibrant flavors, tapas, and regional specialties paint a culinary portrait of Spain's diverse landscapes and cultures.",
    },
    {
      cuisine: "Thai",
      image: "./src/assets/thai.jpg",
      description:
        "Thai cuisine: A harmonious symphony of sweet, sour, spicy & savory, capturing Thailand's rich culinary heritage & aromatic ingredients.",
    },
    {
      cuisine: "Vietnamese",
      image: "./src/assets/vietnamese.jpg",
      description:
        "Vietnamese cuisine: Fresh herbs, balanced flavors & regional diversity create dishes that tell the story of Vietnam's rich history and culture.",
    },
  ];

  return (
    <>
      <Header
        title={"Cuisines from around the world"}
        image={"logo.png"}
      ></Header>
      <Grid
        w={"fit-content"}
        mx={"auto"}
        mt={25}
        mb={15}
        columnGap={{ base: 2 }}
        rowGap={{ base: 2 }}
        templateColumns={{
          base: "300px",
          md: "300px 300px",
          lg: "600px",
          xl: "600px 600px",
        }}
        justifyContent={"center"}
      >
        {cuisines &&
          cuisines.map((value, index) => (
            <HStack
              as={Link}
              to={`/cuisine/results?cuisine=${value.cuisine}`}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(-1)}
              cursor={"pointer"}
              key={index}
              mt={{ base: 15, md: 0 }}
              position={"relative"}
              h={"300px"}
              bg={"white"}
              gap={0}
              boxSizing="border-box"
              borderRadius={{ base: 15, xl: 0 }}
              border={{ base: "", lg: "1px solid lightgray" }}
              _hover={{
                color: "white",
                bg: "red.400",
              }}
            >
              <Box
                w={"300px"}
                h={"100%"}
                borderTopLeftRadius={{ base: 15, xl: 0 }}
                borderBottomLeftRadius={{ base: 15, xl: 0 }}
                borderTopRightRadius={{ base: 15, lg: 0 }}
                borderBottomRightRadius={{ base: 15, lg: 0 }}
              >
                <Image
                  borderTopLeftRadius={{ base: 15, xl: 0 }}
                  borderBottomLeftRadius={{ base: 15, xl: 0 }}
                  borderTopRightRadius={{ base: 15, lg: 0 }}
                  borderBottomRightRadius={{ base: 15, lg: 0 }}
                  src={value.image}
                  objectFit={"cover"}
                  h={"100%"}
                />
              </Box>
              <Show above="lg">
                <Box
                  borderTopRightRadius={15}
                  borderBottomRightRadius={15}
                  w={{ base: "300px", lg: "450px" }}
                  h={"100%"}
                  p={"40px"}
                >
                  <Heading fontFamily={"'Courier Prime', monospace"}>
                    {value.cuisine.slice(0, 1).toUpperCase() +
                      value.cuisine.slice(1)}
                  </Heading>

                  <Text>{value.description}</Text>
                </Box>
              </Show>
              <Show below="lg">
                <Text
                  bg={
                    isHovered === index ? "red.400" : "rgba(245, 101, 101, 0.7)"
                  }
                  bottom={"0"}
                  w={"100%"}
                  borderBottomRadius={15}
                  textAlign={"center"}
                  position={"absolute"}
                  fontFamily={"'Courier Prime', monospace"}
                  fontSize={"2xl"}
                  pb={15}
                  pt={2}
                  color={"white"}
                >
                  {value.cuisine.slice(0, 1).toUpperCase() +
                    value.cuisine.slice(1)}
                </Text>
              </Show>
              <Show below="lg">
                <Box
                  _hover={{ opacity: "1" }}
                  borderRadius={15}
                  w={"300px"}
                  h={"300px"}
                  left={"0"}
                  top={"0"}
                  opacity={"0"}
                  position={"absolute"}
                  border={"5px solid #F56565"}
                ></Box>
              </Show>
            </HStack>
          ))}
      </Grid>
    </>
  );
};

export default Cuisines;
