import React, { useContext, useEffect, useState } from "react"; // React and React hooks
import { Box, Flex, Spinner } from "@chakra-ui/react"; // External UI library components
import { useLocation } from "react-router-dom"; // React Router DOM for location
import { getCategories } from "../../service/api"; // External service function
import { AccountContext } from "../../context/context"; // Context for user account

import DesktopNav from "./desktopNav"; // Internal component
// Define the Navbar component
const Navbar = () => {
  // Access user login state from the AccountContext using useContext hook
  const { isLogedIn } = useContext(AccountContext);

  // Define state variables using useState hook
  const [userNavItems, setUserNavItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Access the current location using useLocation hook
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const isSeller = currentPath.includes("seller");

  // Use the useEffect hook to fetch categories when the component mounts
  useEffect(() => {
    // Define an async function to fetch categories
    const fetchCategories = async () => {
      setLoading(true); // Set loading state to true while fetching
      const response = await getCategories(); // Fetch categories data
      if (response.status === 200) {
        setUserNavItems(response.data); // Update userNavItems state with fetched data
      }
      setLoading(false); // Set loading state to false after fetching
    };

    // Call the fetchCategories function
    fetchCategories();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Define an array of navigation items for sellers
  const sellerNavItems = [
    {
      name: "Dashboard",
      link: "/seller/dashboard",
    },
    {
      name: "Products",
      link: "/seller/product",
    },
    {
      name: "Orders",
      link: "/seller/order",
    },
  ];

  // Render loading spinner if loading state is true, else render the navigation bar
  return loading ? (
    <Flex h={"auto"} justifyContent={"center"} alignItems={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ) : (
    <>
      <Box
        w={"100%"}
        position={"sticky"}
        top={0}
        zIndex={100}
        height="auto"
        p={3}
        bg={"white"}
      >
        {/* Render the DesktopNav component with appropriate navigation items based on user login and role */}
        <DesktopNav
          navItems={isLogedIn && isSeller ? sellerNavItems : userNavItems}
        />
      </Box>
    </>
  );
};

// Export the Navbar component for use in other parts of the application
export default Navbar;
