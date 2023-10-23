import {
  Flex,
  Box,
  Image,
  Grid,
  Wrap,
  WrapItem,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Carousel from "./carousel";
const Home = () => {
  const images = [
    "https://images.bewakoof.com/uploads/grid/app/1X1-BANNER-01-graphic-printed-common-1692334928.jpg",
    "https://images.bewakoof.com/uploads/grid/app/1X1-vests-1692177524.jpg",
    "https://images.bewakoof.com/uploads/grid/app/new-banner-1X1-DRESSES-shootimage--1--1692174566.jpg",
    "https://images.bewakoof.com/uploads/grid/app/newbanner-1x1-UltimateJoggers-common-1692097282.jpg",
    "https://images.bewakoof.com/uploads/grid/app/1X1-tmnt-revised-1692599987.jpg",
  ];
  const categories = [
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/new-thumbnail-icon-2022-D-230x320-newarrivals-common-1682570370.jpg",
      text: "New Arrivals",
    },
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/new-thumbnail-icon-2022-D-230x320-common-bestseller-1679567164.jpg",
      text: "Bestsellers",
    },
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/new-thumbnail-icon-2022-D-230x320-official-collab-common-1682570371.jpg",
      text: "Official Collaborations",
    },
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/new-thumbnail-icon-2022-D-230x320-old-version-1687889121.jpg",
      text: "Customization",
    },
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/ezgif-com-gif-maker-1684474101.gif",
      text: "Combos",
    },
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/vote-thumbnail-1668508339.jpg",
      text: "Vote for Designs",
    },
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/last-size-new-thumbnaik-1668508337.jpg",
      text: "Last Sizes Left",
    },
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/new-thumbnail-icon-2022-D-230x320-plus-size-common-1682570373.jpg",
      text: "Plus Size",
    },
  ];
  const bestPicks = [
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/desktop-mid-size-banner-combos-common-1692535399.jpg",
    },
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/desktop-mid-size-banner-air-1692257835.jpg",
    },
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/plus-size-common-1683622044.jpg",
    },
    {
      image:
        "https://images.bewakoof.com/uploads/grid/app/mid-size-hygiene-revamp-customise-model-desktop-new-1689142924.jpg",
    },
  ];
  return (
    <>
      <Carousel images={images} />
      <Flex
        width="95%"
        margin="auto"
        paddingTop="20px"
        overflowX="auto"
        justifyContent="space-between"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
        }}
      >
        {categories.map((category, index) => {
          return (
            <Link
              key={index}
              to={`/category/${category.text.toLocaleLowerCase()}`}
            >
              <Box
                textAlign="center"
                flexShrink={0}
                width="150px"
                cursor="pointer"
              >
                <Image src={category.image} />
                <Text fontWeight="500" fontSize="sm" content="fit">
                  {category.text}
                </Text>
              </Box>
            </Link>
          );
        })}
      </Flex>
      <Box padding="5px">
        <Heading as="h4" size="md" textAlign="center" margin="15px">
          OUR BEST PICKS
        </Heading>
        <Flex justifyContent="space-around" wrap="wrap">
          {bestPicks.map((picks, i) => {
            return (
              <Box
                key={i}
                width={{ base: "100%", md: "100%", lg: "49%" }}
                height="auto"
                margin="2px"
              >
                <Image borderRadius="5px" src={picks.image} />
              </Box>
            );
          })}
        </Flex>
      </Box>
    </>
  );
};

export default Home;
