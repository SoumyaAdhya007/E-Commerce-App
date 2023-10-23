import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

const SellerActions = () => {
  return (
    <>
      {/* Flex container for buttons */}
      <Flex w={"90%"} m={"auto"} justifyContent={"space-evenly"}>
        {/* Link to view seller's products */}
        <Link to={"/seller/products"}>
          <Button>See Your Products</Button>
        </Link>

        {/* Link to add a new product */}
        <Link to={"/seller/product/addproduct"}>
          <Button>Add New Product</Button>
        </Link>
      </Flex>

      {/* Render child routes */}
      {/* <Outlet /> */}
    </>
  );
};

export default SellerActions;
