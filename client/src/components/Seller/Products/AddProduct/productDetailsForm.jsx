import { Box, Button, Input, Select, Text, Textarea } from "@chakra-ui/react";
import { useState, useRef } from "react";
import CategorySelector from "./categorySelector";
const ProductDetailsForm = ({
  productDetails,
  setProductDetails,
  handelSubmit,
}) => {
  // const [productDetails, setProductDetails] = useState(productDetailsObj);
  const staticCategories = [
    {
      _id: "1",
      name: "Men",
      subcategories: [
        {
          _id: "2",
          name: "Topwear",
          subcategories: [
            { _id: "3", name: "Printed T-Shirts" },
            { _id: "4", name: "Oversized T-shirts" },
            { _id: "5", name: "Plain T-Shirts" },
            { _id: "6", name: "Fashion T-Shirts" },
            { _id: "7", name: "Full Sleeve T-Shirts" },
            { _id: "8", name: "Half Sleeve T-Shirts" },
            { _id: "9", name: "Shirts" },
            { _id: "10", name: "Vests" },
            { _id: "11", name: "Co-ord Sets" },
          ],
        },
        {
          _id: "12",
          name: "Bottomwear",
          subcategories: [
            { _id: "13", name: "Jeans" },
            { _id: "14", name: "Trousers" },
          ],
        },
        {
          _id: "15",
          name: "Winterwear",
          subcategories: [
            { _id: "16", name: "Jackets" },
            { _id: "17", name: "Sweaters" },
          ],
        },
      ],
    },
    {
      _id: "18",
      name: "Women",
      subcategories: [
        {
          _id: "19",
          name: "Topwear",
          subcategories: [
            { _id: "20", name: "Printed T-Shirts" },
            { _id: "21", name: "Oversized T-shirts" },
            { _id: "22", name: "Plain T-Shirts" },
            { _id: "23", name: "Fashion T-Shirts" },
            { _id: "24", name: "Full Sleeve T-Shirts" },
            { _id: "25", name: "Half Sleeve T-Shirts" },
            { _id: "26", name: "Shirts" },
            { _id: "27", name: "Blouses" },
            { _id: "28", name: "Co-ord Sets" },
          ],
        },
        {
          _id: "29",
          name: "Bottomwear",
          subcategories: [
            { _id: "30", name: "Jeans" },
            { _id: "31", name: "Leggings" },
          ],
        },
        {
          _id: "32",
          name: "Winterwear",
          subcategories: [
            { _id: "33", name: "Coats" },
            { _id: "34", name: "Sweaters" },
          ],
        },
      ],
    },
  ];

  // const [selectedCategory, setSelectedCategory] = useState([]);

  const handleCategoryChange = (category) => {
    const categories = category.map((category) => {
      return category.split(" ")[1];
    });
    const categoryId = category[categories.length - 1].split(" ")[0];
    console.log(categories);
    setProductDetails((prev) => ({
      ...prev,
      categoryId: categoryId,
      categories: categories,
    }));
  };
  const handelTextChange = (e) => {
    const { name, value } = e.target;
    if (name === "sizes" || name === "tags") {
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
    } else if (name === "price" || name === "discount" || name === "quantity") {
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
  return (
    <Box>
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
        <Text as={"b"}>Quantity :</Text>
        <Input
          name="quantity"
          type="number"
          required
          value={productDetails.quantity}
          min="1"
          onChange={handelTextChange}
        />
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
        <Text as={"b"}>sizes (Use "," for different sizes) :</Text>
        <Textarea
          name="sizes"
          required
          value={productDetails.sizes}
          onChange={handelTextChange}
          placeholder="S, M, L"
        />
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
        categories={staticCategories}
        onCategoryChange={handleCategoryChange}
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
    </Box>
  );
};
export default ProductDetailsForm;
