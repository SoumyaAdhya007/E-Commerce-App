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
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import Navbar from "../../Navbar/navbar";
import Options from "./options";
import Price from "../ProductCategoryPage/price";
import ProductImage from "../ProductCategoryPage/productImage";
import { CartContext } from "../../../context/cartContext";
import {
  getAllCartProducts,
  updateCartProductSizeQuantity,
  removeCartProduct,
} from "../../../service/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const CartItems = ({ cartItem }) => {
  const Navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSize, setSelectedSize] = useState(cartItem.size);
  const [selectedQuantity, setSelectedQuantity] = useState(cartItem.quantity);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [quantityOptions, setQuantityOptions] = useState([]);
  const {
    cart,
    setCart,
    totalPrice,
    setTotalPrice,
    totalDiscount,
    settotalDiscount,
  } = useContext(CartContext);

  const fetchAllcart = async () => {
    const response = await getAllCartProducts();
    if (response.status === 200) {
      setCart(response.data);
      calculatedPrice(response.data);
      return;
    }
  };
  useEffect(() => {
    const updateSizeQuantityOptions = async () => {
      // Get the available sizes and quantities
      const sizeOptions = cartItem.product.sizes
        .filter((elem) => elem.quantity > 0)
        .map((elem) => elem.size);
      const quantityOptions = cartItem.product.sizes.filter(
        (elem) => elem.size === selectedSize
      );
      let quantityarr = [];
      const maxOptions = Math.min(quantityOptions[0].quantity, 10);
      for (let i = 1; i <= maxOptions; i++) {
        quantityarr.push(i);
      }
      // Update the size and quantity options state
      setSizeOptions(sizeOptions);
      setQuantityOptions(quantityarr);

      // Update the cart product size and quantity if necessary
      if (
        selectedSize !== cartItem.size ||
        selectedQuantity !== cartItem.quantity
      ) {
        if (selectedSize !== cartItem.size) {
          setSelectedQuantity(1);
        }
        const response = await updateCartProductSizeQuantity(
          cartItem.product._id,
          { size: selectedSize, quantity: selectedQuantity }
        );
        if (response.status === 200) {
          fetchAllcart();
        }
      }
    };

    // Only update the size and quantity options if the selected quantity changes
    updateSizeQuantityOptions();
  }, [selectedSize, selectedQuantity]);
  const removeProduct = async (id) => {
    const response = await removeCartProduct(id);
    if (response.status === 200) {
      fetchAllcart();
    }
  };
  return (
    <Box p="5" border="0.5px solid #CCCCCC" borderRadius={"10px"} mb={3}>
      <Flex justifyContent="space-between" gap={2}>
        <Box minW={"50%"}>
          <Text>{cartItem.product.name}</Text>
          <Price
            discount={cartItem.product.discount * cartItem.quantity}
            price={cartItem.product.price * cartItem.quantity}
          />
          <Flex gap={5}>
            <Options
              optionName={"Size"}
              selectedOption={selectedSize}
              setSelectedOption={setSelectedSize}
              options={sizeOptions}
            />
            <Options
              optionName={"Qty"}
              selectedOption={selectedQuantity}
              setSelectedOption={setSelectedQuantity}
              options={quantityOptions}
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
            onClick={onOpen}
            // onClick={() => removeProduct(cartItem.productId)}
          >
            Remove
          </Button>
        </Box>
        <Box onClick={() => Navigate(`/product/${cartItem.product._id}`)}>
          <ProductImage
            image={cartItem.product.images[0].url}
            height={"200px"}
          />
        </Box>
      </Flex>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove from cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"md"}>
              Are you sure you want to remove {cartItem.size} size{" "}
              {cartItem.product.name} from your cart?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              m={2}
              onClick={() => {
                removeProduct(cartItem.productId), onClose();
              }}
            >
              Yes
            </Button>
            <Button colorScheme="orange" m={2} onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default CartItems;
