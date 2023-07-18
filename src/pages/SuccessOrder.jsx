import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import VNPAY from '../assets/images/vnpay.png'
import '../styles/success.css'
import Helmet from '../components/Helmet/Helmet'
import {Box, CircularProgress} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios'
import { baseURL } from '../constants/baseURL'
import { useLocation, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppProvider'
import QLPAY from '../assets/images/QLPAY.JPG'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userIDD = sessionStorage.getItem('userID');
const dataJSON = sessionStorage.getItem('dataJSON');
const voucherSelectedId = sessionStorage.getItem('voucherSelectedId');
const SuccessOrder = () => {

  const location = useLocation();
  const ref = useRef();
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [productCartData, setProductCartData] = useState([]);
  const cartIDD = sessionStorage.getItem("cartId");
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const queryTotalPrice = params.get('totalPrice');

    setTotalPrice(queryTotalPrice);

  })
  const showToastMessageError = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });
};
  // DECREASE VOUCHER AMOUNT
  const decreaseVoucherAmount = () => {
    axios.put(`${baseURL}/api/v1/voucher/decrease-quantity?voucherId=${voucherSelectedId}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
  }
  // DELETE ALL PRODUCT IN CART WHEN CREATE ORDER:
  const clearCart = () => {
    axios.delete(`${baseURL}/api/v1/cart/product/clear-all?cartId=${cartIDD}`)
      .then((res) => console.log(res))
      .catch((err) => console.log("CLear cart err: ", err))
  }
  // ADD PRODUCT FROM CART TO ORDER
  const addProductToOrder = (orderId) => {
    productCartData.map((item) => {
      axios.post(`${baseURL}/api/v1/order/orderProduct?orderId=${orderId}&productId=${item.productId}&amount=${item.amount}`)
        .then((res) => console.log(res.data.message))
        .catch((err) => console.log("Response add porduct to ordeer", err))
    })
  }
  const WalletCheckout = (orderId) => {
    axios.put(`${baseURL}/api/v1/order/wallet-checkout?orderId=${orderId}&userId=${userIDD}&totalPrice=${totalPrice}`)
      .then((res) => alert(res.data))
      .catch((err) => console.log(err))
  }
  const createOrder = () => {
    if (userData.wallet < totalPrice) {
      showToastMessageError('Số dư trong ví không đủ, vui lòng nạp thêm để tiến hành thanh toán');
    }
    else {
      setLoading(true);
      axios.post(`${baseURL}/api/v1/order?userId=${userIDD}`, dataJSON, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          decreaseVoucherAmount();
          addProductToOrder(res.data.data.orderId);
          WalletCheckout(res.data.data.orderId);
          clearCart();
          sessionStorage.removeItem('dataJSON');
          sessionStorage.removeItem('voucherSelectedId');
          navigate('/historyOrder');

        })
        .catch((err) => {
          console.log('Create order error: ', err);
        })
        .finally(() => setLoading(false))
    }
  }
  useEffect(() => {
    // GET PRODUCT BY CART ID
    let cartID = sessionStorage.getItem("cartId");

    axios.get(`${baseURL}/api/v1/cart/product?cartId=${cartID}`)
      .then((res) => {

        setProductCartData(res.data);

      })
      .catch((err) => {
        console.log("Cart data error: ", err);
      })
  }, [])

  if (loading) {
    return (
      <div style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column'
      }}>
        <p style={{ marginBottom: 20, fontSize: 20 }}>Đang tiến hành thanh toán đơn hàng</p>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </div>
    )
  }

  return (

    <Helmet title='Payment'>
      <ToastContainer />
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6' sm='12' className='m-auto text-center'>
              <div className="success__wrapper">
                <div className="success__icon">
                  <img src={QLPAY} alt="" />
                </div>
                <div className="success__title">
                  <h5>Giá : {totalPrice}đ</h5>
                </div>
                
                  <p>Số dư trong ví: <span style={{color: '#F9813A'}}>{userData.wallet}đ</span></p>

                  <button onClick={() => navigate(`/userinformation/${userData.id}`)}
                    style={{backgroundColor: '#F9813A', outline: 'none', border: 'none', padding: 10, borderRadius: 10}}
                  >Nạp tiền</button>
                
                <div style={{ display: 'flex', width: 500, justifyContent: 'space-between' }}>
                  <Link to={'/checkout'}><button className='payment__btn'><ArrowBackIosNewIcon />Quay lại</button></Link>
                  <button className='payment__btn'
                    onClick={() => createOrder()}
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