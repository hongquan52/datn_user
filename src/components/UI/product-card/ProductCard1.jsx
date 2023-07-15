import React from 'react'

import '../../../styles/product-card1.css'

import { Link, Navigate } from 'react-router-dom'
import flashSaleLogo from '../../../assets/images/flashSaleIcon.png'
import image from '../../../assets/images/ava-1.jpg'

import { useNavigate } from 'react-router-dom'
import { Rating } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const userID1 = sessionStorage.getItem("userID");
const cartId = sessionStorage.getItem("cartId")

const ProductCard = (props) => {
    const navigate = useNavigate()
    const { id, name, thumbnail, discount, discountPrice, price, rate } = props.item

    const addToCart = () => {
        if (userID1 !== null) {
            // CALL API ADD PRODUCT TO CART
            var requestOptions = {
                method: 'POST',
                redirect: 'follow'
            };

            fetch(`http://localhost:8080/api/v1/cart/product?cartId=${cartId}&productId=${id}&amount=1`, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
        else {
            navigate('/login');
        }


    }
    return (
        <div className='product__item1'>
            {
                discount >= 30 &&
                <img src={flashSaleLogo} style={{ width: 60, height: 60, position: 'absolute', zIndex: 10, top: -10, left: -5 }} />
            }
            {
                discount > 0 &&
                <p className='product__discount1'>-{discount}%</p>
            }
            <Link to={`/foods/${id}`}>
                <div className='product__img'>
                    {
                        image ?
                            (
                                <img
                                    src={thumbnail.slice(0, -1)}
                                    alt="product-img"
                                    style={{ width: 140, borderRadius: 20, height: 110 }}
                                />
                            ) :
                            (<img src={"https://www.pngitem.com/pimgs/m/45-455622_transparent-computer-png-gaming-pc-transparent-png-png.png"} alt="product-img" className='w-50' />)
                    }
                </div>
            </Link>
            <div className='product__content1'>
                <h5><Link to={`/foods/${id}`}>{name}</Link></h5>
            </div>
            <Rating
                value={
                    rate % 1 < 0.5 ?
                        Math.floor(rate)
                        :
                        Math.ceil(rate)
                }
                readOnly
            />
            <div className='footer__container1'>

                <span className="product__discountPrice">
                    {discountPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ
                </span>
                <span onClick={props.sukien}>
                    <button className='addToCart__btn addToCart__btn1'
                        onClick={addToCart}><AddCircleIcon /></button>
                </span>
            </div>


        </div>
    )
}

export default ProductCard