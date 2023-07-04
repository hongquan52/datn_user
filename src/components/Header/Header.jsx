import React, {useRef, useState, useEffect} from 'react'
import { Container } from "reactstrap"
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cartUiActions } from '../../store/shopping-cart/cartUiSlice'
import avatarHeader from '../../assets/images/ava-1.jpg'
import "../../styles/header.css";
import { useQuery } from '@tanstack/react-query'
import { thunkCartTypes } from '../../constants/thunkTypes'
import { getCart } from '../../api/fetchers/cart'

import {Button, Dialog, Alert, AlertTitle, Icon} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


const userID = sessionStorage.getItem("userID")
const userName = sessionStorage.getItem("userName")

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Shopping",
    path: "/foods",
  },
  
  {
    display: "Profile",
    path: `/userinformation/${userID}`
    
  } 
  ,
  {
    display: "Your order",
    path: "/historyOrder",
  },
  
]

const Header = () => {
  const {isLoading, data} = useQuery([thunkCartTypes.GET_CART], () => getCart(userID) )
  
  const [searchText, setSearchText] = useState('');

  const [quantity, setQuantity] = useState(0)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const menuRef = useRef(null)
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')
  const headerRef = useRef(null)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const dispatch = useDispatch()
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  useEffect(() => {
    if(data) {
      setQuantity(data?.data?.amount)
      sessionStorage.setItem("cartId", data?.data?.cartId);
    }
  }, [data])

  const logout = () => {
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("cartId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("accessToken");


    handleClick()
    navigate('/login')
    window.location.reload();
    
  }
  const handleClick = () => {
    setOpen(!open);
  };
  const soLuongSanPhamTrongGioHang = data?.data?.results?.product.reduce((acc, currentValue) => {
    return acc + currentValue.number
  }, 0)

  
  return (
    
    
    <header className="header" >
      
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          
          <div className="logo">
            <Link to="/home">
              {/* <img src={logo} alt="logo" /> */}
              <img src='https://thumbs.dreamstime.com/b/print-173912734.jpg' alt='logo' style={{borderRadius: 20}} />
            </Link>
            <h5>Gaming shop</h5>
          </div>
          

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                
                  to={item?.path}
                  key={index}
                  className={navClass => navClass.isActive ? 'active__menu' : ''}
                >
                  {item?.display}
                </NavLink>
              ))}
            </div>
          </div>
          
          <div>
            <Dialog open={open} onClose={handleClick}>
                  <Alert

                    //props go here
                  >
                    <AlertTitle>Tài khoản</AlertTitle>
                    Đăng xuất thành công
                  </Alert>
              </Dialog>
          </div>
          <div className="nav__right d-flex align-items-center gap-4">
            <span className='header__search-container'>
              <div className='header__search-btn' onClick={() => {
                navigate(`/foods?searchText=${searchText}`);
              }}>
                <SearchIcon/>
              </div>
              <input
                placeholder='Search for...'
                onChange={(e) => setSearchText(e.target.value)}
              />
            </span>
            <span>
                {
                  userID ?
                  <div style={{flexDirection: 'row'}}>
                    <img src={avatarHeader}
                      style={{width: 40, height: 40, borderRadius: 20}}
                      />
                      {/* <p>{userName}</p> */}
                  </div>
                  :
                  null
                }
            </span>
            <span className="cart__icon" onClick={toggleCart}>
              <i class="ri-shopping-cart-fill"></i>
              <span className="cart__badge">{quantity}</span>
              
            </span>
            
            <span className="user">
              {
                userID ? (
                    <span onClick={logout} >
                      <Link to={'/login'}>
                      <i class="ri-logout-box-r-line" style={{color: 'white'}}></i>
                      </Link>
                    </span>  
                ) :
                ( 
                  <span>
                    <Link to="/login">
                  <i class="ri-user-line" style={{color: 'white'}} ></i>
                  </Link></span>
                )
              }
            </span>
            
            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header 

