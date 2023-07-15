import React, { useRef, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../styles/login.css'
import jwtDecode from 'jwt-decode'
import { Button, Dialog, Alert, AlertTitle } from '@mui/material'

import axios from 'axios'
import { baseURL } from '../constants/baseURL'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  
  const [openNotify, setOpenNotify] = useState(false);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  // NOTIFY TOASTIFY
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };
  const showToastMessageError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const loginGGHandle = () => {
    axios.get(`${baseURL}/oauth2/getToken`)
      .then((res) => sessionStorage.setItem('tokenGG', res.data))
  }
  const onSubmit = async () => {
   
    var formdata = new FormData();
    formdata.append("phone", phone);
    formdata.append("password", password);

    axios.post(`${baseURL}/auth/login`, formdata)
      .then((res) => {
        if (res.data.status === 'UNAUTHORIZED') {
          if(res.data.message === 'User is disabled') {
            showToastMessageError(`${res.data.message}. Vui lòng kiểm tra email để kích hoạt tài khoản`);
            
          }
          else {
            showToastMessageError("Số điện thoại hoặc mật khẩu không đúng!!")
          }
        }
        else {
          showToastMessage("Login successfully!")
          decoded(res.data.data.accessToken); // decode bên FE
          navigate("/home");
          window.location.reload();
        }
      })
      .catch((err) => {
        alert('Login failed')
        console.log('LOgin errror: ', err);
      })

  };

  const decoded = (token) => {
    const decoded = jwtDecode(token);
    const manguoidung = decoded.sub
    const manguoidung1 = parseInt(manguoidung);
    sessionStorage.setItem("userID", manguoidung1);
    sessionStorage.setItem("accessToken", token);

  }
  return (
    <Helmet title='Login'>
      <ToastContainer />
      <Dialog open={openNotify} onClose={() => setOpenNotify(!openNotify)}>
        <Alert
          severity="error"
        >
          <AlertTitle>Login</AlertTitle>
          Your phone or password is incorrect !!!
        </Alert>
      </Dialog>

      <div className='login__container'>

        <section>
          <Container>
            <Row>
              <Col lg='7' md='6'>

              </Col>
              <Col lg='5' md='6'>
                <div style={{ width: 400, height: 400, backgroundColor: 'white', borderRadius: 10 }}>
                  <div className='login__form d-flex justify-content-center'>
                    <h5 style={{ marginTop: 10, fontWeight: 'bold' }}>Đăng nhập</h5>
                    <div className="newsletter">
                      <span>
                        <i class="ri-phone-fill"></i>
                      </span>
                      <input
                        onChange={(e) => setPhone(e.target.value)}
                        type="email" style={{ backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 14, paddingLeft: 10, width: 200 }} />
                    </div>
                    <div className="newsletter">
                      <span onClick={() => setHidePassword(!hidePassword)}>
                        {
                          hidePassword ? <i class="ri-lock-2-fill"></i>
                            : <i class="ri-lock-unlock-fill"></i>
                        }

                      </span>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type={hidePassword ? 'password' : 'email'}
                        style={{ backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 14, paddingLeft: 10, width: 200 }} />

                    </div>
                    <div style={{display: 'flex',flexDirection: 'row'}}>
                      <Link to={'/reset-password'} style={{fontSize: 14}}>Quên mật khẩu</Link>
                    </div>
                    <button
                      onClick={() => onSubmit()}
                      className='login__btn'
                    >
                      Đăng nhập
                    </button>
                    <p>Đăng nhập bằng</p>
                    <div
                      className='login__bt1-container'
                    >
                      <button
                        onClick={() => loginGGHandle()}
                        className='login__btn1'
                      >

                        <a href='http://localhost:8080/oauth2/authorization/google'>

                          <img
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png'
                            style={{ height: 20, width: 20 }}
                          />
                        </a>
                      </button>
                      
                    </div>
                    <p>Bạn chưa có tài khoản ?</p>
                    <Link to='/register'>
                      <p style={{ marginTop: -10, color: '#F9813A' }}>Đăng kí</p>
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

export default Login

