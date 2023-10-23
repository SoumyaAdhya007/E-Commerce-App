import {
  Box,
  Flex,
  Image,
  Text,
  Spinner,
  Button,
  Divider,
} from "@chakra-ui/react";
import { getOrders } from "../../../../service/api";
import { useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import EmptyCart from "../../../../../images/empty-cart-page-doodle.png";
import ProductImage from "../../ProductCategoryPage/productImage";
const OrderItem = ({
  orderDetails,
  productDetails,
  handleCancelOrReturnOrder,
}) => {
  const statusButtonBg =
    orderDetails.status === "pending"
      ? "#EE9322"
      : orderDetails.status === "processing"
      ? "#E55604"
      : orderDetails.status === "shipped"
      ? "#26577C"
      : orderDetails.status === "delivered"
      ? "#16FF00"
      : orderDetails.status === "cancelled"
      ? "#D71313"
      : orderDetails.status === "return"
      ? "#FF6AC2"
      : orderDetails.status === "returned"
      ? "#B931FC"
      : "#040D12";
  const statusChangeButton =
    orderDetails.status === "pending" ||
    orderDetails.status === "processing" ||
    orderDetails.status === "shipped"
      ? { bg: "#D71313", text: "Cancel", hoverBg: "#812020" }
      : orderDetails.status === "delivered"
      ? { bg: "#213363", text: "Return", hoverBg: "#212940" }
      : orderDetails.status === "return"
      ? { bg: "#D71313", text: "Cancel Return", hoverBg: "#812020" }
      : orderDetails.status === "exchange"
      ? { bg: "#D71313", text: "Cancel Exchange", hoverBg: "#812020" }
      : null;
  return (
    <Box p="5" border="0.5px solid #CCCCCC" borderRadius={"10px"} mb={3}>
      <Flex wrap={"wrap"} gap={5}>
        <Box>
          <ProductImage image={productDetails.images[0].url} height={"200px"} />
        </Box>
        <Box minWw={"40%"} w={"60%"}>
          <Text fontSize={"lg"} color={"272829"}>
            {productDetails.name}
          </Text>
          <Text fontWeight="800">₹800</Text>
          <Flex gap={2} wrap={"wrap"}>
            <Button
              mt={4}
              bg={"transparent"}
              border="1px solid #E4E4E4"
              borderRadius="5px"
              _hover={{ bg: "transparent" }}
            >
              <Text>Size</Text> : <Text as={"b"}>{orderDetails.size}</Text>
            </Button>
            <Button
              mt={4}
              bg={"transparent"}
              border="1px solid #E4E4E4"
              borderRadius="5px"
              _hover={{ bg: "transparent" }}
            >
              <Text>Qty</Text> : <Text as={"b"}>{orderDetails.quantity}</Text>
            </Button>
            <Button
              mt={4}
              bg={statusButtonBg}
              color={"whitesmoke"}
              border="1px solid #E4E4E4"
              borderRadius="5px"
              _hover={{ bg: statusButtonBg }}
              fontWeight={"bold"}
            >
              Status : {orderDetails.status.toUpperCase()}
            </Button>
            <Button
              mt={4}
              mr={2}
              bg={"#372948"}
              border="1px solid #E4E4E4"
              borderRadius="5px"
              _hover={{ bg: "#372948" }}
              color={"whitesmoke"}
            >
              {new Date(orderDetails.orderDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Button>
          </Flex>

          <Text fontSize={"lg"} as="b">
            Address :
          </Text>
          <Flex gap={1} wrap={"wrap"} mt={2} mb={2}>
            <Text fontSize={"md"} as="b">
              {orderDetails.address.name}
            </Text>
            <Text fontSize={"md"}>{orderDetails.address.house}</Text>
            <Text fontSize={"md"}>{orderDetails.address.city}</Text>
            <Text fontSize={"md"}>
              {orderDetails.address.city}, {orderDetails.address.state},{" "}
              {orderDetails.address.pincode}
            </Text>
          </Flex>
          {/* {orderDetails.status !== "cancelled" &&
            orderDetails.status !== "returned"  &&  */}
          {statusChangeButton && (
            <Button
              w={"100%"}
              bg={statusChangeButton.bg}
              color={"whitesmoke"}
              _hover={{ bg: statusChangeButton.hoverBg }}
              fontSize={"large"}
              fontWeight={700}
              onClick={() =>
                handleCancelOrReturnOrder({
                  currentStatus: orderDetails.status,
                  changeStatus: statusChangeButton.text,
                  id: orderDetails._id,
                })
              }
            >
              {statusChangeButton.text}
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default OrderItem;
