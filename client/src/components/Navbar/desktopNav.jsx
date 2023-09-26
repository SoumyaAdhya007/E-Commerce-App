import {
  Flex,
  Image,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../context/context";
import { Search2Icon } from "@chakra-ui/icons";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchBox from "./searchBox";
import DeskstopSubNav from "./desktopSubNav";
import MobileNav from "./mobileNav";
import User from "./user";
const DesktopNav = ({ navItems }) => {
  const { isLogedIn, setIsLogedIn, userDetails } = useContext(AccountContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ md: false, lg: true });
  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        {!isDesktop && <MobileNav navItems={navItems} />}

        <Flex alignItems={"center"} justifyContent={"space-between"} gap={20}>
          <Link to={"/"}>
            <Image w={150} h={10} src="../../../images/avira-nav-logo.png" />
          </Link>
          {isDesktop && (
            <Flex justifyContent={"space-between"} gap={10}>
              <DeskstopSubNav navItems={navItems} />
            </Flex>
          )}
        </Flex>
        <Flex gap={3} alignItems="center" justifyContent={"space-between"}>
          {isDesktop ? (
            <SearchBox w={"22vw"} />
          ) : (
            <>
              <Search2Icon color="#303030" fontSize="2xl" onClick={onOpen} />
              <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerBody>
                    <SearchBox w={"100vw"} />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          )}
          {isLogedIn && Object.keys(userDetails).length !== 0 && isDesktop ? (
            <User />
          ) : (
            <Link to="/login">
              <Button bg={"transparent"}>Login</Button>
            </Link>
          )}
          {/* {isLogedIn && isDesktop && <User />} */}
          <Link to="/cart">
            <ShoppingBagOutlinedIcon fontSize="large" color="#303030" />
          </Link>
        </Flex>
      </Flex>
    </>
  );
};
export default DesktopNav;
