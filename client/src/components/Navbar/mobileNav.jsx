import React, { useContext } from "react";
import {
  Box,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react"; // Chakra UI components and hooks
import { Link } from "react-router-dom"; // React Router DOM for navigation
import { AccountContext } from "../../context/context"; // Account context for user information
import { HamburgerIcon } from "@chakra-ui/icons"; // Chakra UI icon
import MobileSubNav from "./mobileSubNav"; // MobileSubNav component
import UserOptions from "./userOptions"; // UserOptions component
import { capitalizeFirstLetter } from "./capitalizeWordFirstLetter"; // Function to capitalize the first letter of a word

const MobileNav = ({ navItems }) => {
  // User context and state variables
  const { isLogedIn, setIsLogedIn, userDetails } = useContext(AccountContext);

  // Drawer state
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HamburgerIcon color="#303030" fontSize="2xl" onClick={onOpen} />
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {/* Render user information or welcome message */}
            {isLogedIn && Object.keys(userDetails).length !== 0 ? (
              <Text as="b" fontSize="xl">
                Hello{" "}
                {userDetails.name.split(" ")[0]
                  ? userDetails.name.split(" ")[0]
                  : userDetails.name}
              </Text>
            ) : (
              <>
                <Text as="b" fontSize="lg">
                  Welcome User
                </Text>
                <Link to="/login">
                  <Text
                    textAlign="left"
                    textDecoration={"underline"}
                    color="rgba(0,0,0,.5)"
                    fontSize="2xl"
                  >
                    LOGIN/SIGNUP
                  </Text>
                </Link>
              </>
            )}
          </DrawerHeader>
          <DrawerBody>
            {/* Render navigation items */}
            {navItems.map((navItem, index) => {
              return !navItem.subcategories && navItem.link ? (
                <Link to={navItem.link} key={index}>
                  <Box w={"100%"} textAlign={"center"} mt={5}>
                    <Text as="b" color={"rgba(0, 0, 0, 0.9)"}>
                      {capitalizeFirstLetter(navItem.name)}
                    </Text>
                  </Box>
                </Link>
              ) : !navItem.subcategories && !navItem.link ? (
                <Box key={index} w={"100%"} textAlign={"center"} mt={5}>
                  <Text as="b" color={"rgba(0, 0, 0, 0.9)"}>
                    {capitalizeFirstLetter(navItem.name)}
                  </Text>
                </Box>
              ) : (
                <Accordion
                  key={index}
                  width="100%"
                  defaultIndex={[0]}
                  allowMultiple
                >
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          {capitalizeFirstLetter(navItem.name)}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <MobileSubNav navItem={navItem} />
                  </AccordionItem>
                </Accordion>
              );
            })}

            {/* Render user profile options if logged in */}
            {isLogedIn && (
              <Box mt={5}>
                <Text textAlign="left" color="rgba(0,0,0,.5)">
                  MY PROFILE
                </Text>
                <UserOptions />
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav; // Export the MobileNav component
