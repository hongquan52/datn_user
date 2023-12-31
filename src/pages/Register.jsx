import React, {useRef, useState} from 'react'
import Helmet from '../components/Helmet/Helmet'

import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {  Dialog, Alert, AlertTitle } from '@mui/material'
import '../styles/login.css'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [hidePassword, setHidePassword] = useState(true);

  // NOTIFY REGISTER
  const [openNotify, setOpenNotify] = useState(false);
  const [openNotify1, setOpenNotify1] = useState(false);
  // TOASTIFY
  const showToastMessageSuccess = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
    });
  };
  const showToastMessageError = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });
  };
  const navigate = useNavigate();
  // REGISTER FUNCTION
  const onSubmit = () => {
    if(password !== confirmPassword) {
      showToastMessageError('Mật khẩu không trùng khớp')
    }
    else {
      showToastMessageSuccess('Đăng kí thành công. Vui lòng kiểm tra email để kích hoạt tài khoản')
      var dataForm = new FormData();
      dataForm.append('name', name);
      dataForm.append('email', email);
      dataForm.append('phone', phone);
      dataForm.append('password', password);
      dataForm.append('role', '2');
      axios.post(`${baseURL}/api/v1/user`, dataForm)
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log("Create user error: ", err))

    }
  }

  return (
    <Helmet title='Login'>
      <ToastContainer />
      <Dialog open={openNotify} onClose={() => navigate('/login')}>
        <Alert
          severity="success"
        >
          <AlertTitle>Register</AlertTitle>
          Register succesfully !!!
        </Alert>
      </Dialog>
      <Dialog open={openNotify1} onClose={() => setOpenNotify1(!openNotify1)}>
        <Alert
          severity="error"
        >
          <AlertTitle>Register</AlertTitle>
          Your password does'nt match again!!!
        </Alert>
      </Dialog>
      <div className='login__container'>

        <section>
          <Container>
            <Row>
              <Col lg='7' md='6'>

              </Col>
              <Col lg='5' md='6'>
                <div style={{width: 400, height: 500, backgroundColor: 'white', borderRadius: 10}}>
                  <div className='login__form d-flex justify-content-center'>
                    <h5 style={{marginTop: 10, fontWeight: 'bold'}}>Đăng kí</h5>
                    <div className="newsletter">
                      <span>
                      <i class="ri-phone-fill"></i>
                      </span>
                      <input 
                        placeholder='Số điện thoại...'
                        onChange={(e) => setPhone(e.target.value)}
                      type="email"  style={{backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 15, width: 200}} />
                    </div>
                    <div className="newsletter">
                      <span>
                      <i class="ri-walk-line"></i>
                      </span>
                      <input 
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Tên...'
                      type="email"  style={{backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 15, width: 200}} />
                    </div>
                    <div className="newsletter"> 
                      <span>
                      <i class="ri-mail-fill"></i>
                      </span>
                      <input 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email...'
                      type="email"  style={{backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 15, width: 200}} />
                    </div>
                    <div className="newsletter">
                      <span onClick={() => setHidePassword(!hidePassword)}>
                      {
                        hidePassword ? <i class="ri-lock-2-fill"></i>
                        : <i class="ri-lock-unlock-fill"></i>
                      }
                      
                      </span>
                      <input 
                        placeholder='Mật khẩu...'
                        onChange={(e) => setPassword(e.target.value)}
                      type={hidePassword ? 'password' : 'email'}  
                      style={{backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 15, width: 200}}/>
                      
                    </div>
                    <div className="newsletter">
                      <span onClick={() => setHidePassword(!hidePassword)}>
                      {
                        hidePassword ? <i class="ri-lock-2-fill"></i>
                        : <i class="ri-lock-unlock-fill"></i>
                      }
                      
                      </span>
                      <input 
                        placeholder='Xác nhận mật khẩu'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      type={hidePassword ? 'password' : 'email'}  
                      style={{backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 15, width: 200}}/>
                      
                    </div>
                    <button
                      onClick={() => onSubmit()}
                      className='login__btn'
                    >
                      Đăng kí
                    </button>
                    
                    <p>Bạn đã có tài khoản?</p>
                    <Link to='/login'>
                      <p style={{marginTop: -10, color: '#F9813A'}}>Đăng nhập ngay</p>
                    </Link>
                  </div>
                </div>
              </Col>
              
            </Row>
          </Container>
        </section>
      </div>
    </Helmet>
  )
}

export default Register

