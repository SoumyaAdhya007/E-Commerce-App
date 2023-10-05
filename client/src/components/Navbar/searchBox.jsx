import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Input, InputGroup, IconButton } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const SearchBox = ({ width }) => {
  const [searchValue, setSearchValue] = useState(""); // State to hold the search input value
  const navigate = useNavigate(); // React Router's navigation function
  const location = useLocation(); // Get the current route location
  const currentPath = location.pathname.split("/"); // Split the current path into an array
  const isSeller = currentPath.includes("seller"); // Check if the path contains "seller"

  // Handle search button click
  const handleSearch = () => {
    if (searchValue) {
      const encodedSearchValue = encodeURIComponent(searchValue);
      // If there's a search value, navigate to the appropriate route
      navigate(
        isSeller
          ? `/seller/product/products?search=${encodedSearchValue}`
          : `/category/${encodedSearchValue}`
      );
      setSearchValue(""); // Clear the search input
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.which === 13) {
      // If Enter key is pressed (key code 13), trigger search
      handleSearch();
    }
  };

  return (
    <Box width="fit-content">
      <InputGroup bg={"#ffffff"}>
        <IconButton
          icon={<Search2Icon />}
          onClick={() => handleSearch()}
          bg="transparent"
          aria-label="Search"
        />
        <Input
          width={width}
          focusBorderColor="#EAEAEA"
          type="text"
          value={searchValue}
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search by Product or Category"
        />
      </InputGroup>
    </Box>
  );
};
export default SearchBox;
