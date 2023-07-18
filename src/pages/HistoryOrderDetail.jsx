import React from 'react'
import { Drawer, Typography } from '@mui/material'
import { Box, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import '../styles/historyorderdetail.css'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { thunkOrderTypes } from '../constants/thunkTypes'
import { getOrder } from '../api/fetchers/order'
import { Link } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VNPAYLogo from '../assets/images/vnpay.png'
import paidLogo from '../assets/images/paidLogo.png'
import CODLogo from '../assets/images/CODLogo.png'
import { baseURL } from '../constants/baseURL'
import axios from 'axios'
import QLPAY from '../assets/images/QLPAY.JPG'

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TaskIcon from '@mui/icons-material/Task';
import DoneIcon from '@mui/icons-material/Done';
import EventBusyIcon from '@mui/icons-material/EventBusy';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { AppContext } from '../Context/AppProvider'



const HistoryOrderDetail = ({ data, isShowFeedback, setIsShowFeedback, dataProductOrder }) => {

    const { userData } = useContext(AppContext);

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

    useEffect(() => {
        axios.get(`${baseURL}/api/v1/order/${data?.orderId}`)
            .then((res) => setOrderData(res.data))
            .catch((err) => console.log(err))
    }, [])

    const [orderData, setOrderData] = useState({});

    const [orderItem, setOrderItem] = useState([])
    useEffect(() => {
        if (data) {
            setOrderItem(data)
        }
    }, [data])

    // CANCEL ORDER
    const cancelOrder = (status) => {
        if (data?.paymentMethod === 'VNPAY') {
            if (status === 'Wait_Delivering' || status === 'Ordered') {
                // UPDATE STATUS ORDER
                axios.put(`${baseURL}/api/v1/order/updateStatus?orderId=${data?.orderId}&orderStatus=Cancel`)
                    .then((res) => showToastMessage("Hủy đơn hàng thành công"))
                    .catch((err) => console.log(err))
                // REFUND : 
                axios.put(`${baseURL}/api/v1/order/refund?orderId=${data?.orderId}&userId=${userData.id}`)
                    .then((res) => showToastMessage(res.data))
                    .catch((err) => console.log(err))
 
            }
            else {
                showToastMessageError("Không thể hủy đơn hàng");
            }
        }
        else {
            if (status === 'Ordered') {
                axios.put(`${baseURL}/api/v1/order/updateStatus?orderId=${data?.orderId}&orderStatus=Cancel`)
                    .then((res) => showToastMessage("Hủy đơn hàng thành công"))
                    .catch((err) => console.log(err))
            }
            else {
                showToastMessageError("Đơn hàng COD không thể hủy khi đã xác nhận!")
            }
        }
        
    }

    // if(getOrderDetail.isLoading) {
    //     return (
    //         <div style={{
    //             display: "flex",
    //             height: "100vh",
    //             alignItems: "center",
    //             justifyContent: "center",
    //         }}>
    //             <Box sx={{ display: 'flex' }}>
    //                 <CircularProgress />
    //             </Box>
    //         </div>
    //     )
    // }
    return (

        <Drawer
            open={isShowFeedback}
            anchor="right"
            onClose={() => {
                setIsShowFeedback(!isShowFeedback);

            }

            }
            modal
            sx={{ zIndex: 1000 }}

        >
            <ToastContainer />
            <div className="orderDetail__heading">
                <div className='orderDetail__heading-title' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <h4 style={{ fontWeight: 'bold', backgroundColor: '#fff', color: 'black', padding: 10, borderRadius: 10 }} >Mã đơn hàng: {data?.orderId}</h4>
                    {
                        orderItem?.status === 'Done' ?
                            (
                                <div>
                                    <DoneIcon style={{ height: 60, width: 60 }} />
                                    <h5>Hoàn tất</h5>
                                </div>
                            ) :
                            null
                    }
                    {
                        orderItem?.status === 'Confirmed' ?
                            (
                                <div>
                                    <FactCheckIcon style={{ height: 60, width: 60 }} />
                                    <h5>Đã xác nhận</h5>
                                </div>
                            ) :
                            null
                    }
                    {
                        orderItem?.status === 'Ordered' ?
                            (
                                <div>
                                    <ShoppingBasketIcon style={{ height: 60, width: 60 }} />
                                    <h5>Vừa đặt</h5>
                                </div>
                            ) :
                            null
                    }
                    {
                        orderItem?.status === 'Wait_Delivering' ?
                            (
                                <div>
                                    <WorkHistoryIcon style={{ height: 60, width: 60 }} />
                                    <h5>Chờ giao</h5>
                                </div>
                            ) :
                            null
                    }
                    {
                        orderItem?.status === 'Delivering' ?
                            (
                                <div>
                                    <LocalShippingIcon style={{ height: 60, width: 60 }} />
                                    <h5>Đang giao</h5>
                                </div>
                            ) :
                            null
                    }
                    {
                        orderItem?.status === 'Delivered' ?
                            (
                                <div>
                                    <TaskIcon style={{ height: 60, width: 60 }} />
                                    <h5>Đã giao hàng</h5>
                                </div>
                            ) :
                            null
                    }
                    {
                        orderItem?.status === 'Received' ?
                            (
                                <div>
                                    <AssignmentTurnedInIcon style={{ height: 60, width: 60 }} />
                                    <h5>Đã nhận hàng</h5>
                                </div>
                            ) :
                            null
                    }
                    {
                        orderItem?.status === 'Cancel' ?
                            (
                                <div>
                                    <EventBusyIcon style={{ height: 60, width: 60 }} />
                                    <h5>Hủy đơn</h5>
                                </div>
                            ) :
                            null
                    }
                </div>
                <div className="orderDetail__heading-content">
                    <div>
                        <p><span style={{ fontWeight: 'bold', marginRight: 10 }}>Tên khách hàng: </span>{userData.name}</p>
                        <p><span style={{ fontWeight: 'bold', marginRight: 10 }}>Số điện thoại: </span>{userData.phone}</p>
                        <p><span style={{ fontWeight: 'bold', marginRight: 10 }}>Địa chỉ:</span> {`${data?.deliveryApartmentNumber}, 
                         ${data?.deliveryWard[0] === '{' ? JSON.parse(data?.deliveryWard)?.ward_name : data?.deliveryWard},
                         ${data?.deliveryDistrict[0] === '{' ? JSON.parse(data?.deliveryDistrict)?.district_name : data?.deliveryProvince}, ${data?.deliveryProvince}`}</p>
                        <p><span style={{ fontWeight: 'bold', marginRight: 10 }}>Ngày đặt: </span>{data?.orderedDate}</p>
                        <p style={{ width: 300 }}><span style={{ fontWeight: 'bold', marginRight: 10 }}>Lưu ý: </span>{data?.note}</p>
                    </div>
                    {
                        data?.paymentMethod === 'VNPAY' ?
                            (<div style={{ display: 'flex', flexDirection: 'column' }}>
                                <img src={QLPAY}
                                    style={{ height: 100, width: 100 }}
                                />
                                <img src={paidLogo}
                                    style={{ height: 100, width: 100 }}
                                />
                            </div>
                            ) :
                            (
                                <img src={CODLogo}
                                    style={{ height: 100, width: 100 }}
                                />

                            )
                    }

                </div>
            </div>
            {
                dataProductOrder?.map((item) => (
                    <ListGroupItem className='border-0 orderItem'>
                        <Row
                            style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F9813A', borderRadius: 5 }}
                        >
                            <Col lg='4' md='3' style={{ background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img className='orderDetail__image'
                                    src={item?.productImage?.slice(0, -1)} alt="product-img" />
                            </Col>
                            <Col lg='6' md='3'>
                                <div className="">
                                    <div>
                                        <h3 className='order__product-title'>{item.productName}</h3>
                                        <h5 style={{ backgroundColor: 'white', color: 'black', padding: 5, width: 30, textAlign: 'center' }} >{item.amount}</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))
            }
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 20 }}>
                <h5 ><span style={{ marginRight: 30 }}>Giá đơn hàng: </span><span className='total__amount'>{data?.finalPrice} đ</span></h5>
            </div>
            <div style={{ display: 'flex', marginTop: 50, justifyContent: 'center' }}>
                <Link style={{ marginLeft: 30 }} to={`/delivery/${orderItem.orderId}`}><button className='viewDelivery'
                >Xem vận chuyển</button>
                </Link>
                <button className='viewDelivery1'
                    style={{ marginLeft: 30, fontWeight: 'bold' }}
                    onClick={() => cancelOrder(orderItem?.status)}
                >
                    Hủy đơn</button>
            </div>

        </Drawer>

    )
}

export default HistoryOrderDetail
