import {
  Box,
  Flex,
  Image,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Spinner,
} from "@chakra-ui/react";
import razorpay from "../../../../../images/razorpay.jpg";
import { CartContext } from "../../../../context/cartContext";
import { CheckoutContext } from "../../../../context/checkoutContext";
import { useState, useContext, useMemo, useEffect } from "react";
import { getAllCartProducts, proceedToPayment } from "../../../../service/api";
const PaymentStep = () => {
  const [loading, setLoading] = useState(true);

  const {
    cart,
    setCart,
    totalPrice,
    setTotalPrice,
    totalDiscount,
    settotalDiscount,
  } = useContext(CartContext);
  const { paymentId, setPaymentId, addressId, setAddressId } =
    useContext(CheckoutContext);
  useMemo(() => {
    let totalPrice = 0;
    let totalDiscount = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice += cart[i].product.price * cart[i].quantity;
      totalDiscount += Math.ceil(
        (cart[i].product.discount / 100) *
          cart[i].product.price *
          cart[i].quantity
      );
    }

    setTotalPrice(totalPrice);
    settotalDiscount(totalDiscount);
  }, [cart]);

  useEffect(() => {
    const fetchAllcart = async () => {
      setLoading(true);
      const response = await getAllCartProducts();
      if (response.status === 200) {
        setCart(response.data);
        // calculatedPrice(response.data);
      }
      if (response.status !== 200) {
        toast.error(response.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setLoading(false);
    };
    fetchAllcart();
  }, []);
  const handelPay = async () => {
    setLoading(true);
    const response = await proceedToPayment({
      totalPrice: totalPrice - totalDiscount,
    });
    if (response.status === 200) {
      window.location.href = response.data.url;
      setPaymentId(response.data.paymentId);
      sessionStorage.setItem("paymentId", response.data.paymentId);
    }
  };
  return loading ? (
    <Flex h={"500px"} justifyContent={"center"} alignItems={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ) : (
    <Flex
      w={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={5}
      mb={5}
    >
      <Box w={"sm"} h={"fit-content"} border={"1px solid black"}>
        <Box w={"200px"} h={"100px"} m="auto">
          <Image w={"100%"} h={"100%"} src={razorpay} alt="Razorpay" />
        </Box>
        <Text fontSize="lg" textAlign="center">
          Payment Method :
          <Text as="b" fontSize="lg" textAlign="center">
            Razorpay
          </Text>
        </Text>
        <TableContainer>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Items :</Td>
                <Td isNumeric>₹{totalPrice}</Td>
              </Tr>
              <Tr>
                <Td>Discount :</Td>
                <Td isNumeric>-₹{totalDiscount}</Td>
              </Tr>
              <Tr>
                <Td>Total :</Td>
                <Td isNumeric>₹{totalPrice - totalDiscount}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Button
          w={"100%"}
          borderRadius="0px"
          colorScheme="teal"
          onClick={handelPay}
        >
          Pay
        </Button>
      </Box>
    </Flex>
  );
};
export default PaymentStep;
