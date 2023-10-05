import { Box, Flex, Image, Text, Spinner, Button } from "@chakra-ui/react";
import { getOrders, updateOrderStatus } from "../../../../service/api";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import EmptyCart from "../../../../../images/empty-cart-page-doodle.png";
import Navbar from "../../../Navbar/navbar";
import ProductImage from "../../ProductCategoryPage/productImage";
import OrderItem from "./orderItem";
import { tostErrorMessage, tostInfoMessage } from "../../../../service/tost";
const Order = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    setLoading(true);
    const response = await getOrders();
    if (response.status == 200) {
      setOrders(response.data);
    }
    if (response.status !== 200) {
      tostErrorMessage(response.response.data.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const handleCancelOrReturnOrder = async ({
    currentStatus,
    changeStatus,
    id,
  }) => {
    let newStatus = "";

    if (
      changeStatus === "Cancel" &&
      ["pending", "processing", "shipped"].includes(currentStatus)
    ) {
      newStatus = "cancelled";
    } else if (changeStatus === "Return" && currentStatus === "delivered") {
      newStatus = "return";
    } else if (changeStatus === "Cancel Return" && currentStatus === "return") {
      newStatus = "return cancelled";
    } else if (changeStatus === "Cancel E" && currentStatus === "exchange") {
      newStatus = "return cancelled";
    }

    if (newStatus) {
      const response = await updateOrderStatus(id, { status: newStatus });
      response.status === 200
        ? tostInfoMessage(response.data.message)
        : tostErrorMessage(response.data.message);
      fetchOrders();
    }
  };

  // const handleCancelOrReturnOrder = async ({
  //   currentStatus,
  //   changeStatus,
  //   id,
  // }) => {
  //   if (
  //     changeStatus === "Cancel" &&
  //     ["pending", "processing", "shipped"].includes(currentStatus)
  //   ) {
  //     const response = await updateOrderStatus(id, { status: "cancelled" });
  //     if (response.status === 200) {
  //       toast.error(response.data.message, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       fetchOrders();
  //       return;
  //     }
  //     if (response.status !== 200) {
  //       toast.error(response.response.data.message, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       return;
  //     }
  //   }
  //   if (changeStatus === "Return" && currentStatus === "delivered") {
  //     const response = await updateOrderStatus(id, { status: "return" });
  //     if (response.status === 200) {
  //       toast.info(response.data.message, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       fetchOrders();
  //       return;
  //     }
  //     if (response.status !== 200) {
  //       toast.error(response.response.data.message, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       return;
  //     }
  //   }
  // };
  return (
    <>
      <Navbar />
      <ToastContainer />

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
      ) : orders.length !== 0 && !loading ? (
        <Box p={5}>
          {orders.map((order, index) => {
            return (
              <OrderItem
                key={index}
                orderDetails={order.orderDetails}
                productDetails={order.productDetails}
                handleCancelOrReturnOrder={handleCancelOrReturnOrder}
              />
            );
          })}
        </Box>
      ) : (
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
export default Order;
