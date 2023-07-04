import React, { useEffect, useState } from 'react'
//import Slider from 'slick-carousel'
import Slider from 'react-slick'
import { getAllFeedback } from '../../../api/fetchers/feedback';
import { thunkFeedbackTypes } from '../../../constants/thunkTypes';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@mui/material';
import '../../../styles/testMonialSlider.css'
import axios from 'axios';
import { baseURL } from '../../../constants/baseURL';

const TestimonialSlider = () => {
    
    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/api/v1/review/product?productId=1`)
            .then((res) => setReviewData(res.data.list))
            .catch((err) => console.log("List review err: ", err))
    }, [])

    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
    }
  
    return (
        <Slider {...settings}>
            {
                
                reviewData.map((item, index) => (
                    <div key={index}>
                        <div style={{backgroundColor: '#E5E5E5', borderRadius: 10, paddingBottom: 10}}>
                            <div className='user__containner' style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <img src={'https://www.realmadrid.com/img/vertical_380px/380x501_kroos_20230215094339.jpg'}
                                        style={{
                                            height: 60,
                                            width: 60,
                                            borderRadius: 40,
                                            margin: 10,
                                        }}
                                />
                                <h6 style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>{item.userName}</h6>
                            </div>
                            <Rating
                                name="simple-controlled"
                                value={item.vote}
                                size='30'
                                style={{margin: 10 }}  
                            />
                            <p className="review__text" style={{margin: 10}}>
                            {item.content}
                            </p>
                            <div className='d-flex align-items-center gap-3 mt-4' style={{marginLeft: 10}}>
                                <img src={item.productThumbnail} alt="avatar"
                                    style={{
                                        height: 100,
                                        width: 100,
                                        borderRadius: 10
                                    }}
                                />
                                <p style={{width: 300, fontWeight:'bold'}}>{item.productName}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
            
            
        </Slider>
  )
}

export default TestimonialSlider