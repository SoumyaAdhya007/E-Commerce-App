import {
  Box,
  Button,
  Image,
  Input,
  Text,
  Textarea,
  AspectRatio,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import ProductDetailsForm from "./productDetailsForm";
import axios from "axios";
import { addNewProduct } from "../../../../service/api";
const AddProduct = () => {
  const productDetailsObj = {
    images: [],
    brand: "",
    name: "",
    price: 1,
    discount: 0,
    quantity: 1,
    sizes: [],
    tags: [],
    description: {
      about: "",
      manufactured: "",
      packed: "",
    },
    availability: true,
    categoryId: "",
    categoryies: [],
    sellerId: "64c08720366797888f0a0deb",
  };
  const [productDetails, setProductDetails] = useState(productDetailsObj);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [submit, setSubmit] = useState(false);
  const [url, setUrl] = useState("");

  // Function to handle file selection
  useEffect(() => {
    setProductDetails((prev) => ({
      ...prev,
      images: selectedFiles,
    }));
  }, [selectedFiles]);
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPreviewFiles(files);
    TransformFile(files);
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

      // productDetails.images = selectedFiles;
    }
  };
  const uploadFiles = async () => {
    console.log("Uploading files...", selectedFiles);
    try {
      const response = await axios.post("http://localhost:8080/api/upload", {
        images: selectedFiles,
      });
      console.log("Files uploaded to Cloudinary:", response.data);
      setPreviewFiles([]);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
      setPreviewFiles([]);
      setSelectedFiles([]);
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(productDetails);
    const response = await addNewProduct(productDetails);
    // alert(JSON.stringify(productDetails));
    if (response.status !== 201) {
      alert(response.response.data.message);
    }
    setProductDetails(productDetails);
    setSelectedFiles([]);
    setPreviewFiles([]);
    setLoading(false);
  };
  return loading ? (
    <>
      <Spinner />
    </>
  ) : (
    <Box>
      <Box w={"90%"} m={"auto"}>
        <Text as={"b"} fontSize={"2xl"} textAlign={"center"}>
          Add Product Images
        </Text>
        {previewFiles.length > 0 && (
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
              </Box>
            ))}
          </SimpleGrid>
        )}
        <form onSubmit={handelSubmit}>
          <Input
            type="file"
            name="files"
            accept="image/*"
            multiple
            required
            onChange={handleFileChange}
            // style={{ display: "none" }}
            ref={fileInputRef} // Correctly reference the ref here
          />

          {/* <Button w={"100%"} onClick={() => fileInputRef.current.click()}>
            Select All Files At Once
          </Button> */}
          <ProductDetailsForm
            productDetailsObj={productDetailsObj}
            productDetails={productDetails}
            setProductDetails={setProductDetails}
            handelSubmit={handelSubmit}
          />
          <Button
            w={"100%"}
            bg="#FFD84D"
            fontFamily="montserrat-semibold, sans-serif"
            fontWeight="400"
            _hover={{ backgroundColor: "#ffcd1d" }}
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
