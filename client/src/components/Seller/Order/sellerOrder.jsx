import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Spinner,
  Input,
  FormControl,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";
import {
  getMerchantOrders,
  updateOrderStatusByMerchant,
} from "../../../service/api";
import { ToastContainer, toast } from "react-toastify";
import EmptyCart from "../../../../images/empty-cart-page-doodle.png";
import SellerOrderItem from "./sellerOrderItem";
import { tostErrorMessage, tostInfoMessage } from "../../../service/tost";
import { MerchantContext } from "../../../context/merchantContext";

// SellerOrder component
const SellerOrder = () => {
  // State variables
  const [loading, setLoading] = useState(false);
  // const [orders, setOrders] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const { orders, setOrders, products, setProducts } =
    useContext(MerchantContext);

  const options = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "exchange",
    "exchange cancelled",
    "exchanged",
    "return",
    "return cancelled",
    "returned",
  ];
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
  // useEffect(() => {
  //   if(order)
  //   fetchSellerOrders();
  // }, []);
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
  // Function to filter orders
  const filterOrders = () => {
    // Filter orders based on filterDate and filterStatus
    let filteredOrders = [...orders];

    if (filterDate) {
      filteredOrders = filteredOrders.filter((order) => {
        // Convert orderDate to the format expected by datetime-local input
        const orderDateFormatted = new Date(
          order.orderDetails.orderDate
        ).toDateString();
        console.log(
          "orderDateFormatted =>" + orderDateFormatted,
          "filterDate =>",
          new Date(filterDate).toDateString(),
          "isMatch =>",
          orderDateFormatted === new Date(filterDate).toDateString()
        );
        return new Date(filterDate).toDateString() === orderDateFormatted;
      });
    }

    if (filterStatus) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.orderDetails.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // Now, filteredOrders contains the filtered results
    console.log(filteredOrders);
    setOrders(filteredOrders);
  };

  // Render component
  return (
    <>
      <ToastContainer />
      <Flex
        w={"90%"}
        m={"auto"}
        mt={10}
        mb={10}
        justifyContent={"space-evenly"}
        gap={15}
      >
        <FormControl>
          <FormLabel>Choose a date :</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            border={"1px solid gray"}
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Choose a date :</FormLabel>
          <Select
            placeholder="Select Order Status"
            size="md"
            border={"1px solid gray"}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            {options.map((opt, index) => {
              return (
                <option key={index} value={opt}>
                  {opt.toLocaleUpperCase()}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <Flex w={"20%"} wrap={"wrap"} gap={1}>
          <Button w={"100%"} colorScheme="twitter" onClick={filterOrders}>
            Filter
          </Button>
          <Button
            w={"100%"}
            colorScheme="orange"
            type="reset"
            onClick={() => fetchSellerOrders()}
          >
            Reset
          </Button>
        </Flex>
      </Flex>
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
        <Box>
          <Box w={"90%"} m={"auto"}>
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
          <Text fontSize="lg">Sadly, you haven't any order.</Text>
        </Flex>
      )}
    </>
  );
};

export default SellerOrder;
