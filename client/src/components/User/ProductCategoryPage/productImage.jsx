import { Image } from "@chakra-ui/react";

const ProductImage = ({ image, height }) => {
  return <Image width="100%" height={height} src={image} />;
};
export default ProductImage;
