import React, {useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import logoSuccess from '../assets/images/error.gif'
import '../styles/success.css'
import Helmet from '../components/Helmet/Helmet'
import { baseURL } from '../constants/baseURL'
import axios from 'axios'

const Failed = () => {
    const ref = useRef();
    const navigate = useNavigate();

    const orderID = sessionStorage.getItem('recentOrderID');
    const orderPrice = sessionStorage.getItem('recentOrderPrice')

    // UPDATE STATUS ORDER (CANCEL)
    const cancelOrder = () => {
        axios.put(`${baseURL}/api/v1/order/updateStatus?orderId=${orderID}&orderStatus=Cancel`)
            .then((res) => console.log("Response cancel order in failure page: ", res))
            .catch((err) => console.log(err))
    }
    const handleCancel = () => {

        cancelOrder();

        sessionStorage.removeItem('recentOrderID');
        sessionStorage.removeItem('recentOrderPrice');

        navigate("/historyOrder");
    }
    const handlePayment = () => {
        
        axios.get(`${baseURL}/create-payment?amount=${parseInt(orderPrice)}&orderId=${parseInt(orderID)}`)
          .then((res) => {
            ref.current.href = res.data.data;
            window.onload = document.getElementById('redirect').click();
          })
          .catch((err) => console.log(err))
    }
    return (
        
        <Helmet title='Thanh toán thành công'>
        
        <Container>
            <Row>
            <Col lg='6' md='6' sm='12' className='m-auto text-center'>
                    <div className="success__wrapper">
                        <div className="success__icon">
                            <img src={logoSuccess} alt="" />
                        </div>
                        <div className="success__title">
                            <h5 style={{color: '#df2020'}}>Your payment is failed. Please try again</h5>
                        </div>
                        <div>
                        <Link onClick={handleCancel}><button className='payment__btn'>Cancel</button></Link>
                        <Link onClick={handlePayment}><button className='payment__btn'>Payment</button></Link>
                        </div>
                        
                    </div>
            </Col>
            </Row>
        </Container>
        <a href rel="noreferrer" id="redirect" ref={ref}></a>
    </Helmet>
        
    )
}

export default Failed