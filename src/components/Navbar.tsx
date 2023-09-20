("use client");

import {
  Box,
  Image,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import dbClient from "../services/db-client";
import { setImage } from "../slices/userProfileImageSlice";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { userImage } = useSelector((state: any) => state.image);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout({}));

      navigate("/");
    } catch (err: any) {
      toast.error(err?.message || "An error occured while logging out");
    }
  };

  const getUserImage = async () => {
    if (userInfo) {
      const res = await dbClient.get("/image", {
        params: {
          userId: userInfo._id,
        },
        withCredentials: true,
      });
      dispatch(setImage({ ...res.data }));
    }
  };

  useEffect(() => {
    getUserImage();
  }, []);

  return (
    <Box position={"fixed"} top={0} left={0} right={0} zIndex={9999999}>
      <Flex
        bg={useColorModeValue("white", "red.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <RouterLink to="/">
              <Image src="../src/assets/logo.png" w={"48px"} />
            </RouterLink>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {userInfo ? (
            <Flex align={"center"} gap={5}>
              <Avatar src={userImage.myFile} size={"sm"} />
              <Text
                display={{ base: "none", md: "block" }}
                as={RouterLink}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                to={"/login"}
              >
                {userInfo.firstName}
              </Text>

              <Menu>
                <MenuButton
                  bg={"red.400"}
                  color={"white"}
                  fontSize={"sm"}
                  fontWeight={600}
                  as={Button}
                  _hover={{ bg: "red.500" }}
                >
                  Profile
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <>
              <Button
                as={RouterLink}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                to={"/login"}
              >
                Sign In
              </Button>
              <Button
                as={RouterLink}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"red.400"}
                to={"/register"}
                _hover={{
                  bg: "red.500",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("red.400", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as={RouterLink}
                p={2}
                to={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as={RouterLink}
      to={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("red.400", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "white" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={-1} onClick={children && onToggle}>
      <Box
        py={2}
        as={RouterLink}
        to={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        color={useColorModeValue("gray.600", "gray.200")}
        borderRadius={15}
        pl={2}
        _hover={{
          textDecoration: "none",
          bg: "red.400",
          color: "white",
        }}
      >
        <Text fontWeight={600}>{label}</Text>
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box
                as={RouterLink}
                key={child.label}
                py={2}
                px={2}
                borderRadius={15}
                w={"100%"}
                to={child.href}
                _hover={{ bg: "red.400", color: "white" }}
              >
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Explore",
    children: [
      {
        label: "Explore popular recipes",
        href: "/explore-recipes",
      },
      {
        label: "Search",
        href: "/search-recipes",
      },
      {
        label: "Cuisines",
        href: "/cuisines",
      },
    ],
  },
  {
    label: "Shopping List",
    href: "/shopping-list",
  },
  {
    label: "My recipes",
    href: "/my-recipes",
  },

  {
    label: "Upload Recipe",
    href: "/upload-recipe",
  },
];
