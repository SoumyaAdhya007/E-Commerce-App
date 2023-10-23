import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  getOneProduct,
  removeProductImage,
  updateProduct,
} from "../../../../service/api";
import { ToastContainer, toast } from "react-toastify";
import { tostErrorMessage, tostSuccessMessage } from "../../../../service/tost";
import {
  Box,
  Button,
  Flex,
  Spinner,
  useBreakpointValue,
  Input,
  Text,
} from "@chakra-ui/react";
import ProductDetailsForm from "../AddProduct/productDetailsForm";
import ProductImages from "../AddProduct/productImages";
import PreviewImages from "../AddProduct/previewImages";
const EditProduct = () => {
  const { id } = useParams();
  const isMobileOrTablet = useBreakpointValue({ base: true, lg: false });
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [resetSelector, setResetSelector] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await getOneProduct(id);
    if (response.status === 200) {
      setProductDetails(response.data);
      console.log("render", response.data);
    } else {
      tostErrorMessage(response.data.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchProductDetails();
  }, [id]);
  const handelRemoveImage = async (image) => {
    console.log(image);
    const response = await removeProductImage(id, image);
    if (response.status === 200) {
      tostSuccessMessage(response.data.message);
      const removeImage = productDetails.images.filter(
        (img) => img._id !== image._id
      );
      setProductDetails((prev) => ({
        ...prev,
        images: removeImage,
      }));
    } else {
      tostErrorMessage(response.response.data.message);
    }
  };
  const handelAddImage = async (image) => {};

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
  const handelRemovePreviewFiles = async (file) => {};
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
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log("submit", productDetails, selectedFiles);
    setLoading(true);
    const response = await updateProduct(id, {
      product: productDetails,
      newImages: selectedFiles,
    });
    setLoading(false);
    if (response.status === 200) {
      window.location.href = `/seller/product/${id}`;
    } else {
      tostErrorMessage(response.response.data.message);
    }
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
    <Box w={"90%"} m={"auto"}>
      <ToastContainer />
      <ProductImages
        images={productDetails.images}
        isMobileOrTablet={isMobileOrTablet}
        handelRemoveImage={handelRemoveImage}
      />
      <form onSubmit={handelSubmit}>
        <Text as={"b"} fontSize={"2xl"} textAlign={"center"}>
          Add Product Images
        </Text>
        {previewFiles.length > 0 && (
          <PreviewImages
            previewFiles={previewFiles}
            handelRemovePreviewFiles={handelRemovePreviewFiles}
          />
        )}
        <Input
          type="file"
          name="files"
          accept="image/*"
          min={1}
          max={8}
          multiple
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
  );
};
export default EditProduct;
