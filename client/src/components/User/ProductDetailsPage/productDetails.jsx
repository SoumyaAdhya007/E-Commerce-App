import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Tag,
  Flex,
  HStack,
  useBreakpointValue,
  Button,
  Spinner,
} from "@chakra-ui/react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Navbar from "../../Navbar/navbar";
import Footer from "../Footer/footer";
import ProductCard from "../ProductCategoryPage/productCard";
import ImageSlider from "./imageSlider";
import SizeOptions from "./sizeOptions";
import ProductDescription from "./productDescription";
import Options from "../Cart/options";
import { ToastContainer, toast } from "react-toastify";
import { tostErrorMessage, tostSuccessMessage } from "../../../service/tost";
import {
  getOneProduct,
  getProducts,
  addToCart,
  jwt_expired,
} from "../../../service/api";
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [options, setOptions] = useState([]);
  const isMobileOrTablet = useBreakpointValue({ base: true, lg: false });
  const fetchOneProduct = async () => {
    setLoading(true);
    const response = await getOneProduct(id);
    if (response.status === 200) {
      setProductDetails(response.data);
    } else {
      alert(JSON.stringify(response));
      setProductDetails([]);
    }
    const products = await getProducts(response.data.categoryId);
    setSimilarProducts(products);
    setLoading(false);
  };
  useEffect(() => {
    fetchOneProduct();
  }, [id]);
  const handleSizeSelection = (elem) => {
    setSelectedSize(elem.size);
    // Perform any other actions based on the selected size
  };
  const hnadelAddToCart = async () => {
    if (!selectedSize) {
      return tostErrorMessage("Please select a size.");
    }
    setAddToCartLoading(true);
    const response = await addToCart({
      productId: productDetails._id,
      quantity: selectedQty,
      size: selectedSize,
    });
    if (response.status === 200) {
      tostSuccessMessage(response.data.message);
    } else if (
      response.response.data.message === "jwt_expired" ||
      response.response.data.message === "Access Denied"
    ) {
      tostErrorMessage("Please Login to add to cart");

      setTimeout(() => {
        jwt_expired();
      }, 2000);
    } else {
      tostErrorMessage(response.response.data.message);
    }
    setAddToCartLoading(false);
    setSelectedSize("");
    setSelectedQty(1);
    setOptions([]);
  };
  return (
    <>
      <Navbar />
      {loading ? (
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
        <>
          <ToastContainer />

          <Flex width={{ lg: "90%" }} wrap="wrap" margin="auto">
            <ImageSlider
              images={productDetails.images}
              isMobileOrTablet={isMobileOrTablet}
            />
            <Box
              width={isMobileOrTablet ? "100%" : "50%"}
              p={10}
              height={isMobileOrTablet ? "auto" : "80vh"}
              overflowY={isMobileOrTablet ? null : "auto"}
            >
              <Text fontSize="xl" fontWeight="500" color="#737373">
                {productDetails.name}
              </Text>
              <Flex mt={5}>
                <Text as="b" fontSize="2xl" color="#0f0f0f">
                  ₹
                  {Math.ceil(
                    productDetails.price -
                      (productDetails.discount / 100) * productDetails.price
                  )}
                </Text>
                <Text as="s" mt={2} color="#949494">
                  ₹{productDetails.price}
                </Text>
                <Text as="b" lineHeight="19px" color="#00b852" m={2}>
                  {productDetails.discount}% OFF
                </Text>
              </Flex>
              <Text fontSize="sm" color="#949494" fontWeight="400">
                inclusive of all taxes
              </Text>
              {productDetails.tags ? (
                <HStack width="100%" mt={5} spacing={1}>
                  {productDetails.tags.map((tag) => {
                    return <Tag key={tag}>{tag}</Tag>;
                  })}
                </HStack>
              ) : null}

              <SizeOptions
                sizeOptions={productDetails.sizes}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                setOptions={setOptions}
              />
              {selectedSize && (
                <Options
                  optionName={"Qty"}
                  selectedOption={selectedQty}
                  setSelectedOption={setSelectedQty}
                  options={options}
                />
              )}
              <Box width="100%" mt={10}>
                <Button
                  width="100%"
                  bg="#FFD84D"
                  fontFamily="montserrat-semibold, sans-serif"
                  fontWeight="400"
                  _hover={{ backgroundColor: "#ffcd1d" }}
                  onClick={hnadelAddToCart}
                  disabled={addToCartLoading}
                >
                  {" "}
                  <ShoppingBagOutlinedIcon sx={{ marginBottom: "5px" }} />
                  ADD TO CART
                </Button>
              </Box>
              <ProductDescription description={productDetails.description} />
            </Box>
          </Flex>
          {similarProducts.length > 1 ? (
            <Box width="90%" margin="auto" mt={10}>
              <Text as="b">SIMILAR PRODUCTS</Text>
              <Flex
                width="100%"
                margin="auto"
                overflowX="auto"
                justifyContent="left"
                sx={{
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  "-ms-overflow-style": "none",
                }}
              >
                {similarProducts
                  .filter((product, i) => product._id !== productDetails._id)
                  .map((product, i) => {
                    return (
                      <Link key={i} to={`/product/${product._id}`}>
                        <ProductCard props={product} />
                      </Link>
                    );
                  })}
              </Flex>
            </Box>
          ) : null}

          <Footer />
        </>
      )}
    </>
  );
};

export default ProductDetails;
