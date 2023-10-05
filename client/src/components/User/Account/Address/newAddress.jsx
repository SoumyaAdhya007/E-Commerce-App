import React, { useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { AccountContext } from "../../../../context/context";
import {
  getUserDetails,
  addNewAdddress,
  updateAdddress,
} from "../../../../service/api";
import { tostErrorMessage, tostSuccessMessage } from "../../../../service/tost";

const NewAddress = ({ addressDetailsObj, isOpen, onOpen, onClose }) => {
  const [addressDetails, setAddressDetails] = useState(addressDetailsObj);
  const { userDetails, setUserDetails } = useContext(AccountContext);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "pincode") {
      setAddressDetails((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    } else {
      setAddressDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number and pincode
    if (("" + addressDetails.phone).length !== 10) {
      return tostErrorMessage("Please enter a 10-digit phone number.");
    }
    if (("" + addressDetails.pincode).length !== 6) {
      return tostErrorMessage("Please enter a 6-digit pincode.");
    }

    let response;
    if (addressDetails._id) {
      response = await updateAdddress(addressDetails._id, {
        address: addressDetails,
      });
    } else {
      response = await addNewAdddress(addressDetails);
    }

    if (response.status === 201 || response.status === 200) {
      tostSuccessMessage(response.data.message);
      const userDetailsResponse = await getUserDetails();
      if (userDetailsResponse.status === 200) {
        setUserDetails(userDetailsResponse.data);
        onClose();
      }
    } else {
      onClose();
      return tostErrorMessage(response.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormLabel>Full name</FormLabel>
              <Input
                name="name"
                value={addressDetails.name}
                onChange={handleChange}
                placeholder="Enter Full Name"
                required
              />

              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phone"
                type="number"
                value={addressDetails.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number (10 digits)"
                required
              />
              <FormLabel>Pincode</FormLabel>
              <Input
                name="pincode"
                type="number"
                value={addressDetails.pincode}
                onChange={handleChange}
                placeholder="Enter Pincode (6 digits)"
                required
              />
              <FormLabel>
                Flat, House no., Building, Company, Apartment
              </FormLabel>
              <Input
                name="house"
                value={addressDetails.house}
                onChange={handleChange}
                required
              />
              <FormLabel>Area, Street, Sector, Village</FormLabel>
              <Input
                name="area"
                value={addressDetails.area}
                onChange={handleChange}
                required
              />
              <FormLabel>Town/City</FormLabel>
              <Input
                name="city"
                value={addressDetails.city}
                onChange={handleChange}
                required
                placeholder="Enter your Town/City Name"
              />
              <FormLabel>State</FormLabel>
              <Input
                name="state"
                value={addressDetails.state}
                onChange={handleChange}
                required
                placeholder="Enter your State Name"
              />
              <Box mt={2}>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewAddress;
