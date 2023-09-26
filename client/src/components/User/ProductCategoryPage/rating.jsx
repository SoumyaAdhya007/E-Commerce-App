import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Flex, Text } from "@chakra-ui/react";

const Rating = ({ rating }) => {
  return (
    <Flex
      position="absolute"
      zIndex="1"
      left="5px"
      bottom="0px"
      background="whiteAlpha.800"
      padding="1"
      fontSize="xs"
    >
      <StarOutlinedIcon sx={{ color: "#FFC700", fontSize: "16px" }} />
      <Text color="#181818" fontWeight="bold">
        {rating}
      </Text>
    </Flex>
  );
};
export default Rating;
