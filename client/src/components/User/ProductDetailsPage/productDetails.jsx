import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../../../data";
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
import { getOneProduct, getProducts } from "../../../service/api";
const ProductDetails = () => {
  const { id } = useParams();
  console.log("Received id:", id);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const isMobileOrTablet = useBreakpointValue({ base: true, lg: false });
  const fetchOneProduct = async () => {
    setLoading(true);
    const response = await getOneProduct(id);
    console.log(response);
    if (response.status === 200) {
      console.log("product", response.data.images);
      setProductDetails(response.data);
    } else {
      alert(JSON.stringify(response));
      setProductDetails([]);
    }
    const products = await getProducts(response.data.categoryId);
    console.log("similar products", products);
    setSimilarProducts(products);
    setLoading(false);
  };
  console.log("id=>", id, "outside fetch", productDetails.images);
  useEffect(() => {
    console.log("useEffect is running");
    fetchOneProduct();
  }, [id]);
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    // Perform any other actions based on the selected size
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
                    return <Tag>{tag}</Tag>;
                  })}
                </HStack>
              ) : null}

              <SizeOptions
                sizeOptions={productDetails.sizes}
                onSelectSize={handleSizeSelection}
              />
              <Box width="100%" mt={10}>
                <Button
                  width="100%"
                  bg="#FFD84D"
                  fontFamily="montserrat-semibold, sans-serif"
                  fontWeight="400"
                  _hover={{ backgroundColor: "#ffcd1d" }}
                >
                  {" "}
                  <ShoppingBagOutlinedIcon sx={{ marginBottom: "5px" }} />
                  ADD TO CART
                </Button>
              </Box>
              <ProductDescription description={productDetails.description} />
            </Box>
          </Flex>
          {similarProducts ? (
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
                {similarProducts.slice(0, 6).map((item, i) => {
                  return (
                    <Link key={i} to={`/product/${item._id}`}>
                      <ProductCard props={item} />
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
