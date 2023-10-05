import React from "react";
import {
  Flex,
  Popover,
  PopoverContent,
  VStack,
  Text,
  PopoverTrigger,
} from "@chakra-ui/react"; // Chakra UI components and hooks
import { Link } from "react-router-dom"; // React Router DOM for navigation
import { capitalizeFirstLetter } from "./capitalizeWordFirstLetter";
const DesktopSubNav = ({ navItems }) => {
  return (
    <>
      {navItems.map((navItem, index) => {
        return (
          <Popover
            key={index}
            trigger="hover"
            placement="bottom"
            strategy="fixed"
          >
            <PopoverTrigger>
              {/* Render a link or text based on the existence of a link */}
              {navItem.link && navItem.link !== "#" ? (
                <Link to={navItem.link}>
                  <Text as="b" color={"rgba(0, 0, 0, 0.9)"}>
                    {capitalizeFirstLetter(navItem.name)}
                  </Text>
                </Link>
              ) : (
                <Text as="b" color={"rgba(0, 0, 0, 0.9)"}>
                  {capitalizeFirstLetter(navItem.name)}
                </Text>
              )}
            </PopoverTrigger>
            {/* Render subcategories if they exist */}
            {navItem.subcategories && (
              <PopoverContent w={"100vw"} mt={2} p={5}>
                <Flex
                  justifyContent={"flex-start"}
                  zIndex={10000}
                  textAlign={"left"}
                  gap={10}
                >
                  {navItem.subcategories.map((subcategory, index) => {
                    return (
                      <VStack key={subcategory._id}>
                        <Text fontSize={"lg"} color={"#494949"} as="b">
                          {capitalizeFirstLetter(subcategory.name)}
                        </Text>
                        {subcategory.subcategories &&
                          subcategory.subcategories.map((nestedsubcategory) => {
                            return (
                              <Link
                                to={`/category/${nestedsubcategory._id.toLocaleLowerCase()}`}
                                key={nestedsubcategory._id}
                              >
                                <Text
                                  fontSize={"md"}
                                  color={"#7f7f7f"}
                                  _hover={{
                                    color: "black",
                                    textDecoration: "underline",
                                  }}
                                >
                                  {capitalizeFirstLetter(
                                    nestedsubcategory.name
                                  )}
                                </Text>
                              </Link>
                            );
                          })}
                      </VStack>
                    );
                  })}
                </Flex>
              </PopoverContent>
            )}
          </Popover>
        );
      })}
    </>
  );
};

export default DesktopSubNav; // Export the DesktopSubNav component
