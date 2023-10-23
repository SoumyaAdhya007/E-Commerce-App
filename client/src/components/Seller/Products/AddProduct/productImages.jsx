import { useState, useEffect } from "react";
import {
  Box,
  Image,
  VStack,
  IconButton,
  Flex,
  HStack,
  Button,
} from "@chakra-ui/react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

const ProductImages = ({ images, isMobileOrTablet, handelRemoveImage }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleArrowClick = (direction) => {
    if (direction === "up") {
      setStartIndex(Math.max(startIndex - 1, 0));
    } else if (direction === "down") {
      setStartIndex(Math.min(startIndex + 1, images.length - 4));
    }
  };
  const remove = () => {
    handelRemoveImage(selectedImage);
  };
  return (
    <Flex
      width={isMobileOrTablet ? "98%" : "50%"}
      //   display="flex"
      margin="auto"
      flexDirection={isMobileOrTablet ? "column" : null}
      alignItems="center"
      justifyContent="space-between"
    >
      {isMobileOrTablet ? (
        <HStack
          margin="auto"
          marginTop="10px"
          width="90vw"
          height="auto"
          spacing={0.5}
          order={isMobileOrTablet ? "2" : "1"}
          overflowX="auto"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
          }}
        >
          {images &&
            images.map((image, index) => (
              <Image
                key={index}
                src={image.url}
                alt={`Image ${index}`}
                cursor="pointer"
                minW={"100px"}
                width="150px"
                height="100px"
                borderRadius="md"
                onClick={() => handleImageClick(image)}
              />
            ))}
        </HStack>
      ) : (
        <VStack minWidth="15%" maxWidth="15%" spacing={4} margin="0 10px">
          {images && images.length > 4 && (
            <IconButton
              icon={<ChevronUpIcon />}
              onClick={() => handleArrowClick("up")}
              isDisabled={startIndex === 0}
              variant="ghost"
            />
          )}
          {images.length <= 4
            ? images.map((image, index) => (
                <Image
                  key={index}
                  src={image.url}
                  alt={`Image ${index}`}
                  cursor="pointer"
                  width="150px"
                  height="100px"
                  borderRadius="md"
                  onClick={() => handleImageClick(image)}
                />
              ))
            : images
                .slice(startIndex, startIndex + 4)
                .map((image, index) => (
                  <Image
                    key={index}
                    src={image.url}
                    alt={`Image ${index}`}
                    cursor="pointer"
                    width="150px"
                    height="100px"
                    borderRadius="md"
                    onClick={() => handleImageClick(image)}
                  />
                ))}
          {images.length > 4 && (
            <IconButton
              icon={<ChevronDownIcon />}
              onClick={() => handleArrowClick("down")}
              isDisabled={startIndex === images.length - 4}
              variant="ghost"
            />
          )}
        </VStack>
      )}

      <Box ml={8} margin="auto" order={isMobileOrTablet ? "1" : "2"}>
        <Image
          src={selectedImage.url}
          alt="Selected Image"
          margin="auto"
          width={isMobileOrTablet ? "90vw" : "100vw"}
          height={isMobileOrTablet ? "100%" : "80vh"}
        />
        {images.length > 1 && (
          <Button w={"100%"} colorScheme="red" onClick={remove}>
            Remove
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default ProductImages;
