import { Box, Tag } from "@chakra-ui/react";
import ProductCartDetails from "./productCartDetails";
import Rating from "./rating";
import ProductImage from "./productImage";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ props, icon }) => {
  const Navigate = useNavigate();
  return (
    <Box
      marginBottom="10px"
      position="relative"
      minWidth="220px"
      maxWidth="280px"
      m={1}
    >
      <Box marginBottom="5px" position="relative">
        <ProductImage image={props.images[0].url} height={"300px"} />
        {props.tag ||
          (props.brand && (
            <Tag
              position="absolute"
              zIndex="1"
              top="0"
              left="0"
              size="sm"
              bg="#556858"
              color="whiteAlpha.900"
              borderRadius="0px"
            >
              {(props.tag || props.brand).toLocaleUpperCase()}
            </Tag>
          ))}
        {props.rating && <Rating rating={props.rating} />}
      </Box>
      <ProductCartDetails
        // title={props.name.substring(0, 33) + "..."}
        title={
          props.name.length > 33
            ? props.name.substring(0, 33) + "..."
            : props.name
        }
        price={props.price}
        discount={props.discount}
        icon={icon}
      />
    </Box>
  );
};

export default ProductCard;
