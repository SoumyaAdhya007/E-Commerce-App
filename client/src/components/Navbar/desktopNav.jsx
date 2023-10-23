import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../images/logo.png";
import {
  Flex,
  Image,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
  Button,
  Box,
} from "@chakra-ui/react"; // Chakra UI components and hooks
import { AccountContext } from "../../context/context"; // Account context for user information
import { Search2Icon } from "@chakra-ui/icons"; // Chakra UI icon
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined"; // Material-UI icon
import SearchBox from "./searchBox"; // SearchBox component
import DeskstopSubNav from "./desktopSubNav"; // DesktopSubNav component
import MobileNav from "./mobileNav"; // MobileNav component
import User from "./user"; // User component
import { useLocation } from "react-router-dom"; // React Router DOM for location

const DesktopNav = ({ navItems }) => {
  // User context and state variables
  const { isLogedIn, setIsLogedIn, userDetails } = useContext(AccountContext);
  // Drawer state
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Location information
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const onSellerPage = currentPath.includes("seller");

  // Responsive breakpoint
  const isDesktop = useBreakpointValue({ md: false, lg: true });

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        {!isDesktop && <MobileNav navItems={navItems} />}
        {/* Render MobileNav component if not on desktop */}

        <Flex alignItems={"center"} justifyContent={"space-between"} gap={20}>
          {/* Link to the dashboard or home page */}
          <Link to={isLogedIn && onSellerPage ? "/seller/dashboard" : "/"}>
            {/* Display the logo */}
            <Image w={100} h={8} src={Logo} ml={5} />
          </Link>
          {isDesktop && (
            <Flex justifyContent={"space-between"} gap={10}>
              {/* Render desktop navigation sub-items */}
              <DeskstopSubNav navItems={navItems} />
            </Flex>
          )}
        </Flex>
        <Flex gap={3} alignItems="center" justifyContent={"space-between"}>
          {isDesktop ? (
            // Render a search box for desktop view
            <SearchBox width={"22vw"} />
          ) : (
            <>
              {/* Render search icon for non-desktop view, opening a drawer on click */}
              <Search2Icon color="#303030" fontSize="2xl" onClick={onOpen} />
              <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerBody>
                    {/* Render search box in the drawer */}
                    <SearchBox width={"100%"} />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          )}
          {isLogedIn && Object.keys(userDetails).length !== 0 && isDesktop ? (
            // Render user information for logged-in users in desktop view
            <User />
          ) : isDesktop ? (
            // Render login button for desktop view
            <Link to="/login">
              <Button bg={"transparent"}>Login</Button>
            </Link>
          ) : null}
          {/* Render a link to the cart */}
          {!onSellerPage && (
            <Link to="/cart">
              <Box mr={3}>
                <ShoppingBagOutlinedIcon fontSize="large" color="#303030" />
                {/* {userDetails.cart.length > 0 && (
                  <Badge
                    count={userDetails.cart.length}
                    background="red"
                    color="white"
                    position={{ top: "10%", right: "-10%" }}
                  />
                )} */}
              </Box>
            </Link>
          )}
        </Flex>
      </Flex>
    </>
  );
};
export default DesktopNav; // Export the DesktopNav component
const Badge = ({ count }) => {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "-40px",
          right: "-11px",
          background: "#FDD835",
          color: "#4B4010",
          padding: "1px 7px",
          borderRadius: "50%",
        }}
      >
        {count}
      </span>
    </span>
  );
};
