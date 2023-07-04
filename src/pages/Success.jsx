import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import logoSuccess from '../assets/images/success.gif'
import '../styles/success.css'
import Helmet from '../components/Helmet/Helmet'
const Success = () => {
  return (
    
    <Helmet title='Thanh toán thành công'>
    
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12' className='m-auto text-center'>
                <div className="success__wrapper">
                    <div className="success__icon">
                        <img src={logoSuccess} alt="" />
                    </div>
                    <div className="success__title">
                        <h5>Thanh toán thành công</h5>
                    </div>
                    {/* <div className="sucess__content">
                        <h6>Mã hơn hàng của bạn là: DH0001</h6>
                    </div>          */}
                    <Link to={'/foods'}><button className='addToCart__btn'>Tiếp tục mua hàng</button></Link>
                    
                </div>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
    
  )
}

export default Success