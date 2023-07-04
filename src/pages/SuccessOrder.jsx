import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import logoSuccess from '../assets/images/success.gif'
import '../styles/success.css'
import Helmet from '../components/Helmet/Helmet'
import { useQuery } from '@tanstack/react-query'
import { thunkCartTypes, thunkOrderTypes } from '../constants/thunkTypes'
import { getAllOrder } from '../api/fetchers/order';
import { getProductInCart } from '../api/fetchers/cart'
import { useEffect } from 'react'

const cartId = sessionStorage.getItem('cartId')

const SuccessOrder = () => {

  const {isLoading, data} = useQuery([thunkOrderTypes.GET_ALLORDER], getAllOrder)
  const getCartDetail = useQuery([thunkCartTypes.GET_PRODUCT_IN_CART], ()=> getProductInCart(cartId))
  const [order, setOrder] = useState([])
  const [cartDetail, setCartDetail] = useState([]);

  console.log("getOrderBYUser: ", order)
  const newBillId = order[order.length-1]?.billId;
  console.log("product in cart detail: ", cartDetail)
  console.log("new bill", newBillId);
  
  useEffect(() => {
    if(data && getCartDetail.data) {
      setOrder(data.data);
      setCartDetail(getCartDetail.data.data);
    }
  }, [data])

  const handleConfirm = () => {
      cartDetail.map((item) => {
        var requestOptions = {
          method: 'POST',
          redirect: 'follow'
        };
        
        fetch(`http://localhost:8080/api/v1/bill/billDetail?billId=${newBillId}&productId=${item.productId}&amount=${item.amount}`, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      })

      // clear cart detail
      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:8080/api/v1/cart/product/all?cartId=${cartId}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      window.location.reload();
      //---------------------------

      window.location.reload();

  }
  return (
    
    <Helmet title='Đặt hàng thành công'>
    
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12' className='m-auto text-center'>
                <div className="success__wrapper">
                    <div className="success__icon">
                        <img src={logoSuccess} alt="" />
                    </div>
                    <div className="success__title">
                        <h5>Đặt hàng thành công</h5>
                    </div>
                    {/* <div className="sucess__content">
                        <h6>Mã hơn hàng của bạn là: DH0001</h6>
                    </div>          */}
                    <Link to={'/historyOrder'}><button className='addToCart__btn'>Lịch sử mua hàng</button></Link>
                    <button className='addToCart__btn' onClick={handleConfirm}>Xác nhận đặt hàng</button>
                    
                </div>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
    
  )
}

export default SuccessOrder