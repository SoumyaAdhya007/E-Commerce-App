import ProductCard from "../../User/ProductCategoryPage/productCard";
import { SimpleGrid } from "@chakra-ui/react";
import data from "../../../data";
import { Link } from "react-router-dom";
const SellerAllProducts = () => {
  return (
    <>
      <SimpleGrid
        width="78%"
        margin="auto"
        minChildWidth="190px"
        spacing="20px"
      >
        {data.map((item, i) => {
          return (
            <Link key={i} to={`/seller/product/${item._id}`}>
              <ProductCard props={item} icon={"Edit"} />
            </Link>
          );
        })}
      </SimpleGrid>
    </>
  );
};
export default SellerAllProducts;
