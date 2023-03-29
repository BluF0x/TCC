import {React, useState} from 'react'
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import tenisPlaceholder from '../../assets/imgs/tenis_placeholder.jpeg'

function Carousel() {
    const items = [
  { id: 1, image: tenisPlaceholder},
  { id: 2, image: tenisPlaceholder},
];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    <Slider {...settings}>
      {items.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt="" />
        </div>
      ))}
    </Slider>
}