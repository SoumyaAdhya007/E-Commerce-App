import {
  Box,
  Heading,
  Text,
  Flex,
  useBreakpointValue,
  CardBody,
  Card,
} from "@chakra-ui/react";
import Navbar from "../../Navbar/navbar";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Link } from "react-router-dom";

const Account = () => {
  const isDesktop = useBreakpointValue({ md: false, lg: true });
  const options = [
    {
      optionName: "My Orders",
      text: "View, modify and track orders",
      link: "order",
    },
    {
      optionName: "My Addresses",
      text: "Edit, add or remove addresses",
      link: "address",
    },
    {
      optionName: "My Profile",
      text: "Edit personal info, change password",
      link: "profile",
    },
  ];
  return (
    <>
      <Navbar />
      <Box w={"90%"} m={"auto"}>
        <Box
          position="relative"
          padding="10px"
          margin="10px 0 10px 0"
          width="fit-content"
          className="custom-border"
        >
          <Heading as="h4" size="lg">
            My Account
          </Heading>
        </Box>
        <Flex
          w={"100%"}
          flexDirection={isDesktop ? null : "column"}
          justifyContent={"space-between"}
        >
          {options.map((option, index) => {
            return (
              <>
                <Link to={`/account/${option.link}`}>
                  <Card w={"300px"} h={"100px"}>
                    <CardBody>
                      <Flex alignItems={"center"}>
                        <Text as={"b"} fontSize={"lg"}>
                          {option.optionName}
                        </Text>
                        <KeyboardArrowRightOutlinedIcon />
                      </Flex>
                      <Text color={"#B2B2B2"}>{option.text}</Text>
                    </CardBody>
                  </Card>
                </Link>
              </>
            );
          })}
        </Flex>
      </Box>
    </>
  );
};
export default Account;
