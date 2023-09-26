import React, { useState } from "react";

import { Box, useBreakpointValue, Image, Link } from "@chakra-ui/react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 900,
  autoplaySpeed: 8000,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerPadding: "100px",
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
      },
    },
  ],
};

const Carousel = ({ images }) => {
  return (
    <Box
      position={"relative"}
      height={"500px"}
      zIndex={-1}
      overflow={"hidden"}
      margin="0px"
      marginTop={10}
      // width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
      width="100%"
    >
      <Slider {...settings}>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="carausel img"
            sizes={"100vw"}
            style={{
              width: "100vw",
              height: "100%",
              display: "block",
              borderRadius: "10px",
            }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
