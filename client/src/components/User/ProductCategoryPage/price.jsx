import { Box, Flex, Text } from "@chakra-ui/react";

const Price = ({ price, discount }) => {
  return (
    <>
      <Flex>
        <Text fontWeight="800">
          ₹{Math.ceil(price - (discount / 100) * price)}
        </Text>
        <Text fontSize="xs" as="s" margin="5px">
          ₹{price}
        </Text>
      </Flex>
      <Box bg="rgba(234, 241, 247, 0.7)" width="fit-content" padding="2px">
        <Text fontSize="xs">
          <Text as="b">
            {" "}
            ₹{Math.ceil(price - ((discount + 10) / 100) * price)}
          </Text>{" "}
          For TriBe Members
        </Text>
      </Box>
    </>
  );
};
export default Price;
