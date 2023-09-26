import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import Price from "./price";
const ProductCartDetails = ({ title, price, discount }) => {
  return (
    <Box marginTop="10px">
      <Flex justifyContent="space-between">
        <Text fontSize="xs" color="#737385" fontWeight="bold">
          {title}
        </Text>
      </Flex>

      <Price price={price} discount={discount} />
      <Box
        border="0.9px solid #DCDCDC"
        padding="3px"
        color="#737373"
        textAlign="center"
        width="fit-content"
        margin="3px"
      >
        <Text fontSize="sm" fontWeight="400">
          100% COTTON
        </Text>
      </Box>
    </Box>
  );
};
export default ProductCartDetails;
