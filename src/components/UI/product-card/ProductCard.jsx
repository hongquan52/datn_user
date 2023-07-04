import React from 'react'

import '../../../styles/product-card.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link, Navigate } from 'react-router-dom'
import image from '../../../assets/images/ava-1.jpg'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../store/shopping-cart/cartSlice'
import { useNavigate } from 'react-router-dom'
import { Rating } from '@mui/material'
const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) 
const cartId = sessionStorage.getItem("cartId")

const ProductCard = (props) => {
    const navigate = useNavigate()
    const {id, name, thumbnail, discount, discountPrice, price, rate} = props.item
    const dispatch = useDispatch()
    
    const handleClickProductName = () => {
        window.location.reload();
    }
    const addToCart = () => {
        // call API
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
          fetch(`http://localhost:8080/api/v1/cart/product?cartId=${cartId}&productId=${id}&amount=1`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
      //------
      window.location.reload();
      
    }
    return (
    <div className='product__item'>
        <div className="product__img">
            {
                image ?
                (<img src={thumbnail.slice(0,-1)} alt="product-img" className='w-50'/>):
                (<img src={"https://www.pngitem.com/pimgs/m/45-455622_transparent-computer-png-gaming-pc-transparent-png-png.png"}
                        alt="product-img" style={{height: 60, width: 60}}/>)
            }
            
        </div>

        <div className="product__content">
            <h5 onClick={handleClickProductName} style={{fontWeight: 500, }}><Link to={`/foods/${id}`}>{name}</Link></h5>
            <Rating
                    style={{marginTop: -20}}
                    value={rate}
                    readOnly
                />
            <div className='d-flex align-items-center
             justify-content-between'>
                {
                    discount !=0 &&
                    <span className="product__discountPrice1" style={{color: 'black', fontWeight: 300, fontSize: 15}}>
                        {price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                }
                <span className="product__discountPrice" style={{fontSize: 19}}>
                    {discountPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                {
                    discount != 0 && <p className='product__discount'>-{discount}%</p>
                }
                
                {
                    <span onClick={props.sukien}>
                             <button className='addToCart__btn addToCart__btn1'
                               onClick={addToCart}><AddShoppingCartIcon /></button>
                    </span>
                }
                
            </div>
        </div>
        
    </div>
  )
}

export default ProductCard