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
                            <p style={{fontWeight: 'bold', fontSize: 20, color: 'black', margin: 10, paddingTop: 20}}>{item.userName}</p>
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
                                <img src={item.productThumbnail.slice(0,-1)} alt="avatar"
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