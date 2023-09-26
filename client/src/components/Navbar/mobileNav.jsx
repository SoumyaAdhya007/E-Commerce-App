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
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../context/context";
import { HamburgerIcon } from "@chakra-ui/icons";
import MobileSubNav from "./mobileSubNav";
import UserOptions from "./userOptions";
const MobileNav = ({ navItems }) => {
  const { isLogedIn, setIsLogedIn, userDetails } = useContext(AccountContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <>
      <HamburgerIcon color="#303030" fontSize="2xl" onClick={onOpen} />
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
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
            {navItems.map((navItem, index) => {
              return !navItem.subcategories && navItem.link ? (
                <Link to={navItem.link}>
                  <Box w={"100%"} textAlign={"center"} mt={5}>
                    <Text as="b" color={"rgba(0, 0, 0, 0.9)"}>
                      {capitalizeFirstLetter(navItem.name)}
                    </Text>
                  </Box>
                </Link>
              ) : !navItem.subcategories && !navItem.link ? (
                <Box w={"100%"} textAlign={"center"} mt={5}>
                  <Text as="b" color={"rgba(0, 0, 0, 0.9)"}>
                    {capitalizeFirstLetter(navItem.name)}
                  </Text>
                </Box>
              ) : (
                <Accordion width="100%" defaultIndex={[0]} allowMultiple>
                  <AccordionItem key={index}>
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
export default MobileNav;
