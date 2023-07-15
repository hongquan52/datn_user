import React from 'react'
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ListGroupItem } from 'react-bootstrap'
import '../../../styles/cart-item.css'

import { useDispatch } from 'react-redux'
import { cartActions } from '../../../store/shopping-cart/cartSlice'
import { useState } from 'react'
import { Button, Dialog, Alert, AlertTitle } from '@mui/material'
import { deleteCart } from '../../../api/fetchers/cart'
import axios from 'axios';
import { baseURL } from '../../../constants/baseURL';

const cartId = sessionStorage.getItem("cartId")

const CartItem = ({ item }) => {
    //----NOTIFY delete-----------------------------------------
    const [openNotify, setOpenNotify] = React.useState(false);

    const handleClickOpenNotify = () => {
        setOpenNotify(true);
    };

    const handleCloseNotify = () => {
        setOpenNotify(false);
    };
    // FAILURE
  const showToastMessageError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });

  };
    //----------------------------------------------------------------
    const { productId, productName, productImage, price, amount} = item
    const discountPrice = price * amount;
    const [soLuong, setSoLuong] = useState(amount);

    const dispatch = useDispatch()

    //   const handleClick = () => {
    //     setOpen(!open);
    //   };
    const increaseItem = () => {
        axios.get(`${baseURL}/api/v1/product/${productId}`)
        .then((res) => {
            if(res.data.inventory > amount) {
                var requestOptions = {
                    method: 'POST',
                    redirect: 'follow'
                  };
                  
                  fetch(`http://localhost:8080/api/v1/cart/product?cartId=${cartId}&productId=${productId}&amount=1`, requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                //------
                setSoLuong(soLuong + 1)
                window.location.reload();
            }
            else {
                showToastMessageError("Số lượng mua lớn hơn số lượng sản phẩm còn lại!")
            }
        })
        .catch((err) => console.log(err))
        


    }
    const decreaseItem = () => {
        if(amount > 1) {
            // call API
            var requestOptions = {
                method: 'POST',
                redirect: 'follow'
              };
              
              fetch(`http://localhost:8080/api/v1/cart/product?cartId=${cartId}&productId=${productId}&amount=-1`, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            //------
            setSoLuong(soLuong - 1)
            window.location.reload();
        }
        else {
            showToastMessageError('Không thể giảm khi số lượng sản phẩm bằng 1!')
        }

    }

    const deleteItem = () => {   
        deleteCart(productId, cartId);
        setSoLuong(0)
        window.location.reload();
    }

    return (
        <>
            <ToastContainer />
            <ListGroupItem className='border-0 cart__item'>
                {
                    soLuong > 0 ?
                        (
                            <div className="cart__item-info d-flex gap-2">
                                <img src={productImage.slice(0,-1)} alt="product-img" />
                                <div className="cart__product-info w-100 d-flex align-items-center
             gap-4 justify-content-between">
                                    <div>

                                        <h6 className='cart__product-title'>{productName}</h6>
                                        <p className='d-flex align-items-center gap-5
                     cart__product-price'>{soLuong}x <span style={{fontWeight: 400, color: 'black', fontSize: 14}}>{price}đ</span>
                                            <span>{discountPrice}đ</span>
                                        </p>

                                        <div className='d-flex align-items-center justify-content-between
                         increase__decrease-btn'>
                                            <span>
                                                <span className='decrease__btn' onClick={decreaseItem}><i className='ri-subtract-line'></i></span>
                                            </span>
                                            <span className='quantity'>{soLuong}</span>
                                            <span>
                                                <span className='increase__btn' onClick={increaseItem}><i className='ri-add-line'></i></span>
                                            </span>
                                        </div>
                                    </div>
                                    <span className='delete__btn' onClick={deleteItem}><i className='ri-close-line'></i></span>

                                </div>
                            </div>
                        ) :
                        (
                            null
                        )
                }
            </ListGroupItem>
            <div>
                
                <Dialog
                    open={openNotify}
                    onClose={handleCloseNotify}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Thông báo"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Bạn có chắc muốn xóa sản phẩm ra khỏi giỏ hàng ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button className="addToCart__btn" onClick={handleCloseNotify}>Hủy</button>
                        <button className="addToCart__btn" onClick={handleCloseNotify}>
                            Đồng ý
                        </button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default CartItem