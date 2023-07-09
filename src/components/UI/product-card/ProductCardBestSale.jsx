import React from 'react'

import '../../../styles/ProductCardBestSale.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link, Navigate } from 'react-router-dom'
import bestSale from '../../../assets/images/bestSale.png'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) 
const cartId = sessionStorage.getItem("cartId")

const ProductCardBestSale = (props) => {
    const navigate = useNavigate()
    const {product, quantity} = props.item // Product (name, inventory, price, thumbnail, discountPercent)
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
          
          fetch(`http://localhost:8080/api/v1/cart/product?cartId=${cartId}&productId=${product.id}&amount=1`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
      //------
      window.location.reload();
      
    }
    return (
    <div className='product__item' style={{position: 'relative'}}>
        <div style={{position: 'absolute', zIndex: 10, top: 0, left: 0}}>
            <img src={bestSale} style={{width: '5rem', height: '5rem'}} />
            <p style={{backgroundColor: '#df2020',height: '2rem', color: 'white', fontWeight: 'bold', margin: 'auto',marginTop: 10
                    , padding: 5, borderRadius: 10}}>Sales: {quantity}</p>
        </div>
        <div className="product__img">
            {
                product.thumbnail ?
                (<img src={product.thumbnail.slice(0,-1)} alt="product-img"/>):
                (<img src={"https://www.pngitem.com/pimgs/m/45-455622_transparent-computer-png-gaming-pc-transparent-png-png.png"} alt="product-img" className='w-50'/>)
            }
            
        </div>

        <div className="product__content">
            <h5 onClick={handleClickProductName} style={{fontWeight: 500, height: '4rem', color: 'white'}}><Link to={`/foods/${product.id}`}>{product.name}</Link></h5>
            <div className='d-flex align-items-center
             justify-content-between'>
                {
                     product.discountPercent !=0 &&
                    <span className="product__discountPrice1" style={{color: 'black', fontWeight: 300, fontSize: 15}}>
                        {product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                }
                <span className="product__discountPrice" style={{fontSize: 19}}>
                    {(product.price*(100-product.discountPercent)/100)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                {
                    product.discountPercent != 0 && <p className='product__discount'>-{product.discountPercent}%</p>
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

export default ProductCardBestSale