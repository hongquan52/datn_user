import React from "react";
import Slider from "react-slick";
import { Col } from "reactstrap";
import ProductCardBestSale from "../product-card/ProductCardBestSale";


export default function ProductSlider({bestSaleList}) {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 2,
        speed: 500,
        rows: 1,
        slidesPerRow:2,
        
      };
  return (
    <div style={{backgroundColor: '#fedac5', padding: 30}}>
        
        <Slider {...settings}>
          {
              bestSaleList.map((item) => (
                <Col lg='3' md='4' key={item.id} className='mt-5'>
                    <ProductCardBestSale item={item} />
                  </Col>
              ))
          }
        </Slider>
      </div>
  );
}

