import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MobileSubNav = ({ navItem }) => {
  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  console.log("Mobile SubNav:", navItem);
  return (
    <>
      <AccordionPanel pb={4}>
        {navItem.subcategories &&
          navItem.subcategories.map((subcategory, index) => {
            return (
              <Accordion key={index} allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {capitalizeFirstLetter(subcategory.name)}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {subcategory.subcategories &&
                      subcategory.subcategories.map(
                        (nestedsubcategory, index) => {
                          return (
                            <Link
                              key={index}
                              to={`/category/${nestedsubcategory._id}`}
                            >
                              <Text
                                fontSize={"md"}
                                color={"#7f7f7f"}
                                textDecoration="underline"
                              >
                                {capitalizeFirstLetter(nestedsubcategory.name)}
                              </Text>
                            </Link>
                          );
                        }
                      )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            );
          })}
      </AccordionPanel>
    </>
  );
};
export default MobileSubNav;
