import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Image,
  Input,
  Text,
  SimpleGrid,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { addNewProduct } from "../../../../service/api";
import {
  tostErrorMessage,
  tostSuccessMessage,
  tostWarnMessage,
} from "../../../../service/tost";
import SellerActions from "../sellerActions";
import ProductDetailsForm from "./productDetailsForm";
import PreviewImages from "./previewImages";
const AddProduct = () => {
  // Initial product details object
  const productDetailsObj = {
    images: [],
    brand: "",
    name: "",
    price: 1,
    discount: 0,
    sizes: [],
    tags: [],
    description: {
      about: "",
      manufactured: "",
      packed: "",
    },
    availability: true,
    categoryId: "",
    categories: [],
  };

  const [productDetails, setProductDetails] = useState(productDetailsObj);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [resetSelector, setResetSelector] = useState(false);
  const fileInputRef = useRef(null);

  // Function to handle file selection
  useEffect(() => {
    setProductDetails((prev) => ({
      ...prev,
      images: selectedFiles,
    }));
  }, [selectedFiles]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // Check if the total selected files are less than or equal to 8
    if (selectedFiles.length + files.length <= 8) {
      setPreviewFiles(files);
      TransformFile(files);
    } else {
      // Display a message or alert to the user that they've exceeded the limit
      tostErrorMessage("You can select up to 8 files.");
      event.target.value = "";
      setPreviewFiles([]);
      setSelectedFiles([]);
    }
  };

  const TransformFile = (files) => {
    if (files) {
      files.forEach(async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setSelectedFiles((prev) => [...prev, reader.result]);
        };
      });
    }
  };
  const handelRemovePreviewFiles = async (file) => {
    //   let readerResult;
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onloadend = () => {
    //     setSelectedFiles((prev) => [...prev, reader.result]);
    //     readerResult = reader.result;
    //     console.log(reader.result);
    //     // const previewFiles = selectedFiles.filter(
    //     //   (file) => file !== readerResult
    //     // );
    //     console.log(readerResult);
    //     setSelectedFiles(previewFiles);
    //   };
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (productDetails.sizes.length === 0) {
      return tostErrorMessage("Please add a size and quantity to your product");
    }
    if (productDetails.categories.length === 0) {
      return tostErrorMessage("Please add categories to your product");
    }
    setLoading(true);
    const response = await addNewProduct(productDetails);

    if (response.status !== 201) {
      tostWarnMessage(response.response.data.message);
    }

    if (response.status === 201) {
      tostSuccessMessage("Product Added Successfully");
    }

    // Reset form and state
    setResetSelector(true);
    setProductDetails(productDetailsObj);
    setSelectedFiles([]);
    setPreviewFiles([]);
    setLoading(false);
  };

  return loading ? (
    <Flex h={"500px"} justifyContent={"center"} alignItems={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ) : (
    <Box>
      <ToastContainer />
      <SellerActions />
      <Box w={"90%"} m={"auto"}>
        <Text as={"b"} fontSize={"2xl"} textAlign={"center"}>
          Add Product Images
        </Text>

        {/* <SimpleGrid
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
              </Box>
            ))}
          </SimpleGrid> */}
        {previewFiles.length > 0 && (
          <PreviewImages
            previewFiles={previewFiles}
            handelRemovePreviewFiles={handelRemovePreviewFiles}
          />
        )}

        <form onSubmit={handelSubmit}>
          <Input
            type="file"
            name="files"
            accept="image/*"
            min={1}
            max={8}
            multiple
            required
            onChange={handleFileChange}
            ref={fileInputRef} // Correctly reference the ref here
          />

          <ProductDetailsForm
            productDetails={productDetails}
            setProductDetails={setProductDetails}
            resetSelector={resetSelector}
            handelSubmit={handelSubmit}
          />

          <Button
            w={"100%"}
            bg="#FFD84D"
            fontFamily="montserrat-semibold, sans-serif"
            fontWeight="400"
            _hover="#Ffcd1d"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddProduct;
