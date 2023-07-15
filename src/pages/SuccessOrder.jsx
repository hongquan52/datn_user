import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import VNPAY from '../assets/images/vnpay.png'
import '../styles/success.css'
import Helmet from '../components/Helmet/Helmet'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios'
import { baseURL } from '../constants/baseURL'
import {useLocation, useParams } from 'react-router-dom'

const cartId = sessionStorage.getItem('cartId')

const SuccessOrder = () => {

  const location = useLocation();
  const ref = useRef();

  const [totalPrice, setTotalPrice] = useState(0);
  const [orderID, setOrderID] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryOrderID = params.get('orderID');
    const queryTotalPrice = params.get('totalPrice');

    setTotalPrice(queryTotalPrice);
    setOrderID(queryOrderID);
  })

  const handlePayment = () => {
    sessionStorage.setItem('recentOrderID', orderID.toString());
    sessionStorage.setItem('recentOrderPrice', totalPrice.toString());

    axios.get(`${baseURL}/create-payment?amount=${totalPrice}&orderId=${orderID}`)
      .then((res) => {
        ref.current.href = res.data.data;
        window.onload = document.getElementById('redirect').click();
      })
      .catch((err) => console.log(err))
  }
  return (
    
    <Helmet title='Payment'>
    
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12' className='m-auto text-center'>
                <div className="success__wrapper">
                    <div className="success__icon">
                        <img src={VNPAY} alt="" />
                    </div>
                    <div className="success__title">
                        <h5>Mã đơn hàng : {orderID}</h5>
                        <h5>Giá : {totalPrice}</h5>
                    </div>
                    <div style={{display: 'flex',width: 500, justifyContent: 'space-between'}}>
                      <Link to={'/checkout'}><button className='payment__btn'><ArrowBackIosNewIcon />Quay ại</button></Link>
                      <button className='payment__btn'
                        onClick={() => handlePayment()}
                      >Thanh toán <ArrowForwardIosIcon /></button>
                    </div>
                    
                </div>
          </Col>
        </Row>
      </Container>
    </section>
    <a href rel="noreferrer" id="redirect" ref={ref}></a>
  </Helmet>
    
  )
}

export default SuccessOrder