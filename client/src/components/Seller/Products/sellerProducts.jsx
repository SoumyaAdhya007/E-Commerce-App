import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import Navbar from "../../Navbar/navbar";
import { Link, Outlet } from "react-router-dom";

const SellerProducts = () => {
  return (
    <>
      {/* Render the Navbar component */}
      <Navbar />

      {/* Flex container for buttons */}
      <Flex w={"90%"} m={"auto"} justifyContent={"space-evenly"}>
        {/* Link to view seller's products */}
        <Link to={"/seller/product/products"}>
          <Button>See Your Products</Button>
        </Link>

        {/* Link to add a new product */}
        <Link to={"/seller/product/addproduct"}>
          <Button>Add New Product</Button>
        </Link>
      </Flex>

      {/* Render child routes */}
      <Outlet />
    </>
  );
};

export default SellerProducts;
