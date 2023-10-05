import {
  Box,
  Button,
  Input,
  Select,
  Text,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import CategorySelector from "./categorySelector";
import { ToastContainer, toast } from "react-toastify";
import { tostErrorMessage } from "../../../../service/tost";

const ProductDetailsForm = ({
  productDetails,
  setProductDetails,
  resetSelector,
  handelSubmit,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const handleCategoryChange = (category) => {
    const categories = category.map((category) => {
      return category.split(" ")[1];
    });
    const categoryId = category[categories.length - 1].split(" ")[0];
    setProductDetails((prev) => ({
      ...prev,
      categoryId: categoryId,
      categories: categories,
    }));
  };
  const handelTextChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      const valueArray = value.toLocaleUpperCase().split(",");

      setProductDetails((prev) => ({
        ...prev,
        [name]: valueArray,
      }));
    } else if (name.startsWith("description.")) {
      // Handle changes to description properties
      const descriptionKey = name.split(".")[1]; // Extract the property name
      setProductDetails((prev) => ({
        ...prev,
        description: {
          ...prev.description,
          [descriptionKey]: value,
        },
      }));
    } else if (name === "price" || name === "discount") {
      setProductDetails((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    } else {
      setProductDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handelSizeQunatity = (e) => {
    // e.preventDefault();

    // Create a new object representing the size and quantity
    const newSizeQuantity = { size, quantity };
    if (size && quantity) {
      // Update productDetails.sizes by creating a new array with the new object
      console.log("before", productDetails.sizes.includes(size));
      if (productDetails.sizes.some((item) => item.size === size)) {
        return tostErrorMessage("Size is already included.");
      }
      setProductDetails((prev) => ({
        ...prev,
        sizes: [...prev.sizes, newSizeQuantity],
      }));
      // Clear the size and quantity inputs
      setSize("");
      setQuantity("");
      onClose();
    } else {
      return tostErrorMessage(
        "Please enter both size and quantity before saving."
      );
    }
  };

  return (
    <Box>
      <ToastContainer />

      <Text as={"b"} fontSize={"2xl"}>
        Add Product Details
      </Text>
      <Box>
        <Text as={"b"}>Brand Name :</Text>
        <Input
          name="brand"
          required
          value={productDetails.brand}
          onChange={handelTextChange}
        />
      </Box>
      <Box>
        <Text as={"b"}>Product Name :</Text>
        <Textarea
          name="name"
          required
          value={productDetails.name}
          onChange={handelTextChange}
        />
      </Box>
      <Box>
        <Text as={"b"}>Price :</Text>
        <Input
          name="price"
          type="number"
          required
          value={productDetails.price}
          min="1"
          onChange={handelTextChange}
        />
      </Box>

      <Box>
        <Text as={"b"}>Discount (you do not need to add "%"):</Text>
        <Input
          name="discount"
          type="number"
          required
          value={productDetails.discount}
          min="0"
          max="100"
          onChange={handelTextChange}
        />
      </Box>
      <Box>
        <Text as={"b"}>Size & Quantity:</Text>
        <TableContainer w={"70%"} m={"auto"} mt={2} mb={2}>
          <Table variant="unstyled">
            <Thead>
              <Tr>
                <Th>Size</Th>
                <Th>Quantity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productDetails.sizes.length !== 0 &&
                productDetails.sizes.map((elem, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{elem.size}</Td>
                      <Td>{elem.quantity}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
        <Button w={"100%"} m={"auto"} colorScheme="blue" onClick={onOpen}>
          Add Size & Quantity
        </Button>
      </Box>
      <Box>
        <Text as={"b"}>Availability :</Text>
        <Select
          name="availability"
          type="number"
          required
          value={productDetails.availability}
          min="1"
          onChange={handelTextChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </Select>
      </Box>
      <Box>
        <Text as={"b"}>Tags (Use "," for different tags) :</Text>
        <Textarea
          name="tags"
          required
          value={productDetails.tags}
          onChange={handelTextChange}
          placeholder="MEN, SHIRT, BLUE SHIRT, 100% COTTON"
        />
      </Box>
      <CategorySelector
        onCategoryChange={handleCategoryChange}
        resetSelector={resetSelector}
      />

      <Text as={"b"} fontSize={"lg"}>
        Description :
      </Text>
      <Box p={3}>
        <Box>
          <Text as={"b"}>About :</Text>
          <Textarea
            name="description.about"
            required
            value={productDetails.description.about}
            onChange={handelTextChange}
          />
        </Box>
        <Box>
          <Text as={"b"}>Manufactured By :</Text>
          <Textarea
            name="description.manufactured"
            required
            value={productDetails.description.manufactured}
            onChange={handelTextChange}
          />
        </Box>
        <Box>
          <Text as={"b"}>Packed By :</Text>
          <Textarea
            name="description.packed"
            required
            value={productDetails.description.packed}
            onChange={handelTextChange}
          />
        </Box>
      </Box>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product Size & Quantity</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text as={"b"}>Size :</Text>
            <Input
              ref={initialRef}
              type="text"
              value={size}
              placeholder="Size"
              onChange={(e) => setSize(e.target.value)}
              required
            />
            <Text as={"b"}>Quantity :</Text>
            <Input
              type="number"
              value={quantity}
              placeholder="Quantity"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              required
            />
            <Button
              mt={1}
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={handelSizeQunatity}
            >
              Save
            </Button>
            <Button mt={1} onClick={onClose}>
              Cancel
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductDetailsForm;
