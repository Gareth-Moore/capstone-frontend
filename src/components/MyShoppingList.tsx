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
import { useGetShoppingListMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { setShoppingList } from "../slices/shoppingListSlice";
import { useDeleteShoppingListItemMutation } from "../slices/userApiSlice";

const MyRecipesList = () => {
  const [isLargerThanLg] = useMediaQuery("(min-width: 992px)");
  const [isListOpen, setIsListOpen] = useState(false);
  const { shoppingList } = useSelector((state: any) => state.shoppingList);
  const [isHovered, setIsHovered] = useState(-1);

  const dispatch = useDispatch();

  const toggleList = () => {
    if (!isLargerThanLg) {
      setIsListOpen((prevIsListOpen) => !prevIsListOpen);
    }
  };

  const [getShoppingList] = useGetShoppingListMutation();
  const [deleteShoppingListItem] = useDeleteShoppingListItemMutation();

  const onDelete = async (id: number) => {
    try {
      console.log(id);
      const res = await deleteShoppingListItem(id);
      if ("data" in res) {
        const data = res.data;
        dispatch(setShoppingList(data));
        toast.success("Item has been deleted");
      } else if ("error" in res) {
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchShoppingList = async () => {
    try {
      const res = await getShoppingList({});
      if ("data" in res) {
        const data = res.data;
        dispatch(setShoppingList(data));
      } else if ("error" in res) {
        const errorMessage = res.error.toString();
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchShoppingList();
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
              Shopping List
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
                {shoppingList.length > 0 ? (
                  shoppingList.map((value: Ingredient, index: number) => (
                    <ListItem
                      key={index}
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
                        {`${value.name.slice(0, 1).toUpperCase()}${value.name
                          .slice(1)
                          .toLowerCase()}`}
                      </span>
                      {isHovered === index && (
                        <AiOutlineDelete
                          onClick={() => onDelete(value.id)}
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
                    Add items...
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
