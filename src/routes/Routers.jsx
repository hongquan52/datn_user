import React , {Suspense}from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ChatBox from '../pages/ChatBox'
// import LoginOAuth2 from '../pages/LoginOAuth2';
// import Login from '../pages/Login'

// LAZY LOADING
const Home = React.lazy(() => import('../pages/Home'));
const HistoryOrder = React.lazy(() => import('../pages/HistoryOrder'));
const Success = React.lazy(() => import('../pages/Success'));
const Failed = React.lazy(() => import('../pages/Failed'));
const SuccessOrder = React.lazy(() => import('../pages/SuccessOrder'));
const Cart = React.lazy(() => import('../pages/Cart'));
const Checkout = React.lazy(() => import('../pages/Checkout'));
const Contact = React.lazy(() => import('../pages/Contact'));
const FoodDetails = React.lazy(() => import('../pages/FoodDetails'));
const Login = React.lazy(() => import('../pages/Login'));
const LoginOAuth2 = React.lazy(() => import('../pages/LoginOAuth2'));
const Register = React.lazy(() => import('../pages/Register'));
const AllFoods = React.lazy(() => import('../pages/AllFoods'));
const Delivery = React.lazy(() => import('../pages/Delivery'));
const UserInformation = React.lazy(() => import('../pages/UserInformation'));
const Voucher = React.lazy(() => import('../pages/Voucher'));
const ResetPassword = React.lazy(() => import('../pages/ResetPassword'));
const CreateNewPassword = React.lazy(() => import('../pages/CreateNewPassword'));

const Routers = () => {
  return (
          <Suspense fallback={<div>Loading...</div>}>
    <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/foods' element={<AllFoods />} />
            <Route path='/foods/:productId' element={<FoodDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/register' element={<Register />} />
            <Route path='/userinformation/:userId' element={<UserInformation />} />
            <Route path='/successOrder' element={<Success />} />
            <Route path='/failureOrder' element={<Failed />} />
            <Route path='/payment' element={<SuccessOrder />} />
            <Route path='/historyOrder' element={<HistoryOrder />} />
            <Route path='/delivery/:orderID' element={<Delivery />} />
            <Route path='/voucher' element={<Voucher />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/new-password' element={<CreateNewPassword />} />
            <Route path='/chat-box' element={<ChatBox />} />
            <Route path='/login' element={<Login />} />
            <Route path='/loginGG' element={<LoginOAuth2 />} />
        </Routes>
          </Suspense>

  )
}

export default Routers