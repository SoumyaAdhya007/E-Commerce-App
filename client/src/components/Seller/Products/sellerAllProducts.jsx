import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  Flex,
  Spinner,
  Text,
  Image,
  Button,
  Box,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getAllMerchantProducts, removeProduct } from "../../../service/api";
import NoSearch from "../../../../images/no-search.png";

import ProductCard from "../../User/ProductCategoryPage/productCard";
import { tostErrorMessage, tostSuccessMessage } from "../../../service/tost";

const SellerAllProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchMerchantProducts = async () => {
    setLoading(true);
    let response;
    if (search) {
      response = await getAllMerchantProducts(search);
    } else {
      response = await getAllMerchantProducts();
    }
    setProducts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMerchantProducts();
  }, [search]);

  const handleDelete = async (id) => {
    try {
      const response = await removeProduct(id);
      if (response.status === 200) {
        tostSuccessMessage(response.data.message);
        setTimeout(() => {
          navigate(location.pathname);
          fetchMerchantProducts();
        }, 1500);
      } else {
        tostErrorMessage(response.response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    // Add your edit functionality here
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
  ) : !loading && products.length === 0 ? (
    <Flex
      h={"500px"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Text fontSize={"2xl"}>
        For your search <Text as="b">{search}</Text>
      </Text>
      <Image src={NoSearch} alt="No Search" />
      <Text fontSize={"2xl"}>We couldn't find any matches</Text>
    </Flex>
  ) : (
    <>
      <ToastContainer />
      <SimpleGrid
        width="78%"
        margin="auto"
        minChildWidth="190px"
        spacing="20px"
      >
        {products.map((item, i) => (
          <Box key={i}>
            <ProductCard props={item} />
            <Flex w={"250px"} justifyContent={"space-between"}>
              <Button
                minW={"49%"}
                maxW={"100%"}
                colorScheme="red"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </Button>
              {/* <Button
                minW={"49%"}
                maxW={"100%"}
                colorScheme="linkedin"
                onClick={() => handleEdit(item)}
              >
                Edit
              </Button> */}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default SellerAllProducts;
