import React from "react";
import { Box, Flex, Image, Text, Button, Select } from "@chakra-ui/react";
import ProductImage from "../../User/ProductCategoryPage/productImage";

const SellerOrderItem = ({
  orderDetails,
  productDetails,
  handleOrderStatusChange,
}) => {
  // Determine background color based on order status
  const statusButtonBg =
    {
      pending: "#EE9322",
      processing: "#E55604",
      shipped: "#26577C",
      delivered: "#16FF00",
      cancelled: "#D71313",
      return: "#FF6AC2",
      returned: "#B931FC",
      exchange: "#040D12",
    }[orderDetails.status] || "#040D12";

  // Determine status change options and button styles
  const statusChange = {
    pending: {
      bg: "#6499E9",
      hoverBg: "#1b55ac",
      options: ["processing", "shipped", "delivered", "cancelled"],
    },
    processing: {
      bg: "#6499E9",
      hoverBg: "#1b55ac",
      options: ["shipped", "delivered", "cancelled"],
    },
    shipped: {
      bg: "#6499E9",
      hoverBg: "#1b55ac",
      options: ["delivered", "cancelled"],
    },
    return: {
      bg: "#213363",
      hoverBg: "#212940",
      options: ["returned", "return cancelled"],
    },
    exchange: {
      bg: "#213363",
      hoverBg: "#212940",
      options: ["exchanged", "exchange cancelled"],
    },
  }[orderDetails.status];

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
              _hover={"none"} // Remove hover effect
            >
              <Text>Size</Text> : <Text as={"b"}>{orderDetails.size}</Text>
            </Button>
            <Button
              mt={4}
              bg={"transparent"}
              border="1px solid #E4E4E4"
              borderRadius="5px"
              _hover={"none"} // Remove hover effect
            >
              <Text>Qty</Text> : <Text as={"b"}>{orderDetails.quantity}</Text>
            </Button>
            <Button
              mt={4}
              bg={statusButtonBg}
              color={"whitesmoke"}
              border="1px solid #E4E4E4"
              borderRadius="5px"
              _hover={statusChange?.hoverBg || "none"} // Apply hover effect if defined
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
              color={"whitesmoke"}
              _hover={"none"} // Remove hover effect
            >
              {new Date(orderDetails.orderDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Button>
            <Button
              mt={4}
              mr={2}
              bg={"#1D5D9B"}
              border="1px solid #E4E4E4"
              borderRadius="5px"
              color={"whitesmoke"}
              _hover={"none"} // Remove hover effect
            >
              Payment : ₹{orderDetails.paymentDetails.merchantReceive}
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

          {statusChange && (
            <Box>
              <Text fontSize={"md"} as="b" mt={2} mb={2}>
                {" "}
                Change Status :
              </Text>
              <Select
                mt={2}
                mb={2}
                bg={"#EAEAEA"}
                color={"#333"}
                fontWeight={"bold"}
                placeholder="Change Order Status"
                onChange={(e) =>
                  handleOrderStatusChange({
                    currentStatus: orderDetails.status,
                    changeStatus: e.target.value,
                    id: orderDetails._id,
                  })
                }
              >
                {statusChange.options.map((opt, index) => (
                  <option
                    key={index}
                    value={opt}
                    backgroundColor="#EAEAEA"
                    color="#333"
                  >
                    {opt.toUpperCase()}
                  </option>
                ))}
              </Select>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default SellerOrderItem;
