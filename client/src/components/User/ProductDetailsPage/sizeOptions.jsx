import { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const SizeOptions = ({ sizeOptions, onSelectSize }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    onSelectSize(size);
  };

  return (
    <Box mt={5}>
      <Text fontSize="md" fontWeight="700">
        Choose Size:
      </Text>
      <Box>
        {sizeOptions.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "solid" : "outline"}
            colorScheme="black"
            onClick={() => handleSizeClick(size)}
            mr={2}
            mt={2}
            bg={selectedSize === size ? "black" : "white"}
            color={selectedSize === size ? "white" : "black"}
          >
            {size}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
export default SizeOptions;
