import { Box } from "@chakra-ui/react";
import DesktopNav from "./desktopNav";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../context/context";
import { Outlet } from "react-router-dom";
import { getCategories } from "../../service/api";
const Navbar = () => {
  const { isLogedIn, isSeller } = useContext(AccountContext);
  const [userNavItems, setUserNavItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await getCategories();
      if (response.status === 200) {
        setUserNavItems(response.data);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);
  // const userNavItems = [
  //   {
  //     nav: "MEN",
  //     link: "#",
  //     subCategory: [
  //       {
  //         title: "Topwear",
  //         categories: [
  //           "Printed T-Shirts",
  //           "Oversized T-shirts",
  //           "Plain T-Shirts",
  //           "Fashion T-Shirts",
  //           "Full Sleeve T-Shirts",
  //           "Half Sleeve T-Shirts",
  //           "Shirts",
  //           "Vests",
  //           "Co-ord Sets",
  //         ],
  //       },
  //       {
  //         title: "Bottomwear",
  //         categories: [
  //           "Printed T-Shirts",
  //           "Oversized T-shirts",
  //           "Plain T-Shirts",
  //           "Fashion T-Shirts",
  //           "Full Sleeve T-Shirts",
  //           "Half Sleeve T-Shirts",
  //           "Shirts",
  //           "Vests",
  //           "Co-ord Sets",
  //         ],
  //       },
  //       {
  //         title: "Winterwear",
  //         categories: [
  //           "Printed T-Shirts",
  //           "Oversized T-shirts",
  //           "Plain T-Shirts",
  //           "Fashion T-Shirts",
  //           "Full Sleeve T-Shirts",
  //           "Half Sleeve T-Shirts",
  //           "Shirts",
  //           "Vests",
  //           "Co-ord Sets",
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     nav: "WOMEN",
  //     link: "#",
  //     subCategory: [
  //       {
  //         title: "Topwear",
  //         categories: [
  //           "Printed T-Shirts",
  //           "Oversized T-shirts",
  //           "Plain T-Shirts",
  //           "Fashion T-Shirts",
  //           "Full Sleeve T-Shirts",
  //           "Half Sleeve T-Shirts",
  //           "Shirts",
  //           "Vests",
  //           "Co-ord Sets",
  //         ],
  //       },
  //       {
  //         title: "Bottomwear",
  //         categories: [
  //           "Printed T-Shirts",
  //           "Oversized T-shirts",
  //           "Plain T-Shirts",
  //           "Fashion T-Shirts",
  //           "Full Sleeve T-Shirts",
  //           "Half Sleeve T-Shirts",
  //           "Shirts",
  //           "Vests",
  //           "Co-ord Sets",
  //         ],
  //       },
  //       {
  //         title: "Winterwear",
  //         categories: [
  //           "Printed T-Shirts",
  //           "Oversized T-shirts",
  //           "Plain T-Shirts",
  //           "Fashion T-Shirts",
  //           "Full Sleeve T-Shirts",
  //           "Half Sleeve T-Shirts",
  //           "Shirts",
  //           "Vests",
  //           "Co-ord Sets",
  //         ],
  //       },
  //     ],
  //   },
  // ];
  const sellerNavItems = [
    {
      nav: "Dashboard",
      link: "/seller/dashboard",
    },
    {
      nav: "Products",
      link: "/seller/product",
    },
    {
      nav: "Orders",
      link: "/seller/order",
    },
  ];

  return (
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
        <DesktopNav navItems={userNavItems} />
      </Box>
    </>
  );
};

export default Navbar;
