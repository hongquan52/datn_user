import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getDelivery } from '../api/fetchers/order'
import Helmet from '../components/Helmet/Helmet'
import { thunkOrderTypes } from '../constants/thunkTypes'
import { useFetcher, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Typography,Breadcrumbs, Box
} from '@mui/material'
import NavigationNexIcon from '@mui/icons-material/NavigateNext'
import LinkBreadcrums from '@mui/material/Link'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'
const Delivery = () => {
    const [deliveryData, setDeliveryData] = useState({});
    // if(isLoading) {
    //     return <div>...Loading</div>
    // }
    useEffect(() => {
        axios.get(`${baseURL}/api/v1/delivery/0?deliveryId=${5}`)
            .then((res) => setDeliveryData(res.data))
            .catch((err) => console.log("Error delivery: ", err))
    }, [])
    return (
        
        <Helmet title="delivery">
            <Box m={2} style={{padding: 10, marginTop: 50, marginLeft: 100}}>
                <Breadcrumbs
                    // maxItems={}
                    // itemsBeforeCollapse={2}
                    aria-label='breadcrumb'
                    separator={<NavigationNexIcon fontSize='small' />}
                >
                    <LinkBreadcrums underline='hover' color={'#F9813A'}>
                        <Link to={"/home"}>Home</Link>
                    </LinkBreadcrums>
                    <LinkBreadcrums underline='hover' color={'#F9813A'}>
                        <Link to={"/historyOrder"}>My order</Link>
                    </LinkBreadcrums>
                    <Typography color={"black"}>Delivery</Typography>
                </Breadcrumbs>
            </Box>
            <section>
                
                <form
                    className='form userUpdateForm'
                    id='form'
                    
                    style={{
                        'marginBottom': '40px',
                    }}
                >
                    <div className="userUpdateLeft">
                        <div className="form__group">
                            <label>Mã đơn hàng</label>
                            <input
                                readOnly
                                type='text'
                                placeholder='Full name'
                                className=''
                                value={deliveryData.id}
                            />
                        </div>
                        <div className="form__group">
                            <label>Tổng tiển</label>
                            <input
                                readOnly
                                type='text'
                                placeholder='Total Price'
                                className=''
                                value={deliveryData.totalPrice
                                + " VNĐ"}
                            />
                        </div>
                        <div className="form__group">
                            <label>Tên người giao hàng</label>
                            <input
                                readOnly
                                type='text'
                                placeholder='Last name'
                                className=''
                                value={deliveryData.shipperName}
                            />
                        </div>
                        
                        <div className="form__group">
                            <label>Số điện thoại người giao hàng</label>
                            <input
                                type='text'
                                placeholder='Ngay sinh'
                                className=''
                                value={deliveryData.shipperPhone}
                                readOnly
                            />
                        </div>
                        <div className="form__group">
                            <label>Tình trạng đơn hàng</label>
                            <input
                                type='text'
                                placeholder='Tình trạng đơn hàng'
                                className=''
                                value={deliveryData.status === 'Wait__Delivery' ? 'Wait delivery' : deliveryData.status}
                                readOnly
                            />
                       
                        </div>
                        <div className="form__group">
                            <label>Địa chỉ giao hàng</label>
                            <input
                                readOnly
                                type='text'
                                placeholder='Phone'
                                className=''
                                value={deliveryData.deliveryApartmentNumber+',   '+deliveryData.deliveryWard+',   '+deliveryData.deliveryDistrict+',   '+deliveryData.deliveryProvince}
                            />
                        </div>
                        
                    </div>


                    <div className="userFormRight">
                        <Link to={"/historyOrder"}>
                        <button className="addToCart__btn">
                            Go back bill list

                        </button>
                        </Link>
                    </div>

                </form>
            </section>
        </Helmet>

    )
}

export default Delivery