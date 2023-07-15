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


const CreateNewPassword = () => {
    const userID = sessionStorage.getItem('userID');

    const [phone, setPhone] = useState('');
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
    // CREATE NEW PASSWORD
    const createPassword = () => {
        if (phone !== password) {
            alert("Two password is not match!!!");
        }
        else {
            var data1 = new FormData();
            data1.append('newPassword', phone);
            data1.append('confirmPassword', password);
            axios.put(`${baseURL}/api/v1/user/${userID}/password`, data1)
                .then((res) => showToastMessage(res.data.message))
                .catch((err) => console.log("Change password err: ", err))
        }
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
                                        <h5 style={{ marginTop: 10, fontWeight: 'bold' }}>ĐẶT MẬT KHẨU MỚI</h5>

                                        <div className="newsletter">
                                            <span>
                                                <i class="ri-git-repository-private-fill"></i>
                                            </span>
                                            <input
                                                onChange={(e) => setPhone(e.target.value)}
                                                type="password" style={{ backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 14, paddingLeft: 10, width: 200 }} />
                                        </div>
                                        <div className="newsletter">
                                            <span>
                                                <i class="ri-git-repository-private-fill"></i>
                                            </span>
                                            <input
                                                onChange={(e) => setPassword(e.target.value)}
                                                style={{ backgroundColor: '#fedac5', padding: 5, borderRadius: 5, fontSize: 14, paddingLeft: 10, width: 200 }}
                                                type='password'
                                            />
                                        </div>

                                        <button
                                              onClick={() => createPassword()}
                                            className='login__btn'
                                        >
                                            Lưu mật khẩu
                                        </button>
                                        <button
                                              onClick={() => navigate('/login')}
                                            className='login__btn'
                                        >
                                            Đăng nhập ngay
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

export default CreateNewPassword

