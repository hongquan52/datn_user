import React, { useRef, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../api/fetchers/user'
import '../styles/login.css'
import jwtDecode from 'jwt-decode'
import { Button, Dialog, Alert, AlertTitle } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { thunkCartTypes } from '../constants/thunkTypes'
import { getCart } from '../api/fetchers/cart'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ResetPassword = () => {
  
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
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
  // GET VERIFY CODE FUNCTION
  const getVerifyCode = () => {
    axios.get(`${baseURL}/api/v1/user/password/send-mail?email=${email}`)
        .then((res) => {
            if(res.data.status ==='BAD_REQUEST') {
                showToastMessageError(res.data.message);
            }
            else {
                showToastMessage('Vui lòng kiểm tra mã xác thực trong email của bạn')
            }
        })
        .catch((err) => console.log(err))
        
  }
  // NEXT STEP WITH VERIFY CODE
  const nextStep = () => {
    var formdata = new FormData();
    formdata.append("phone", phone);
    formdata.append("password", password);

    axios.post(`${baseURL}/auth/login`, formdata)
      .then((res) => {
        if (res.data.status === 'UNAUTHORIZED') {
          showToastMessageError("Verify code is incorrect! Please enter again");
        }
        else {
          showToastMessage('Navigate to new password page');
          decoded(res.data.data.accessToken);
          navigate('/new-password');
        }
      })
      .catch((err) => {
        alert('Login failed')
        console.log('LOgin errror: ', err);
      })
  }
  const decoded = (token) => {
    const decoded = jwtDecode(token);
    const manguoidung = decoded.sub
    const manguoidung1 = parseInt(manguoidung);
    sessionStorage.setItem("userID", manguoidung1);
  }
  return (
    <Helmet title='Login'>
      <ToastContainer />
      <div className='login__container'>

        <section>
          <Container>
            <Row>
              <Col lg='7' md='6'>

              </Col>
              <Col lg='5' md='6'>
                <div style={{ width: 400, height: 400, backgroundColor: 'white', borderRadius: 10 }}>
                  <div className='login__form d-flex justify-content-center'>
                    <h5 style={{ marginTop: 10, fontWeight: 'bold' }}>Đặt lại mật khẩu</h5>
                    <div className="newsletter">
                      <span>
                        <i class="ri-mail-line"></i>
                      </span>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" style={{ backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 14, paddingLeft: 10, width: 200 }} />
                    </div>
                    <div className="newsletter">
                      <span>
                      <i class="ri-phone-fill"></i>
                      </span>
                      <input
                        onChange={(e) => setPhone(e.target.value)}
                        type="email" style={{ backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 14, paddingLeft: 10, width: 200 }} />
                    </div>
                    <div className="newsletter">
                    <span>
                        <i class="ri-barcode-line"></i>
                      </span>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 14, paddingLeft: 10, width: 200 }}
                        placeholder='Enter your verify'
                        />
                    </div>
                    
                    <button
                      onClick={() => getVerifyCode()}
                      className='login__btn'
                    >
                      Gửi mã xác thực
                    </button>
                    <button
                      onClick={() => nextStep()}
                      className='login__btn'
                    >
                      Tiếp theo <ArrowForwardIcon />
                    </button>
                    
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

export default ResetPassword

