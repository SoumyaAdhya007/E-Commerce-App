import { useState } from "react";
import { Box, Text, Button, Tag, Flex } from "@chakra-ui/react";

const SizeOptions = ({
  selectedSize,
  setSelectedSize,
  sizeOptions,
  setOptions,
}) => {
  // const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (elem) => {
    setSelectedSize(elem.size);
    let arr = [];
    const maxOptions = Math.min(elem.quantity, 10);
    for (let i = 1; i <= maxOptions; i++) {
      arr.push(i);
    }
    setOptions(arr);
  };

  return (
    <Box mt={5}>
      <Text fontSize="md" fontWeight="700">
        Choose Size:
      </Text>
      <Flex gap={2}>
        {sizeOptions.map((elem, index) => (
          <Flex flexDirection={"column"} w={"fit-content"} key={index}>
            <Button
              variant={selectedSize === elem.size ? "solid" : "outline"}
              colorScheme="black"
              onClick={() => handleSizeClick(elem)}
              mr={2}
              mt={2}
              bg={selectedSize === elem.size ? "black" : "white"}
              color={selectedSize === elem.size ? "white" : "black"}
              isDisabled={elem.quantity === 0 ? true : false}
            >
              {elem.size}
            </Button>
            {elem.quantity < 11 ? (
              <Tag
                size={"sm"}
                bg={"rgba(255, 215, 0, 0.6)"}
                color={"#000000"}
                top={"30px"}
              >
                {" "}
                Only {elem.quantity === 1 ? "1 Left" : `${elem.quantity} Lefts`}
              </Tag>
            ) : null}
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
export default SizeOptions;
