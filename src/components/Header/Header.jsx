import React, {useRef, useState, useEffect} from 'react'
import { Container } from "reactstrap"
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cartUiActions } from '../../store/shopping-cart/cartUiSlice'
import "../../styles/header.css";
import { useQuery } from '@tanstack/react-query'
import { thunkCartTypes } from '../../constants/thunkTypes'
import { getCart } from '../../api/fetchers/cart'

import {Button, Dialog, Alert, AlertTitle, Icon} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'
import { baseURL } from '../../constants/baseURL'
import avatarDefault from '../../assets/images/avatarDefault.png'
const userID1 = sessionStorage.getItem("userID");
console.log(userID1,'sdlfjslkdfjlsdkfjlskdfjsldkfjlsdkjfsdlkj')
const nav__links1 = [
  {
    display: "Trang chủ",
    path: "/home",
  },
  {
    display: "Mua sắm",
    path: "/foods",
  },
]
const nav__links = [
  {
    display: "Trang chủ",
    path: "/home",
  },
  {
    display: "Mua sắm",
    path: "/foods",
  },
  
  {
    display: "Tài khoản",
    path: `/userinformation/${userID1}`
    
  } 
  ,
  {
    display: "Đơn hàng",
    path: "/historyOrder",
  },
  {
    display: "Nhắn tin",
    path: "/chat-box",
  }
  
]

const Header = () => {
  const userID = sessionStorage.getItem("userID");
  const [userData, setUserData]  = useState({});

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

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/user/${userID}`)
      .then((res) => {
        // SET PHONE AND NAME TO SESSIONSTORAGE
        sessionStorage.setItem('customerName', res.data.name);
        sessionStorage.setItem('customerPhone', res.data.phone);

        if(res.data.image !== null) {
          // GET IMAGE URL
          axios.get(`${baseURL}/api/v1/user/image?filename=${res.data.image}`)
          .then((res) => {
              let x = res.data
              let b = x.slice(0, -1);
              setUserData(b);
          })
          .catch((err) => console.log("Image url error: ", err))
        }
        else {
          setUserData(avatarDefault);
        }
      })
      .catch((err) => console.log(err))
  }, [])

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
              {
              userID1 !== null ?
              nav__links.map((item, index) => (
                <NavLink
                
                  to={item?.path}
                  key={index}
                  className={navClass => navClass.isActive ? 'active__menu' : ''}
                >
                  {item?.display.toUpperCase()}
                </NavLink>
              ))
              :
              nav__links1.map((item, index) => (
                <NavLink
                
                  to={item?.path}
                  key={index}
                  className={navClass => navClass.isActive ? 'active__menu' : ''}
                >
                  {item?.display.toUpperCase()}
                </NavLink>
              ))
              }
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
                placeholder='Tìm kiếm...'
                onChange={(e) => setSearchText(e.target.value)}
              />
            </span>
            <span>
                {
                  userID ?
                  <div className='header__avatar' onClick={() => navigate(`/userinformation/${userID}`)}>
                    <img src={userData} />
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

