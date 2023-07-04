// import React from 'react'
// //import Slider from 'slick-carousel'
// import Slider from 'react-slick'


// import '../../../styles/slider.css'

// const HomeSlider = () => {

//     const settings = {

//         dots: true,
//         autoplay: true,
//         infinite: true,
//         speed: 1500,
//         autoplaySpeed: 3000,
//         swipeToSlide: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//     }

//     return (
//         <Slider {...settings}>
//             <div>
//                 <img className='home__slider-img rounded' src={'https://vitinhhh.com/files/assets/banner-nho-1.jpg'} alt="avatar" />
//             </div>
//             <div>
//                 <img src={'https://pcchinhhang.com/upload/images/Tin-Tuc/banner-gaming.jpg'} alt="avatar" className='rounded home__slider-img' />

//             </div>
//             <div>
//                 <img src={'http://laptophue.com.vn/wp-content/uploads/2021/04/1612_1216-BANNER-pcgm-km-.png'} alt="avatar" className='rounded home__slider-img' />

//             </div>
//             <div>
//                 <img src={'https://mypc.vn/wp-content/uploads/2021/09/Untitled-5.png'} alt="avatar" className='rounded home__slider-img' />

//             </div>
//         </Slider>
//     )
// }

// export default HomeSlider

import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import '../../../styles/slider.css'

const images = [
  'https://shopeeplus.com//upload/images/cach-tao-banner-xoay-vong.png',
  'https://i.pinimg.com/736x/83/f5/b1/83f5b13d34f25a1932d335df5485750f.jpg',
  'https://shopeeplus.com/upload/editor/images/banner-cho-shop-tren-shopee.png',
  'https://shopeeplus.com//upload/images/cach-tao-banner-xoay-vong.png',
  'https://mgg.vn/wp-content/uploads/2018/11/banner-shopee-sieu-sale.png',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8SISDW3DMU6c18rbgwn15ZaWksRvfyW3qiO2tN8K8-ANZ4sWo8mGOjcPqnCGKWbPJ28FzZ-X_eyshUv5HohOk5hlWm8JEy0QualVSzMkSCH5Yq992C2gtstscRQjfeSr72KOvO-cc2ATYtstsXq9Bl1cA2M06c7r3NDpcGgN0cTmP4-EZiAKc6YuGZA/s1920/saleluongve.jpg'
];

const HomeSlider = () => {
    return (
      <div className="slide-container">
        <Zoom
            
        scale={0.4}>
          {
            images.map((each, index) => <img className='slider-img' key={index} src={each} />)
          }
        </Zoom>
      </div>
    )
}

export default HomeSlider