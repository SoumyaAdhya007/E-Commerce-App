import { SimpleGrid, Box, Image, Button } from "@chakra-ui/react";
const PreviewImages = ({ previewFiles, handelRemovePreviewFiles }) => {
  return (
    <SimpleGrid
      width="100%"
      margin="auto"
      minChildWidth="300px"
      spacing="10px"
      h={"500px"}
      overflowY={"auto"}
    >
      {previewFiles.map((file, index) => (
        <Box key={index}>
          <Image
            src={URL.createObjectURL(file)}
            alt={`Image Preview ${index}`}
            h={"400px"}
            maxw={"400px"}
          />
          {/* <Button
            colorScheme="red"
            onClick={() => handelRemovePreviewFiles(file)}
          >
            Remove
          </Button> */}
        </Box>
      ))}
    </SimpleGrid>
  );
};
export default PreviewImages;
