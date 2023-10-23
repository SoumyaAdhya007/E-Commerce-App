import { useContext, useState } from "react";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { AccountContext } from "../../../../context/context";

const Profile = () => {
  const { userDetails } = useContext(AccountContext);
  return (
    <>
      <Box w={"90%"} m={"auto"} mb={10}>
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
            My Profile
          </Heading>
        </Box>
        <form>
          <FormControl>
            <FormLabel>Name :</FormLabel>
            <Input
              variant="filled"
              name="name"
              type="text"
              value={userDetails.name}
              fontWeight={700}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Email Id:</FormLabel>

            <Input
              variant="filled"
              name="email"
              type="email"
              value={userDetails.email}
              fontWeight={700}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Mobile Number:</FormLabel>

            <Input
              variant="filled"
              name="phone"
              type="number"
              value={userDetails.phone}
              fontWeight={700}
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Merchant :</FormLabel>
            <Input type="text" value={userDetails.isSeller ? "Yes" : "No"} />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Admin :</FormLabel>
            <Input type="text" value={userDetails.isAdmin ? "Yes" : "No"} />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Password :</FormLabel>
            <Input type="password" value={"123456789"} />
          </FormControl>
        </form>
      </Box>
    </>
  );
};
export default Profile;
