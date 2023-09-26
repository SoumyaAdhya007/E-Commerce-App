import {
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Text,
  Tag,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Divider,
  Button,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
// import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/navbar";
import ProductCard from "./productCard";
import "../../../App.css";
import data from "../../../data";
import { useState, useEffect } from "react";
import { getProducts } from "../../../service/api";
const AllProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(navigate(-1));
  console.log(category);
  const filters = [
    {
      filter: "Size",
      subFilters: ["S", "M", "L"],
    },
    {
      filter: "Gender",
      subFilters: ["Male", "Female", "UniSex"],
    },
  ];
  useEffect(() => {
    const fetchProducts = async () => {
      // const id = "650c7356b1676f74c42f7ffa";
      const response = await getProducts(category);
      setProducts(response);
    };
    fetchProducts();
  }, [category]);
  return loading ? (
    <>
      <Spinner />
    </>
  ) : (
    <>
      <Navbar />
      <Box width={{ base: "100%", md: "95%", lg: "90%" }} margin="auto">
        <Box
          position="relative"
          padding="10px"
          margin="10px 0 10px 0"
          width="fit-content"
          className="custom-border"
        >
          <Heading as="h4" size="md">
            {}({products.length})
          </Heading>
        </Box>
        <Flex width={"100%"} justifyContent={"space-between"}>
          <DesktopFilterContainer filters={filters} />
          <SimpleGrid
            width="78%"
            margin="auto"
            minChildWidth="190px"
            spacing="10px"
          >
            {products ? (
              products.map((item, i) => {
                return (
                  <Link key={i} to={`/product/${item._id}`}>
                    <ProductCard props={item} icon={"Add To Cart"} />
                  </Link>
                );
              })
            ) : (
              <p>No Products avilable</p>
            )}
          </SimpleGrid>
        </Flex>
      </Box>
    </>
  );
};
const DesktopFilterContainer = ({ filters }) => {
  return (
    <Box
      // display={{ base: "none", md: "block", lg: "block" }}
      width={{ lg: "20%" }}
    >
      <Heading
        as="h5"
        size="sm"
        color="#969696"
        fontWeight="bold"
        paddingLeft="10px"
      >
        FILTER
      </Heading>
      <Accordion width={"100%"} allowToggle>
        {filters.map((items, i) => {
          return (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {items.filter}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {items.subFilters.map((item, i) => {
                  return (
                    <Button key={i} width="100%" margin="2px 0 2px 0">
                      {item}
                    </Button>
                  );
                })}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};
export default AllProducts;
