import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import {
  getMerchantOrders,
  getAllMerchantProducts,
} from "../../../service/api";
import { MerchantContext } from "../../../context/merchantContext";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { orders, setOrders, products, setProducts } =
    useContext(MerchantContext);

  // Define order status colors and labels
  const orderStatus = [
    { bg: "#EE9322", status: "pending" },
    { bg: "#E55604", status: "processing" },
    { bg: "#26577C", status: "shipped" },
    { bg: "#16FF00", status: "delivered" },
    { bg: "#5B0888", status: "return" },
    { bg: "#B931FC", status: "returned" },
    { bg: "#419197", status: "exchange" },
    { bg: "#088395", status: "exchanged" },
    { bg: "#D71313", status: "cancelled" },
    { bg: "#C63D2F", status: "return Cancelled" },
    { bg: "#E25E3E", status: "exchange Cancelled" },
  ];

  // // Function to fetch seller orders and products
  // const fetchSellerOrdersAndProducts = async () => {
  //   setLoading(true);
  //   const [orderResponse, productResponse] = await Promise.all([
  //     getMerchantOrders(),
  //     getAllMerchantProducts(),
  //   ]);

  //   if (orderResponse.status === 200 && productResponse.status === 200) {
  //     setOrders(orderResponse.data);
  //     setProducts(productResponse.data);
  //   }

  //   if (orderResponse.status !== 200 || productResponse.status !== 200) {
  //     // Replace "tostErrorMessage" with the correct function or handling
  //     // tostErrorMessage(response.response.data.message);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchSellerOrdersAndProducts();
  // }, []);

  // Function to count available products
  const availableProducts = (products) => {
    const filterAvailableProducts = products.filter(
      (product) => product.availability === true
    );
    return filterAvailableProducts.length;
  };

  // Function to filter orders by status
  const orderFilter = (orders, status) => {
    const filterOrderByStatus = orders.filter(
      (order) => order.orderDetails.status === status
    );
    return filterOrderByStatus.length;
  };

  // Function to calculate earnings
  const calculateEarnings = (orders, date) => {
    let earnings = 0;
    const filteredOrders = date
      ? orders.filter(
          (order) =>
            order.orderDetails.paymentDetails.status === "PAID" &&
            new Date(order.orderDetails.orderDate).toDateString() ===
              new Date(date).toDateString(date)
        )
      : orders.filter(
          (order) => order.orderDetails.paymentDetails.status === "PAID"
        );

    filteredOrders.forEach((order) => {
      earnings += order.orderDetails.paymentDetails.merchantReceive;
    });

    return earnings;
  };

  return (
    <>
      {/* {loading ? ( // Display a spinner while loading
        <Flex h={"500px"} justifyContent={"center"} alignItems={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : ( */}
      <>
        <Box w={"90%"} margin={"auto"} mt={3}>
          <Heading as="h4" size="lg" textAlign={"center"} m={5}>
            Products
          </Heading>
          <SimpleGrid w={"100%"} minH={"100px"} columns={2} spacing={10}>
            <Card
              bg="#3876BF"
              textAlign={"center"}
              fontSize={"xl"}
              fontWeight={"bold"}
              color={"whitesmoke"}
            >
              <CardBody>
                <Text>TOTAL PRODUCTS</Text>
                <Text>{products.length}</Text>
              </CardBody>
            </Card>
            <Card
              bg="#F99417"
              textAlign={"center"}
              fontSize={"xl"}
              fontWeight={"bold"}
              color={"whitesmoke"}
            >
              <CardBody>
                <Text>AVAILABLE PRODUCTS</Text>

                <Text>{availableProducts(products)}</Text>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>
        <Box w={"90%"} margin={"auto"} mt={3}>
          <Heading as="h4" size="lg" textAlign={"center"} m={5}>
            Orders
          </Heading>
          <SimpleGrid
            w={"100%"}
            minH={"100px"}
            minW={"fit-content"}
            columns={[2, 3, 3, 5]}
            spacing={10}
          >
            <Card
              bg="#3876BF"
              textAlign={"center"}
              fontSize={"xl"}
              fontWeight={"bold"}
              color={"whitesmoke"}
            >
              <CardBody>
                <Text>TOTAL ORDERS</Text>
                <Text>{orders.length}</Text>
              </CardBody>
            </Card>
            {orderStatus.map((status) => {
              const orderCount = orderFilter(orders, status.status);
              return orderCount > 0 ? (
                <Card
                  bg={status.bg}
                  textAlign={"center"}
                  fontSize={"xl"}
                  fontWeight={"bold"}
                  color={"whitesmoke"}
                  whiteSpace={"nowrap"}
                >
                  <CardBody>
                    <Text>{status.status.toLocaleUpperCase()}</Text>
                    <Text>{orderCount}</Text>
                  </CardBody>
                </Card>
              ) : null;
            })}
          </SimpleGrid>
        </Box>
        <Box w={"90%"} margin={"auto"} mt={3}>
          <Heading as="h4" size="lg" textAlign={"center"} m={5}>
            Earnings
          </Heading>
          <SimpleGrid w={"100%"} minH={"100px"} columns={2} spacing={10}>
            <Card
              bg="#4E9F3D"
              textAlign={"center"}
              fontSize={"xl"}
              fontWeight={"bold"}
              color={"whitesmoke"}
            >
              <CardBody>
                <Text>TOTAL EARNING</Text>
                <Text>₹{calculateEarnings(orders)}</Text>
              </CardBody>
            </Card>
            <Card
              bg="#16FF00"
              textAlign={"center"}
              fontSize={"xl"}
              fontWeight={"bold"}
              color={"whitesmoke"}
            >
              <CardBody>
                <Text>TODAY'S EARNING</Text>

                <Text>₹{calculateEarnings(orders, new Date())}</Text>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>
      </>
      {/* )} */}
    </>
  );
};

export default Dashboard;
