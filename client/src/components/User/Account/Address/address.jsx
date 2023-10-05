import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { AccountContext } from "../../../../context/context";
import Navbar from "../../../Navbar/navbar";
import NewAddress from "./newAddress";
import { deleteAdddress, getUserDetails } from "../../../../service/api";
import { tostErrorMessage, tostInfoMessage } from "../../../../service/tost";
import { ToastContainer } from "react-toastify";

const Address = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userDetails, setUserDetails } = useContext(AccountContext);
  const [addresses, setAddresses] = useState([]);
  const [addressDetailsObj, setAddressDetailsObj] = useState({});

  // Function to handle editing an address
  const handleEdit = (address) => {
    setAddressDetailsObj(address);
    onOpen();
  };

  // Function to handle deleting an address
  const handleDelete = async (id) => {
    try {
      const response = await deleteAdddress(id);
      if (response.status === 200) {
        tostInfoMessage("Address deleted");
        const userResponse = await getUserDetails();
        if (userResponse.status === 200) {
          setUserDetails(userResponse.data);
        } else {
          tostErrorMessage(userResponse.response.data.message);
        }
      } else {
        tostErrorMessage(response.response.data.message);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // Function to handle adding a new address
  const handleAddNewAddress = () => {
    setAddressDetailsObj({
      name: "",
      phone: "",
      pincode: "",
      state: "",
      city: "",
      house: "",
      area: "",
      isSelected: false,
    });
    onOpen();
  };

  return (
    <>
      <ToastContainer />
      {/* Render the Navbar component */}
      <Navbar />

      {/* Container for Back to My Account link */}
      <Box w={"90%"} m={"auto"}>
        <Link to={"/account/myaccount"}>
          <Text color="#51CCCC" fontSize={"lg"}>
            <ChevronLeftIcon />
            Back to My Account
          </Text>
        </Link>
        <Box
          position="relative"
          padding="10px"
          margin="10px 0 10px 0"
          width="fit-content"
          className="custom-border"
        >
          <Heading as="h4" size="lg">
            My Address
          </Heading>
        </Box>
      </Box>

      {/* Flex container for displaying addresses */}
      <Flex
        w={"90%"}
        m={"auto"}
        mt={10}
        justifyContent={"left"}
        gap={10}
        wrap={"wrap"}
      >
        {userDetails.address &&
          userDetails.address.map((address, index) => {
            return (
              <Card
                key={index}
                h={"auto"}
                w={{ base: "90%", md: "40%", lg: "30%" }}
                border={"1px solid black"}
              >
                <CardHeader>
                  <Heading size="md" color="#333">
                    {address.name}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Stack spacing="4">
                    <Box>
                      <Heading size="xs" color="#000">
                        {address.house}, {address.area}
                      </Heading>
                    </Box>
                    <Box>
                      <Heading size="xs" color="rgba(0,0,0,.8)">
                        {address.city}, {address.state}, {address.pincode}
                      </Heading>
                    </Box>
                    <Box>
                      <Heading size="xs" color="rgba(0,0,0,.8)">
                        Contact Number: {address.phone}
                      </Heading>
                    </Box>
                    <Flex gap={3}>
                      <Button
                        onClick={() => handleEdit(address)}
                        colorScheme="facebook"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(address._id)}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            );
          })}

        {/* Card for adding a new address */}
        <Card
          w={{ base: "90%", md: "40%", lg: "30%" }}
          border={"1px solid rgb(81, 204, 204)"}
          justifyContent={"center"}
          alignItems={"center"}
          color={"rgb(81, 204, 204)"}
          p={10}
          onClick={handleAddNewAddress}
          _hover={{ bg: "#EAEAEA" }}
        >
          <AddIcon />
          <Heading size="md" fontWeight={500}>
            ADD NEW ADDRESS
          </Heading>
        </Card>
      </Flex>

      {/* Render the NewAddress component when isOpen is true */}
      {isOpen && (
        <NewAddress
          addressDetailsObj={addressDetailsObj}
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default Address;
