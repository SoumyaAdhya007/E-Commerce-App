import React, { useState, useEffect } from "react";
import { Box, Flex, Image, Text, Spinner } from "@chakra-ui/react";
import {
  getMerchantOrders,
  updateOrderStatusByMerchant,
} from "../../../service/api";
import { ToastContainer, toast } from "react-toastify";
import EmptyCart from "../../../../images/empty-cart-page-doodle.png";
import Navbar from "../../Navbar/navbar";
import SellerOrderItem from "./sellerOrderItem";
import { tostErrorMessage, tostInfoMessage } from "../../../service/tost";

// SellerOrder component
const SellerOrder = () => {
  // State variables
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  // Function to fetch seller orders
  const fetchSellerOrders = async () => {
    setLoading(true);
    const response = await getMerchantOrders();
    if (response.status === 200) {
      setOrders(response.data);
    }
    if (response.status !== 200) {
      tostErrorMessage(response.response.data.message);
    }
    setLoading(false);
  };

  // Fetch seller orders when component mounts
  useEffect(() => {
    fetchSellerOrders();
  }, []);

  // Function to handle order status change
  const handleOrderStatusChange = async ({
    currentStatus,
    changeStatus,
    id,
  }) => {
    let newStatus = "";

    if (
      currentStatus !== "delivered" &&
      ["pending", "processing", "shipped", "cancelled", "delivered"].includes(
        changeStatus
      )
    ) {
      newStatus = changeStatus;
    } else if (
      ["return cancelled", "returned"].includes(changeStatus) &&
      currentStatus === "return"
    ) {
      newStatus = changeStatus;
    } else if (
      ["exchange cancelled", "exchanged"].includes(changeStatus) &&
      currentStatus === "exchange"
    ) {
      newStatus = changeStatus;
    }

    if (newStatus !== "") {
      const response = await updateOrderStatusByMerchant(id, {
        status: newStatus,
      });
      response.status === 200
        ? tostInfoMessage(response.data.message)
        : tostErrorMessage(response.data.message);
      fetchSellerOrders();
    }
  };

  // Render component
  return (
    <>
      <Navbar />
      <ToastContainer />

      {loading ? (
        // Display a spinner while loading
        <Flex h={"500px"} justifyContent={"center"} alignItems={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : orders.length !== 0 ? (
        // Display orders if there are any
        <Box p={5}>
          {orders.map((order, index) => {
            return (
              <SellerOrderItem
                key={index}
                orderDetails={order.orderDetails}
                productDetails={order.productDetails}
                handleOrderStatusChange={handleOrderStatusChange}
              />
            );
          })}
        </Box>
      ) : (
        // Display empty cart message if no orders
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          w="60%"
          m={"auto"}
          mt={10}
        >
          <Image h="300px" w="300px" src={EmptyCart} alt="Empty Cart" />
          <Text fontSize="lg">
            Sadly, you haven't placed any orders till now.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default SellerOrder;
