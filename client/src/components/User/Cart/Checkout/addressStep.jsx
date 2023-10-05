import {
  Box,
  Text,
  Radio,
  RadioGroup,
  VStack,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { AccountContext } from "../../../../context/context";
import { CheckoutContext } from "../../../../context/checkoutContext";
import { useContext, useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import NewAddress from "../../Account/Address/newAddress";
const AddressStep = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addresses, setAddresses] = useState([]);
  const [value, setValue] = useState("");
  const { userDetails, setUserDetails } = useContext(AccountContext);
  const { addressId, setAddressId } = useContext(CheckoutContext);
  const addressDetailsObj = {
    name: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    house: "",
    area: "",
    isSelected: false,
  };
  useEffect(() => {
    setAddresses(userDetails.address);
  }, [userDetails.address]);
  useEffect(() => {
    setAddressId(value);
  }, [value]);
  console.log(value);
  return (
    <Box mt={10} mb={10}>
      <Box>
        {addresses && (
          <RadioGroup onChange={setValue} value={value}>
            {addresses.map((address, index) => {
              return (
                <Box w={"100%"} key={index}>
                  <Radio value={address._id}>
                    <Box>
                      <Text fontSize={"md"} as="b">
                        {address.name}
                      </Text>
                      <Text fontSize={"md"}>{address.house}</Text>
                      <Text fontSize={"md"}>{address.city}</Text>
                      <Text fontSize={"md"}>
                        {address.city}, {address.state}, {address.pincode}
                      </Text>
                    </Box>
                  </Radio>
                </Box>
              );
            })}
          </RadioGroup>
        )}
        <Button
          //   border={"2px solid black"}
          w={"30%"}
          fontWeight="bold"
          borderRadius={"10px"}
          bg={"#E9B824"}
          color={"#191717"}
          p={3}
          onClick={() => onOpen()}
        >
          <AddIcon /> Add new address
          <NewAddress
            addressDetailsObj={addressDetailsObj}
            // addressDetails={addressDetails}
            // setAddressDetails={setAddressDetails}
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Button>
      </Box>
    </Box>
  );
};
export default AddressStep;
