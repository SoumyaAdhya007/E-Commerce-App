import {
  Flex,
  Popover,
  PopoverContent,
  VStack,
  Text,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const DeskstopSubNav = ({ navItems }) => {
  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  console.log("DeskstopSubNav=>", navItems);
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
                      <VStack key={index}>
                        <Text fontSize={"lg"} color={"#494949"} as="b">
                          {capitalizeFirstLetter(subcategory.name)}
                        </Text>
                        {subcategory.subcategories &&
                          subcategory.subcategories.map((nestedsubcategory) => {
                            return (
                              <Link
                                to={`/category/${nestedsubcategory._id.toLocaleLowerCase()}`}
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
export default DeskstopSubNav;
