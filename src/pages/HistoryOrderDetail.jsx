import React from 'react'
import { Drawer, Typography } from '@mui/material'
import { Box, CircularProgress } from '@mui/material'
import { useState } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import '../styles/historyorderdetail.css'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { thunkOrderTypes } from '../constants/thunkTypes'
import { getOrder } from '../api/fetchers/order'
import { Link } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const HistoryOrderDetail = ({ data, isShowFeedback, setIsShowFeedback, dataProductOrder }) => {
    const getOrderDetail = useQuery([thunkOrderTypes.GET_ORDER], () => 
        getOrder(data?.billId)
    )

    const [orderItem, setOrderItem] = useState([])

    useEffect(() => {
        if(data) {
            setOrderItem(data)
        }
    }, [data])

    if(getOrderDetail.isLoading) {
        return (
            <div style={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
        )
    }
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
            <div className="orderDetail__heading">
                <h4 className='orderDetail__heading-title'>Mã đơn hàng: {data?.orderId}</h4>
                <div className="orderDetail__heading-content">
                    <div>
                        <h5 >Tổng giá trị: <span className='total__amount'>{data?.finalPrice} VNĐ</span></h5>
                        <p style={{fontWeight: 'bold'}}>{data?.userName}</p>
                        <p><LocationOnIcon />{`${data?.deliveryApartmentNumber}, ${data?.deliveryWard}, ${data?.deliveryDistrict}, ${data?.deliveryProvince}`}</p>
                    </div>
                    {
                        data?.paymentMethod === 'VNPAY' ?
                        (
                            <img src='https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png'
                                style={{height: 60, width: 60}}
                            />
                        ) :
                        (
                            <img src='https://w7.pngwing.com/pngs/40/100/png-transparent-united-states-dollar-money-united-states-one-hundred-dollar-bill-money-saving-bank-cash.png'
                                style={{height: 60, width: 60}}
                            />

                        )
                    }
                    {
                        orderItem?.status === 'paid' ?
                        (
                            <h5>Trạng thái: <span className='status__completed'>Đã thanh toán</span></h5>
                        ):
                        null
                    }
                    {
                        orderItem?.status === 'confirmed' ?
                        (
                            <h5>Trạng thái: <span className='status__completed'>Đã xác nhận</span></h5>
                        ):
                        null
                    }
                    {
                        orderItem?.status === 'waiting_confirm' ?
                        (
                            <h5>Trạng thái: <span className='status__wait_confirm'>Chờ xác nhận</span></h5>
                        ):
                        null
                    }
                    {
                        orderItem?.status === 'delivering' ?
                        (
                            <h5>Trạng thái: <span className='status__readyToShip'>Đang vận chuyển</span></h5>
                        ):
                        null
                    }
                    {
                        orderItem?.status === 'ready_to_delivery' ?
                        (
                            <h5>Trạng thái: <span className='status__readyToShip'>Chuẩn bị giao</span></h5>
                        ):
                        null 
                    }
                    {
                        orderItem?.status === 'cancelled' ?
                        (
                            <h5>Trạng thái: <span className='status__canceled'>Đã hủy</span></h5>
                        ):
                        null
                    }
                </div>
            </div>
            {
                dataProductOrder?.map((item) => (
                    <ListGroupItem className='border-0 cart__item'>
                        <Row
                            style={{display: 'flex', alignItems: 'center'}}
                        >
                            <Col lg='4' md='3'>
                                <img className='orderDetail__image'
                                 src={item?.productImage?.slice(0,-1)} alt="product-img" />
                            </Col>
                            <Col lg='6' md='3'>
                                <div className="">
                                    <div>
                                        <h3 className='cart__product-title'>{item.productName}</h3>
                                        <div className='d-flex align-items-center justify-content-between
                                            increase__decrease-btn'>
                                            <span className='increase__btn'></span>
                                            <span className='quantity'>{item.amount}</span>
                                            <span className='decrease__btn'></span>
                                        </div>  
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))
            }

            <Link to={`/delivery/${orderItem?.billId}`}><button className='addToCart__btn addToCart__btn1'
                               >Go to delivery</button>
            </Link>
            
        </Drawer>

    )
}

export default HistoryOrderDetail
