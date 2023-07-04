import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Box, CircularProgress, Typography, Breadcrumbs } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import HistoryOrderDetail from './HistoryOrderDetail';
import { useQuery } from '@tanstack/react-query';
import { thunkOrderTypes } from '../constants/thunkTypes';
import { getAllOrder } from '../api/fetchers/order';
import { useEffect } from 'react';
import '../styles/historyorderdetail.css'
import NavigationNexIcon from '@mui/icons-material/NavigateNext'
import LinkBreadcrums from '@mui/material/Link'
import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';
import { baseURL } from '../constants/baseURL';


const HistoryOrder = () => {

    // GET ALL ORDER:
    const [orderListData, setOrderListData] = useState([]);
    // LOADING
    const [loading, setLoading] = useState(false);
    // TAB STATE
    const [tabOrder, setTabOrder] = useState('All');

    const [dataFeedback, setDataFeedback] = useState(null);
    const [dataProductOrder, setDataProductOrder] = useState([]);
    const [isShowFeedback, setIsShowFeedback] = useState(false);

    const [orderDataOriginal, setOrderDataOriginal] = useState([]) // ORDER DATA ORIGINAL

    // CALL API GET LIST ORDER:
    useEffect(() => {
        let userID = sessionStorage.getItem('userId');

        setLoading(true);
        axios.get(`${baseURL}/api/v1/order?userId=${userID}`)
            .then((res) => {
                setOrderListData(res.data);
                setOrderDataOriginal(res.data);
                console.log("Order list data:================================== ", res.data);
            })
            .catch((err) => console.log("Get all order error: ", err))
            .finally(() => setLoading(false))
    }, [])


    useEffect(() => {
        if(tabOrder === 'All') {
            setOrderListData(orderDataOriginal);
        }
        else {
            const x = orderDataOriginal.filter(
                (item) => item.status === tabOrder
            )
            setOrderListData(x);
        }
    }, [tabOrder])
    
    const columns = [
        { field: "orderId", headerName: "Order ID", width: 100},
        { field: "orderedDate", headerName: "Order date", width: 200 },
        { field: "totalPrice", headerName: "Total Price", width: 240, renderCell: (params) => {
            if(params.row.total) {
                return `${params.row.totalPrice} VNĐ`
            }
        } },
        { field: "paymentMethod", headerName: "Payment method", width: 200, renderCell: (params) => {
            if(params.row.paymentMethod === 'VNPAY') {
                return (
                    <img src='https://inkythuatso.com/uploads/images/2021/12/vnpay-logo-inkythuatso-01-13-16-26-42.jpg'
                        style={{width: 40, height: 40, borderRadius: 10}}
                    />
                )
            }
            else {
                return (
                    <img src='https://png.pngtree.com/png-vector/20210529/ourlarge/pngtree-cod-cash-on-delivery-fast-png-image_3382624.jpg'
                        style={{width: 40, height: 40, borderRadius: 10}}
                    />
                )
            }
        } },
        
        { field: "status", headerName: "Status", width: 200, renderCell: (params) => {
            if(params.row.status === 'Paid') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'green', color: 'white'}}
                    >Done</p>
                )
            }
            else if(params.row.status === 'Ordered') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'blue', color: 'white'}}
                    >Ordered</p>
                )
            }
            else if(params.row.status === 'Confirmed') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'#14d9e3', color: 'black'}}
                    >Confirmed</p>
                )
            }
            else if (params.row.status==='Wait__Delivery') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'#F9813A', color: 'white'}}
                    >Wait delivery</p>
                )
            }
            else if(params.row.status === 'Delivering') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'yellow', color: 'black'}}
                    >Delivering</p>
                )
            }
            else if(params.row.status === 'Canceled') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'red', color: 'white'}}
                    >Canceled</p>
                )
            }
        }},
    ];
    
    //
    const handleRowClick = (params) => {
        // GET PRODUCT BY ORDERID
        axios.get(`${baseURL}/api/v1/order/product?orderId=${params.row.orderId}`)
            .then((res) => setDataProductOrder(res.data));

        setIsShowFeedback(true);
        setDataFeedback(params.row);

    }

    if(loading) {
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
        <Helmet title="history transaction">
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
                    <Typography color={"black"}>My order</Typography>
                </Breadcrumbs>
            </Box>
            <Container style={{marginBottom: 20}}>
                <Row>
                    <Col lg='2'>
                        <div className='filter__order-item'>
                            <p
                                className={`${tabOrder === 'All' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('All')}
                            >ALL</p>
                            <p
                                className={`${tabOrder === 'Ordered' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Ordered')}
                            >ORDERED</p>
                            <p
                            
                                className={`${tabOrder === 'Confirmed' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Confirmed')}
                            >CONFIRMED</p>
                            <p
                                className={`${tabOrder === 'Wait__Delivery' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Wait__Delivery')}
                            >WAIT DELIVERY</p>
                            <p
                                className={`${tabOrder === 'Delivering' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Delivering')}
                            >DELIVERING</p>
                            <p
                                className={`${tabOrder === 'Paid' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Paid')}
                            >DONE</p>
                            <p
                                className={`${tabOrder === 'Canceled' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Canceled')}
                            >CALCELED</p>
                            
                        </div>
                    </Col>
                    <Col lg='10'>
                    
                        <DataGrid className='data__grid'
                            // rows={data.data.results}
                            rows={orderListData}
                            columns={columns}
                            pageSize={6}
                            rowsPerPageOptions={[5]}
                            // checkboxSelection
                            disableSelectionOnClick
                            // experimentalFeatures={{ newEditingApi: true }}
                            autoHeight
                            getRowId={(row) =>  row.orderId}
                            onRowClick={handleRowClick}
                        />
                        <HistoryOrderDetail
                            data={dataFeedback}
                            isShowFeedback={isShowFeedback}
                            setIsShowFeedback={setIsShowFeedback}
                            dataProductOrder={dataProductOrder}
                        />
                    </Col>
                </Row>
            </Container>
        </Helmet>
    )
}

export default HistoryOrder

const listOrder =
[
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 1,
        "status": "Wait__Delivery",
        "totalPrice": 69508000.00,
        "shippingFee": null,
        "finalPrice": 3900000.00,
        "note": null,
        "paymentMethod": "VNPAY",
        "addressId": null,
        "deliveryApartmentNumber": null,
        "deliveryWard": null,
        "deliveryDistrict": null,
        "deliveryProvince": null,
        "orderedDate": null,
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 2,
        "status": "Done",
        "totalPrice": 900000.00,
        "shippingFee": null,
        "finalPrice": 3900000.00,
        "note": null,
        "paymentMethod": "COD",
        "addressId": null,
        "deliveryApartmentNumber": null,
        "deliveryWard": null,
        "deliveryDistrict": null,
        "deliveryProvince": null,
        "orderedDate": null,
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 3,
        "status": "Delivering",
        "totalPrice": 5440000.00,
        "shippingFee": null,
        "finalPrice": 3900000.00,
        "note": null,
        "paymentMethod": "COD",
        "addressId": null,
        "deliveryApartmentNumber": null,
        "deliveryWard": null,
        "deliveryDistrict": null,
        "deliveryProvince": null,
        "orderedDate": null,
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 4,
        "status": "Wait_Delivering",
        "totalPrice": 2560000.00,
        "shippingFee": null,
        "finalPrice": 3900000.00,
        "note": null,
        "paymentMethod": "COD",
        "addressId": null,
        "deliveryApartmentNumber": null,
        "deliveryWard": null,
        "deliveryDistrict": null,
        "deliveryProvince": null,
        "orderedDate": null,
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 6,
        "status": "Confirmed",
        "totalPrice": 180000.00,
        "shippingFee": 20000.00,
        "finalPrice": 200000.00,
        "note": "Giao ở cơ quan nhà nước, t2-t6",
        "paymentMethod": "VNPAY",
        "addressId": null,
        "deliveryApartmentNumber": null,
        "deliveryWard": null,
        "deliveryDistrict": null,
        "deliveryProvince": null,
        "orderedDate": "2023-06-10 17:00:00",
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 7,
        "status": "Wait__Delivery",
        "totalPrice": 400000.00,
        "shippingFee": 0.00,
        "finalPrice": 400000.00,
        "note": "",
        "paymentMethod": "COD",
        "addressId": null,
        "deliveryApartmentNumber": null,
        "deliveryWard": null,
        "deliveryDistrict": null,
        "deliveryProvince": null,
        "orderedDate": "2023-06-10 17:00:00",
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 8,
        "status": "Cancel",
        "totalPrice": 4890000.00,
        "shippingFee": 50000.00,
        "finalPrice": 4940000.00,
        "note": "Đơn hàng gấp, giao đến UBND Thành phố Thủ Đức",
        "paymentMethod": "COD",
        "addressId": null,
        "deliveryApartmentNumber": null,
        "deliveryWard": null,
        "deliveryDistrict": null,
        "deliveryProvince": null,
        "orderedDate": "2023-06-21 17:00:00",
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 38,
        "status": "Received",
        "totalPrice": 23318000.00,
        "shippingFee": 20000.00,
        "finalPrice": 23338000.00,
        "note": "",
        "paymentMethod": "COD",
        "addressId": 13,
        "deliveryApartmentNumber": "25",
        "deliveryWard": "Linh Xuân",
        "deliveryDistrict": "Thủ Đức",
        "deliveryProvince": "Tp. Hồ Chí Minh",
        "orderedDate": null,
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 42,
        "status": "Done",
        "totalPrice": 29500000.00,
        "shippingFee": 0.00,
        "finalPrice": 29500000.00,
        "note": "Test clear cart",
        "paymentMethod": "COD",
        "addressId": 7,
        "deliveryApartmentNumber": "12/2 street 5",
        "deliveryWard": "Linh Chiểu",
        "deliveryDistrict": "Thủ Đức",
        "deliveryProvince": "TP Hồ Chí Minh",
        "orderedDate": "2023-06-21 17:00:00",
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 43,
        "status": "Done",
        "totalPrice": 5980000.00,
        "shippingFee": 0.00,
        "finalPrice": 5980000.00,
        "note": "",
        "paymentMethod": "COD",
        "addressId": 13,
        "deliveryApartmentNumber": "25",
        "deliveryWard": "Linh Xuân",
        "deliveryDistrict": "Thủ Đức",
        "deliveryProvince": "Tp. Hồ Chí Minh",
        "orderedDate": "2023-06-22 17:00:00",
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 44,
        "status": "Wait_Delivering",
        "totalPrice": 9270000.00,
        "shippingFee": 0.00,
        "finalPrice": 9270000.00,
        "note": "Đơn hàng gấp, giao đến UBND Thành phố Thủ Đức Đơn hàng gấp, giao đến UBND Thành phố Thủ Đức",
        "paymentMethod": "COD",
        "addressId": 26,
        "deliveryApartmentNumber": "Đường CMT8",
        "deliveryWard": "Xã Mỹ Hòa",
        "deliveryDistrict": "Huyện Phù Mỹ",
        "deliveryProvince": "Bình Định",
        "orderedDate": null,
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 45,
        "status": "Done",
        "totalPrice": 9010000.00,
        "shippingFee": 20000.00,
        "finalPrice": 9030000.00,
        "note": "Đơn hàng 50k, phi ship 30k",
        "paymentMethod": "COD",
        "addressId": 1,
        "deliveryApartmentNumber": "Test",
        "deliveryWard": "Linh Chiểu",
        "deliveryDistrict": "Thủ Đức",
        "deliveryProvince": "TP Hồ Chí Minh",
        "orderedDate": null,
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 46,
        "status": "Delivering",
        "totalPrice": 3880000.00,
        "shippingFee": 20000.00,
        "finalPrice": 3900000.00,
        "note": "Đơn hàng 50k, phi ship 30k",
        "paymentMethod": "VNPAY",
        "addressId": 1,
        "deliveryApartmentNumber": "Test",
        "deliveryWard": "Linh Chiểu",
        "deliveryDistrict": "Thủ Đức",
        "deliveryProvince": "TP Hồ Chí Minh",
        "orderedDate": null,
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 47,
        "status": "Ordered",
        "totalPrice": 16970000.00,
        "shippingFee": 20000.00,
        "finalPrice": 16990000.00,
        "note": "Giao hàng trước ngày 3/7/2023",
        "paymentMethod": "COD",
        "addressId": 13,
        "deliveryApartmentNumber": "25",
        "deliveryWard": "Linh Xuân",
        "deliveryDistrict": "Thủ Đức",
        "deliveryProvince": "Tp. Hồ Chí Minh",
        "orderedDate": null,
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    },
    {
        "userName": "Quỳnh Trang Nè",
        "orderId": 48,
        "status": "Cancel",
        "totalPrice": 390000.00,
        "shippingFee": 0.00,
        "finalPrice": 390000.00,
        "note": "Giao hàng trước ngày 2/7/2023",
        "paymentMethod": "COD",
        "addressId": 24,
        "deliveryApartmentNumber": "Hưng long",
        "deliveryWard": "Phường Hưng Long",
        "deliveryDistrict": "Huyện Chơn Thành",
        "deliveryProvince": "Bình Phước",
        "orderedDate": null,
        "doneDate": null,
        "deliveredDate": null,
        "paidDate": null
    }
]