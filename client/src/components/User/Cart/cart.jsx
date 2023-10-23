import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  useBreakpointValue,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useContext, useState, useMemo } from "react";
import Options from "./options";
import Price from "../ProductCategoryPage/price";
import ProductImage from "../ProductCategoryPage/productImage";
import { CartContext } from "../../../context/cartContext";
import { getAllCartProducts } from "../../../service/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CartItems from "./cartItems";
import EmptyCart from "../../../../images/empty-cart-page-doodle.png";
import { tostErrorMessage } from "../../../service/tost";
const Cart = () => {
  const isDesktop = useBreakpointValue({ md: false, lg: true });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    cart,
    setCart,
    totalPrice,
    setTotalPrice,
    totalDiscount,
    settotalDiscount,
  } = useContext(CartContext);
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
      }
      if (response.status !== 200) {
        tostErrorMessage(response.response.data.message);
      }
      setLoading(false);
    };
    fetchAllcart();
  }, []);
  console.log(cart);
  return (
    <>
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
      ) : cart.length !== 0 && !loading ? (
        <>
          <ToastContainer />
          <Box w="90%" margin="auto">
            <Text>
              <Text as="b" fontSize="l">
                My Cart
              </Text>{" "}
              {cart.length} {cart.length > 1 ? "item(s)" : "item"}
            </Text>
            <Flex
              w="100%"
              mt={3}
              flexDirection={isDesktop ? null : "column"}
              gap={isDesktop ? 10 : 0}
              justifyContent={isDesktop ? "space-between" : "center"}
            >
              <Box w={isDesktop ? "60%" : "100%"}>
                {cart.map((cartItem, i) => {
                  return <CartItems key={i} cartItem={cartItem} />;
                })}
              </Box>
              <Box w={isDesktop ? "38%" : "100%"}>
                <Box width={"100%"} border="0.5px solid #CCCCCC">
                  <Box w={"100%"} textAlign={"left"} bg={"#EBEBEB"} p={2}>
                    <Text as={"b"} fontSize={"xs"}>
                      PRICE SUMMARY
                    </Text>
                  </Box>
                  <Flex w={"100%"} justifyContent={"space-between"} p={1}>
                    <Text fontSize={"sm"} p={2}>
                      Total MRP (Incl. of taxes){" "}
                    </Text>
                    <Text as={"b"} fontSize={"sm"}>
                      ₹{totalPrice}
                    </Text>
                  </Flex>
                  <Flex w={"100%"} justifyContent={"space-between"} p={1}>
                    <Text fontSize={"sm"} p={2}>
                      Shipping Charges{" "}
                    </Text>
                    <Text as={"b"} fontSize={"sm"} color={"#1D8802"}>
                      FREE
                    </Text>
                  </Flex>
                  <Flex w={"100%"} justifyContent={"space-between"} p={1}>
                    <Text fontSize={"sm"} p={2}>
                      Bag Discount{" "}
                    </Text>
                    <Text as={"b"} fontSize={"sm"}>
                      - ₹{totalDiscount}
                    </Text>
                  </Flex>
                  <Flex w={"100%"} justifyContent={"space-between"} p={1}>
                    <Text fontSize={"sm"} p={2}>
                      Subtotal{" "}
                    </Text>
                    <Text as={"b"} fontSize={"sm"}>
                      ₹{totalPrice - totalDiscount}
                    </Text>
                  </Flex>
                  <Divider color={"#CCCCCC"} />
                  <Flex justifyContent={"space-between"} p={2}>
                    <Flex flexDirection={"column"} justifyContent={"center"}>
                      <Text fontSize={"md"}>Total</Text>
                      <Text as={"b"} fontSize={"md"}>
                        ₹{totalPrice - totalDiscount}
                      </Text>
                    </Flex>
                    <Button
                      bg={"#42A2A2"}
                      color={"#ffffff"}
                      p={"10px 40px"}
                      onClick={() => navigate("/checkout?step=1")}
                    >
                      CONTINUE
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Box>
        </>
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
          <Text fontSize="2xl">Nothing in the cart</Text>
        </Flex>
      )}
    </>
  );
};

export default Cart;
