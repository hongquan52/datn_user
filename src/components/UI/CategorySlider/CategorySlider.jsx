import React from "react";
import Slider from "react-slick";
import screen from '../../../assets/images/category/Screen.png'
import Keyboard from '../../../assets/images/category/Keyboard.png'
import Mouse from '../../../assets/images/category/Mouse.png'
import SSD from '../../../assets/images/category/SSD.png'
import Ram from '../../../assets/images/category/Ram.png'
import Mainboard from '../../../assets/images/category/Mainboard.png'
import VGA from '../../../assets/images/category/VGA.png'
import Cooler from '../../../assets/images/category/Cooler.png'
import CPU from '../../../assets/images/category/CPU.png'
import headphone from '../../../assets/images/category/Headphone.png'
import { useNavigate } from "react-router-dom";

export default function CategorySlider() {
    const navigate = useNavigate();

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "100px",
        slidesToShow: 3,
        speed: 500,
        rows: 1,
        slidesPerRow: 2,
        
      };
  return (
    <div style={{backgroundColor: '#fedac5', paddingRight: 30, paddingLeft: 30}}>
        
        <Slider {...settings}>
          {
            itemCategory.map((item) => (
                <div key={item.id} onClick={() => navigate(`/foods?category=${item.path}`)} >
                  <div className='item_category' style={{marginLeft: 5, marginRight: 5}} >
                    <img src={item.image}
                      style={{ width: 150, height: 150 }}
                    />
                    <p style={{marginTop: 20, fontWeight: 'bold'}}>{item.title}</p>
                  </div>
                </div>
              ))
          }
        </Slider>
      </div>
  );
}


const itemCategory = [
    {
      'id': 1,
      'title': 'Bàn phím',
      'path': 'Keyboard',
      'image': Keyboard,
    },
    {
      'id': 2,
      'title': 'Ram',
      'path': 'Ram',
      'image': Ram,
    },
    {
      'id': 3,
      'title': 'Màn hình',
      'path': 'Screen',
      'image': screen,
    },
    {
      'id': 4,
      'title': 'Tản nhiệt',
      'path': 'Cooler',
      'image': Cooler,
    },
    {
      'id': 5,
      'title': 'Bo mạch',
      'path': 'Mainboard',
      'image': Mainboard,
    },
    {
      'id': 6,
      'title': 'Chuột',
      'path': 'Mouse',
      'image': Mouse,
    },
    {
      'id': 7,
      'title': 'SSD',
      'path': 'SSD',
      'image': SSD,
    },
    {
      'id': 8,
      'title': 'Card đồ họa',
      'path': 'VGA',
      'image': VGA,
    },
    {
      'id': 9,
      'title': 'CPU',
      'path': 'CPU',
      'image': CPU,
    },
    {
        'id': 10,
        'title': 'Tai nghe',
        'path': 'Headphone',
        'image': headphone,
      },
  ]
  