import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import logoSuccess from '../assets/images/success.gif'
import '../styles/success.css'
import Helmet from '../components/Helmet/Helmet'
const Success = () => {
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
                        <h5>Order successfully</h5>
                    </div>
                    <div>
                      <Link to={'/historyOrder'}><button className='payment__btn'>Your order</button></Link>
                      <Link to={'/foods'}><button className='payment__btn'>Shopping</button></Link>
                    </div>
                    
                </div>
          </Col>
        </Row>
      </Container>
    
  </Helmet>
    
  )
}

export default Success