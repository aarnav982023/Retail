import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.min.css";

const Carousel = () => {
  const matches = useMediaQuery("(max-width:600px)");
  const params = {
    rebuildOnUpdate: true,
    slidesPerView: 1,
    autoplay: {
      disableOnInteraction: false
    },
    loop: true,
    ...(!matches && {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    }),
    ...(matches && {
      pagination: {
        el: ".swiper-pagination"
      }
    })
  };
  const images = [
    "http://www.justinmaller.com/img/projects/wallpaper/WP_Killmonger-2560x1440_00000.jpg",
    "http://www.justinmaller.com/img/projects/wallpaper/WP_-2560x1440_00000.jpg",
    "http://www.justinmaller.com/img/projects/wallpaper/WP_Echoes-2560x1440_00066.jpg",
    "http://www.justinmaller.com/img/projects/wallpaper/WP_last_Train_to_paradise-2560x1440_00000.jpg",
    "http://www.justinmaller.com/img/projects/wallpaper/WP_Meta-2560x1440_00060.jpg",
    "http://www.justinmaller.com/img/projects/wallpaper/WP_Meta-2560x1440_00061.jpg"
  ];
  const slides = images.map((image, index) => (
    <img src={image} key={index} alt="" />
  ));
  return <Swiper {...params}>{slides}</Swiper>;
};

export default Carousel;
