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
import ProductCard from "./productCard";
import "../../../App.css";
import { useState, useEffect } from "react";
import { getProducts } from "../../../service/api";
import NoSearch from "../../../../images/no-search.png";
const AllProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const search = decodeURIComponent(category);
      const response = await getProducts(search);
      setProducts(response);
      setLoading(false);
    };
    fetchProducts();
  }, [category]);
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
    <>
      <Box width={{ base: "100%", md: "95%", lg: "90%" }} margin="auto">
        <Box
          position="relative"
          padding="10px"
          margin="10px 0 10px 0"
          width="fit-content"
          className="custom-border"
        >
          <Heading as="h4" size="md">
            {category}({products.length})
          </Heading>
        </Box>
        {/* <Flex width={"100%"} justifyContent={"space-between"}>
          <DesktopFilterContainer filters={filters} /> */}
        {products.length === 0 ? (
          <Flex
            h={"500px"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            textAlign={"center"}
          >
            <Text fontSize={"2xl"}>
              For your search <Text as="b">{category}</Text>
            </Text>
            <Image src={NoSearch} alt="No Search" />
            <Text fontSize={"2xl"}>We couldn't find any matches</Text>
          </Flex>
        ) : (
          <SimpleGrid
            width="90%"
            margin="auto"
            minChildWidth="190px"
            spacing={10}
          >
            {products.map((item, i) => {
              return (
                <Link key={i} to={`/product/${item._id}`}>
                  <ProductCard props={item} icon={"Add To Cart"} />
                </Link>
              );
            })}
          </SimpleGrid>
        )}
        {/* </Flex> */}
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
