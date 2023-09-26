import { Box, Button, Flex } from "@chakra-ui/react";
import Navbar from "../../Navbar/navbar";
import { Link, Outlet } from "react-router-dom";
const SellerProducts = () => {
  return (
    <>
      <Navbar />
      <Flex w={"90%"} m={"auto"} justifyContent={"space-evenly"}>
        <Link to={"/seller/product/products"}>
          <Button>See Your Products</Button>
        </Link>
        <Link to={"/seller/product/addproduct"}>
          <Button>Add New Product</Button>
        </Link>
      </Flex>
      <Outlet />
    </>
  );
};
export default SellerProducts;
