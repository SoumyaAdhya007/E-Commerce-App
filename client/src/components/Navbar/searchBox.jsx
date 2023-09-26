import { Box, Input, InputGroup, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
const SearchBox = ({ w }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handelSearch = () => {
    searchValue && navigate(`/category/${searchValue}`);
    setSearchValue("");
  };
  return (
    <Box width="fit-content">
      <InputGroup bg={"#ffffff"}>
        <IconButton
          icon={<Search2Icon />}
          onClick={() => handelSearch()}
          bg="transparent"
          aria-label="Search"
        />
        <Input
          width={w}
          focusBorderColor="#EAEAEA"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search by Product or Category"
        />
      </InputGroup>
    </Box>
  );
};
export default SearchBox;
