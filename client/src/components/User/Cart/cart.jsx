import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import Navbar from "../../Navbar/navbar";
import cart from "../../../cartData";
import Price from "../ProductCategoryPage/price";
import ProductImage from "../ProductCategoryPage/productImage";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const isDesktop = useBreakpointValue({ md: false, lg: true });

  return (
    <>
      <Navbar />
      <Box w="90%" margin="auto">
        <Text>
          <Text as="b" fontSize="l">
            My Bag
          </Text>
          2 item(s)
        </Text>
        <Flex
          w="100%"
          mt={3}
          flexDirection={isDesktop ? null : "column"}
          gap={isDesktop ? 10 : 0}
          justifyContent={isDesktop ? "space-between" : "center"}
        >
          <Box w={isDesktop ? "60%" : "100%"}>
            {cart.map((cart, i) => {
              return <CartItems key={i} cart={cart} />;
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
                  ₹3095
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
                  - ₹1450
                </Text>
              </Flex>
              <Flex w={"100%"} justifyContent={"space-between"} p={1}>
                <Text fontSize={"sm"} p={2}>
                  Subtotal{" "}
                </Text>
                <Text as={"b"} fontSize={"sm"}>
                  ₹1645
                </Text>
              </Flex>
              <Divider color={"#CCCCCC"} />
              <Flex justifyContent={"space-between"} p={2}>
                <Flex flexDirection={"column"} justifyContent={"center"}>
                  <Text fontSize={"md"}>Total</Text>
                  <Text as={"b"} fontSize={"md"}>
                    ₹3095
                  </Text>
                </Flex>
                <Button bg={"#42A2A2"} color={"#ffffff"} p={"10px 40px"}>
                  CONTINUE
                </Button>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
const CartItems = ({ cart }) => {
  const Navigate = useNavigate();

  return (
    <Box p="5" border="0.5px solid #CCCCCC" borderRadius={"10px"} mb={3}>
      <Flex justifyContent="space-between" gap={2}>
        <Box minW={"50%"}>
          <Text>{cart.title}</Text>
          <Price discount={cart.discount} price={cart.price} />
          <Flex gap={5}>
            <Options
              optionName={"Size"}
              selectedOption={"M"}
              options={["S", "M", "L"]}
            />
            <Options
              optionName={"Qty"}
              selectedOption={"1"}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            />
          </Flex>
          <Button
            width={"100%"}
            borderRadius="0px"
            border="0.5px solid #E4E4E4"
            bg={"transparent"}
            color={"#7F7F7F"}
            fontSize={"l"}
            mt="10px "
          >
            Remove
          </Button>
        </Box>
        <Box onClick={() => Navigate("/product/6435099a24f1f8e6a47281fe")}>
          <ProductImage image={cart.image} height={"200px"} />
        </Box>
      </Flex>
    </Box>
  );
};
const Options = ({ optionName, selectedOption, options }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <Button
        mt={4}
        bg={"transparent"}
        onClick={onOpen}
        border="1px solid #E4E4E4"
        borderRadius="5px"
      >
        <Text>{optionName}</Text> : <Text as={"b"}>{selectedOption}</Text>
        <KeyboardArrowDownSharpIcon fontSize="small" />
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select {optionName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {options.map((option, index) => {
              return (
                <Button w={"100%"} mt={1} key={index} onClick={onClose}>
                  {option}
                </Button>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Cart;
