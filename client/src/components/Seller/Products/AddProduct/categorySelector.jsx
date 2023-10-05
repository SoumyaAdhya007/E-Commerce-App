import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  Input,
  Button,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";

import { getCategories, addNewSubcategory } from "../../../../service/api";
import { tostErrorMessage, tostWarnMessage } from "../../../../service/tost";
const CategorySelector = ({ onCategoryChange, resetSelector }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([" ", " ", " "]);
  const [newCategory, setNewCategory] = useState("");
  const [openAddNewCategory, setOpenAddNewCategory] = useState(false);
  const [categoryList2, setCategoryList2] = useState([]);
  const [categoryList3, setCategoryList3] = useState([]);
  const [updatedCategories, setUpdatedCategories] = useState(false);
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
  });
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      if (response.status === 200) {
        setCategories(response.data);
      } else {
        tostErrorMessage(response.response.data.message);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    onCategoryChange(selectedCategories);
  }, [selectedCategories]);
  useEffect(() => {
    if (resetSelector) {
      setSelectedCategories([" ", " ", " "]);
      setNewCategory("");
      setOpenAddNewCategory(false);
      setCategoryList2([]);
      setCategoryList3([]);
    }
  }, [resetSelector]);
  const subCategoryList = (categories, value) => {
    const matchingCategories = categories.filter(
      (category) => value === category.name
    );
    return matchingCategories[0].subcategories
      ? matchingCategories[0].subcategories
      : [];
  };

  const handleCategoryChange = (event, index) => {
    const { value } = event.target;

    if (value === "new") {
      setSelectedCategories((prevSelected) => {
        const newSelected = [...prevSelected];
        for (let i = index; i < newSelected.length; i++) {
          newSelected[i] = " ";
        }
        return newSelected;
      });
      return setOpenAddNewCategory(true);
    }
    if (value !== "new" && openAddNewCategory) {
      setOpenAddNewCategory(false);
    }
    setSelectedCategories((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = value;
      return newSelected;
    });
    if (index === 0) {
      setCategoryList2(subCategoryList(categories, value.split(" ")[1]));
      setCategoryList3([]);
    } else if (index === 1) {
      setCategoryList3(subCategoryList(categoryList2, value.split(" ")[1]));
    }
  };
  const handleNewCategoryChange = (event) => {
    // Allow only letters (A-Z, a-z), spaces, and backspace
    if (/[^a-zA-Z\s]/.test(event.target.value) && event.key !== "Backspace") {
      event.preventDefault();
      tostWarnMessage("Please enter only letters (A-Z, a-z) and spaces.");
      return;
    }
    setNewCategory(event.target.value);
  };

  const handleAddCategory = async () => {
    if (newCategory !== "") {
      const selectedCategoryIndex = selectedCategories.findIndex((category) => {
        return category === " ";
      });

      const response = await addNewSubcategory(
        selectedCategories[selectedCategoryIndex - 1].split(" ")[0],
        { subcategory: newCategory }
      );
      if (response.status !== 201) {
        return tostErrorMessage(response.data.message);
      }
      setNewCategory("");
      setOpenAddNewCategory(false);
      setUpdatedCategories(!updatedCategories);
      const categoriesResponse = await getCategories();
      setCategories(categoriesResponse.data);

      const subcategories = subCategoryList(
        categoriesResponse.data,
        selectedCategories[0].split(" ")[1]
      );
      if (selectedCategoryIndex === 1) {
        setCategoryList2(subcategories.reverse());
      } else if (selectedCategoryIndex === 2) {
        const nestedsubcategories = subCategoryList(
          subcategories,
          selectedCategories[1].split(" ")[1]
        );
        setCategoryList3(nestedsubcategories.reverse());
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Flex flexDirection={isMobile ? "column" : null}>
        {selectedCategories.map((selectedCategory, index) => (
          <Select
            key={index}
            name={`category_List_${index + 1}`}
            onChange={(event) => handleCategoryChange(event, index)}
            placeholder={`Select ${index === 0 ? "" : "or Add "}Category`}
            required
            value={selectedCategory}
            isDisabled={
              index === 0 ? false : selectedCategories[index - 1] === " "
            }
          >
            {index === 0
              ? categories.map((category) => (
                  <option
                    key={category._id}
                    value={`${category._id} ${category.name}`}
                  >
                    {category.name}
                  </option>
                ))
              : index === 1
              ? categoryList2.map((category) => (
                  <option
                    key={category._id}
                    value={`${category._id} ${category.name}`}
                  >
                    {category.name}
                  </option>
                ))
              : categoryList3.map((category) => (
                  <option
                    key={category._id}
                    value={`${category._id} ${category.name}`}
                  >
                    {category.name}
                  </option>
                ))}
            {index > 0 && selectedCategories[index - 1] !== " " && (
              <option value="new">Add New Category</option>
            )}
          </Select>
        ))}
      </Flex>
      {openAddNewCategory && (
        <Box mt={2}>
          <Input
            placeholder="Enter New Category"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            onKeyDown={handleNewCategoryChange}
          />
          <Button mt={2} colorScheme="teal" onClick={handleAddCategory}>
            Add Category
          </Button>
        </Box>
      )}
    </>
  );
};

export default CategorySelector;
