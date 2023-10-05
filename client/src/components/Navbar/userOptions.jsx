import React, { useContext, useState } from "react";
import { Button } from "@chakra-ui/react"; // Chakra UI components
import { Link, useNavigate, useLocation } from "react-router-dom"; // React Router DOM for navigation
import { AccountContext } from "../../context/context"; // Account context for user information
import Cookies from "universal-cookie"; // Universal cookies for managing cookies
import { getUserDetails, becomeMerchant } from "../../service/api"; // API functions for user details and becoming a merchant
import { ToastContainer, toast } from "react-toastify"; // React toast notifications
import { tostErrorMessage, tostSuccessMessage } from "../../service/tost";
const UserOptions = () => {
  // React Router's navigate function for handling navigation
  const navigate = useNavigate();

  // Cookie manager
  const cookies = new Cookies();

  // User context and state variables
  const { setIsLogedIn, userDetails, setUserDetails } =
    useContext(AccountContext);

  // Get the current location path
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const onSellerPage = currentPath.includes("seller");

  // Function to render the switch button based on the current path
  const renderSwitchButton = () => {
    if (onSellerPage) {
      return (
        <Button
          w={"100%"}
          bg="transparent"
          mt={1}
          onClick={() => navigate("/")}
        >
          Switch to Customer
        </Button>
      );
    } else if (!onSellerPage) {
      return (
        <Button
          w={"100%"}
          bg="transparent"
          mt={1}
          onClick={() => navigate("/seller/product")}
        >
          Switch to Seller
        </Button>
      );
    } else {
      return null; // Don't render the button for other routes
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    cookies.remove("token");
    setIsLogedIn(false);
    setUserDetails({});
    navigate("/");
  };

  // Function to handle becoming a merchant
  const handleBecomeMerchant = async () => {
    const response = await becomeMerchant();
    if (response.status === 201) {
      tostSuccessMessage(response.data.message);
      const detailsResponse = await getUserDetails();
      if (detailsResponse.status === 200) {
        setUserDetails(detailsResponse.data);
      }
    } else {
      tostErrorMessage(response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      {!onSellerPage && (
        <Link to={"/account/myaccount"}>
          <Button w={"100%"} bg="transparent" mt={1}>
            My Account
          </Button>
        </Link>
      )}
      {!onSellerPage && (
        <Link to={"/account/order"}>
          <Button w={"100%"} bg="transparent" mt={1}>
            My Orders
          </Button>
        </Link>
      )}
      {!userDetails.isSeller && (
        <Button
          w={"100%"}
          bg="transparent"
          mt={1}
          onClick={() => handleBecomeMerchant()}
        >
          Become a Merchant
        </Button>
      )}
      {renderSwitchButton()}
      <Button w={"100%"} bg="transparent" mt={1} onClick={() => handleLogout()}>
        Logout
      </Button>
    </>
  );
};

export default UserOptions; // Export the UserOptions component
