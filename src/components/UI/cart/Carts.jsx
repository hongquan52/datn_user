
import React, {useState,useEffect, Suspense} from "react";

import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";



import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../../store/shopping-cart/cartUiSlice";
import { Box, CircularProgress } from '@mui/material'

import "../../../styles/shopping-cart.css";
import { useQuery } from "@tanstack/react-query";
import { thunkCartTypes } from "../../../constants/thunkTypes";
import { getCart, getProductInCart } from "../../../api/fetchers/cart";
import axios from "axios";
import { baseURL } from "../../../constants/baseURL";

const CartItem = React.lazy(() => import('./CartItem'))

const cartId = sessionStorage.getItem('cartId')

const Carts = () => {

  const [visible, setVisible] = useState(false)
  
  const {isLoading, data} = useQuery([thunkCartTypes.GET_PRODUCT_IN_CART], () => getProductInCart(cartId));

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    // CALL API GET PRODUCT IN CART
    const  cartId  = sessionStorage.getItem("cartId")
    axios.get(`${baseURL}/api/v1/cart/product?cartId=${cartId}`)
      .then((res) => {
        setCartData(res.data);
      })
      .catch((err) => console.log("Cart product error: ", err))
  }, [])
  
  const totalBill = cartData.reduce((acc, item) => {
    
    return acc + (item.price)* item.amount;
    
  }, 0)
  // totalBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const dispatch = useDispatch();
  //const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  

  if(isLoading) {
    return (
        <div style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    )
  }
  
  return (
    <div className="cart__container">
      
      <ListGroup className="cart">
        <div className="cart__close">
          <span onClick={toggleCart}>
            <i class="ri-close-fill"></i>
          </span>
        </div>

        <div className="cart__item-list">
          <Suspense fallback={<p>Loading......</p>}>
            {cartData.length === 0 ? (
              <h6 className="text-center mt-5">Giỏ hàng trống</h6>
            ) : (
              
              cartData.map((item, index) => (
                <CartItem item={item} key={index}/>
              ))
            )}
          </Suspense>
          <Link className="m-3" to='/cart'><button onClick={toggleCart} className="addToCart__btn">Chi tiết giỏ hàng</button></Link>
        </div>
        
        <div>
          
        </div>
        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>
            
            Tổng tiền : <span>{totalBill}đ</span>
          </h6>
          <button>
            <Link to="/checkout" onClick={toggleCart}>
              Checkout now
            </Link>
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;