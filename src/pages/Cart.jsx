import React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Helmet from '../components/Helmet/Helmet'
import { CircularProgress } from '@mui/material'

import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { cartActions } from '../store/shopping-cart/cartSlice'

import '../styles/cart-page.css'

import { useState, useEffect } from 'react'
import NavigationNexIcon from '@mui/icons-material/NavigateNext'
import {
  Box, Breadcrumbs, Typography
} from '@mui/material'
import LinkBread from '@mui/material/Link'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'
import { useContext } from 'react'
import { AppContext } from '../Context/AppProvider'

const Cart = () => {
  const { allProductData } = useContext(AppContext);
  const [cartID, setCartID] = useState(0);
  // CHANGE AMOUNT STATE:
  const [changeAmountState, setChangeAmountState] = useState(0)
  const [productSelected, setProductSelected] = useState(0)
  const [flagChange, setFlagChange] = useState(false);

  const [cartProduct, setCartProduct] = useState([]);

  const subtotal = cartProduct.reduce((acc, item) => {

    return acc + item.price * item.amount;
  }, 0)
  // ECONOMIZE PRICE
  const economize = cartProduct.reduce((acc, item) => {

    return acc + item.price * item.discount / 100 * item.amount;
  }, 0)
  useEffect(() => {
    const cartId = sessionStorage.getItem("cartId")
    setCartID(cartId);
    axios.get(`${baseURL}/api/v1/cart/product?cartId=${cartId}`)
      .then((res) => {
        console.log("Cart data product: ", res.data);
        setCartProduct(res.data);
      })
      .catch((err) => {
        console.log("Cart data error: ", err);
      })

  }, [])
  // if (isLoading) {
  //   return (
  //     <div style={{
  //       display: "flex",
  //       height: "100vh",
  //       alignItems: "center",
  //       justifyContent: "center",
  //     }}>
  //       <Box sx={{ display: 'flex' }}>
  //         <CircularProgress />
  //       </Box>
  //     </div>
  //   )
  // }

  // CHANGE AMOUNT FUNCTION

  useEffect(() => {
    if(changeAmountState === -1) {
      let productInCart = cartProduct.find(
        (item) => item.productId === productSelected
      )
      if(productInCart.amount > 1) {
        changAmountProduct();
      }
      else {
        showToastMessageErrorReview("Không thể giảm khi số lượng mua bằng 1");
      }
      
    }
    else {
      let productInCart = cartProduct.find(
        (item) => item.productId === productSelected
      )
      axios.get(`${baseURL}/api/v1/product/${productSelected}`)
        .then((res) => {
          if (res.data.inventory > productInCart?.amount) {
            changAmountProduct();
            
          }
          else {
            if(productInCart?.amount !== undefined) {
              showToastMessageErrorReview("Số lượng mua lớn hơn số lượng sản phẩm còn lại!");
            }
            else {
              console.log('x')
            }
          }
        })
        .catch((err) => console.log(err))
    }
      
  }, [flagChange])
  const changAmountProduct = () => {
    axios.post(`${baseURL}/api/v1/cart/product?cartId=${cartID}&productId=${productSelected}&amount=${changeAmountState}`)
      .then((res) => {
        window.location.reload();

      })
      .catch((err) => console.log("Add product to cart error: ", err))
  }
  // DELETE PRODUCT IN CART:
  const deleteProduct = (productID) => {
    axios.delete(`${baseURL}/api/v1/cart/product?cartId=${cartID}&productId=${productID}`)
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log("Delete product error: ", err))
    window.location.reload();
  }
  // TOAST SUCCESS BUY PRODUCT:
  const showToastMessageSuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };
  // FAILURE
  const showToastMessageErrorReview = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });

  };
  // CART CARD COMPONENT
  const CartCard = ({ item }) => {
    return (

      <div className='cartCard__container' key={item.productId}>
        <img src={item.productImage.slice(0, -1)}
          style={{ height: 80, width: 80, marginLeft: 5 }}
        />
        <p className='cartCard__name' style={{ width: 200 }}>{item.productName}</p>
        <p className='cartCard__amount' style={{ width: 80, display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}
        > <button
          style={{ width: 30, height: 30, outline: 'none', border: 'none', backgroundColor: '#F9813A', borderRadius: 10, color: 'white' }}
          onClick={() => {
            setFlagChange(!flagChange);
            setChangeAmountState(-1);
            setProductSelected(item.productId);
            
          }}
        >-</button>
          {item.amount}
          <button
            style={{ width: 30, height: 30, outline: 'none', border: 'none', backgroundColor: '#F9813A', borderRadius: 10, color: 'white' }}
            onClick={() => {
              setFlagChange(!flagChange);
              setChangeAmountState(1);
              setProductSelected(item.productId);
              
            }}
          >+</button>
        </p>
        <p className='cartCard__amount' style={{ width: 100 }}>{item.price}</p>
        <p className='cartCard__amount' style={{ width: 10 }}>{item.discount}%</p>
        <p className='cartCard__amount' style={{ width: 100 }}>{item.price}</p>
        <div>
          <i className='ri-delete-bin-line delete__btn1 m-3'
            // onClick={() => setOpenNotify(true)}
            onClick={() => {
              deleteProduct(item.productId);
            }}
          ></i>
        </div>
      </div>

    )
  }

  return (
    <Helmet title='Cart'>
      <ToastContainer />
      <Box m={2} style={{ padding: 10, marginTop: 50, marginLeft: 100 }}>
        <Breadcrumbs
          // maxItems={}
          // itemsBeforeCollapse={2}
          aria-label='breadcrumb'
          separator={<NavigationNexIcon fontSize='small' />}
        >
          <LinkBread underline='hover' href='Home' color={'#F9813A'}>
            Trang chủ
          </LinkBread>
          <Typography color={"black"}>Giỏ hàng</Typography>
        </Breadcrumbs>
      </Box>
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <div className='cartCard__container1'>
                <p
                  style={{ marginLeft: 10, fontWeight: 'bold' }}
                >
                  Hình ảnh
                </p>
                <p className='cartCard__name' style={{ marginLeft: 50, fontWeight: 'bold' }}>Tên sản phẩm</p>
                <p className='cartCard__amount1' style={{ marginRight: 40 }}>Số lượng</p>
                <p className='cartCard__amount1' style={{ marginRight: 60 }}>Giá</p>
                <p className='cartCard__amount1'>Giảm giá</p>
                <p className='cartCard__amount1' style={{ marginRight: 90 }}>Thanh toán</p>
              </div>
              {
                cartProduct.map((item) => (
                  <CartCard item={item} />
                ))
              }
            </Col>
            <Col lg='4' className='d-flex cart__summary'>
              <div className='cart__summary-title'>
                <h5>GIỎ HÀNG</h5>
              </div>
              <div className='cart__summary-content'>
                <div className='cart__summary-item'>
                  <p>TỔNG GIÁ</p>
                  <p>{subtotal} đ</p>
                </div>
                <div className='cart__summary-item'>
                  <p>GIẢM GIÁ</p>
                  <p>- {economize} đ</p>
                </div>
                <div className='cart__summary-item' style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                  <p style={{ fontSize: 20, fontWeight: 'bold' }}>TỔNG THANH TOÁN</p>
                  <p style={{ fontSize: 20, fontWeight: 'bold' }}>{subtotal - economize} đ</p>
                </div>
              </div>
              <div className='mt-5 cart__btn-container'>
                <button className=" cart__btn me-4">
                  <Link to='/foods'>Tiếp tục mua sắm</Link>
                </button>
                <button className=" cart__btn">
                  <Link to='/checkout'>Đặt hàng</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Cart
