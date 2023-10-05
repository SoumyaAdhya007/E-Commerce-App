import React from "react";
import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react"; // Chakra UI components
import { Link } from "react-router-dom"; // React Router DOM for navigation
import { capitalizeFirstLetter } from "./capitalizeWordFirstLetter"; // Function to capitalize the first letter of a word

const MobileSubNav = ({ navItem }) => {
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

export default MobileSubNav; // Export the MobileSubNav component
