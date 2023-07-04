import React from 'react'
import Routes from '../../routes/Routers'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Carts from '../UI/cart/Carts'
import '../../styles/wrapper__layout.css'
import { useSelector } from 'react-redux'


const Layout = () => {

  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  return (
    
    <div className='wrapper__layout '>
      <Header/>
      {
        showCart && <Carts />
      }
      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  )
}

export default Layout