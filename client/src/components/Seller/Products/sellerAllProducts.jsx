import React, { useEffect, useState, useContext } from "react";
import {
  SimpleGrid,
  Flex,
  Spinner,
  Text,
  Image,
  Button,
  Box,
} from "@chakra-ui/react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getAllMerchantProducts, removeProduct } from "../../../service/api";
import { tostErrorMessage, tostSuccessMessage } from "../../../service/tost";
import { MerchantContext } from "../../../context/merchantContext";
import SellerActions from "./sellerActions";
import NoSearch from "../../../../images/no-search.png";
import ProductCard from "../../User/ProductCategoryPage/productCard";

const SellerAllProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");
  const [loading, setLoading] = useState(false);
  const [sellerProducts, setSellerProducts] = useState([]);

  const fetchMerchantProducts = async () => {
    setLoading(true);
    let response;
    if (search) {
      response = await getAllMerchantProducts(search);
    } else {
      response = await getAllMerchantProducts();
    }
    setSellerProducts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMerchantProducts();
  }, [search]);

  return (
    <>
      <SellerActions />
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
      ) : !loading && sellerProducts.length === 0 ? (
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
            spacing={10}
          >
            {sellerProducts.map((item, i) => (
              <Link key={i} to={`/seller/product/${item._id}`}>
                <ProductCard props={item} />
              </Link>
            ))}
            {/* <Box key={i} onClick={()=>navigate()}>
                <Flex w={"250px"} justifyContent={"space-between"}>
                  <Button
                    minW={"49%"}
                    maxW={"100%"}
                    colorScheme="red"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    minW={"49%"}
                    maxW={"100%"}
                    colorScheme="linkedin"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                </Flex>
              </Box> */}
          </SimpleGrid>
        </>
      )}
      ;
    </>
  );
};

export default SellerAllProducts;
