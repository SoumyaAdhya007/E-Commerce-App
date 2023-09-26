import {
  Box,
  Text,
  Flex,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ImportExportIcon from "@mui/icons-material/ImportExport";
const ProductDescription = ({ description }) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Flex
                  as="span"
                  flex="1"
                  textAlign="left"
                  alignItems="center"
                  //   justifyContent="center"
                >
                  <StarBorderPurple500OutlinedIcon />
                  <Box ml={2}>
                    <Text as="b">Offers</Text>
                    <Text fontSize="sm" color="#878787">
                      SAVE EXTRA WITH 2 OFFERS
                    </Text>
                  </Box>
                </Flex>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Flex mt={1}>
                <LocalOfferIcon />
                <Text>
                  Get Rs.200 instant discount on your First Purchase above
                  Rs.999. Coupon code - <Text as="b">NEW200</Text>
                </Text>
              </Flex>
              <Flex mt={1}>
                <LocalOfferIcon />
                <Text>
                  Whistles! Get extra 20% Cashback on prepaid orders above
                  Rs.499. Coupon code - <Text as="b">NEW20</Text>. Applicable
                  for new customers only!
                </Text>
              </Flex>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Flex
                  as="span"
                  flex="1"
                  textAlign="left"
                  alignItems="center"
                  //   justifyContent="center"
                >
                  <ImportExportIcon />
                  <Box ml={2}>
                    <Text as="b">15 Days Returns & Exchange</Text>
                    <Text fontSize="sm" color="#878787">
                      Know about return & exchange policy
                    </Text>
                  </Box>
                </Flex>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>
                Easy returns upto 15 days of delivery. Exchange available on
                select pincodes
              </Text>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Flex
                  as="span"
                  flex="1"
                  textAlign="left"
                  alignItems="center"
                  //   justifyContent="center"
                >
                  <LibraryBooksIcon />
                  <Box ml={2}>
                    <Text as="b">Product Description</Text>
                    <Text fontSize="sm" color="#878787">
                      Product Description
                    </Text>
                  </Box>
                </Flex>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>{description.about}</Text>

              <Text>
                <Text as="b">Manufactured By</Text> -{description.manufactured}
              </Text>
              <Text>
                <Text as="b"> Packed By</Text> -{description.packed}
              </Text>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};
export default ProductDescription;
