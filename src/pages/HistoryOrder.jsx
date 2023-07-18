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
import QLPAY from '../assets/images/QLPAY.JPG'
import COD from '../assets/images/CODLogo.png'

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
        let userID = sessionStorage.getItem('userID');

        setLoading(true);
        axios.get(`${baseURL}/api/v1/order/user?userId=${userID}`)
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
        { field: "orderId", headerName: "Mã đơn hàng", width: 100},
        { field: "orderedDate", headerName: "Ngày đặt", width: 200 },
        { field: "totalPrice", headerName: "Giá", width: 240, renderCell: (params) => {
            if(params.row.total) {
                return `${params.row.totalPrice} VNĐ`
            }
        } },
        { field: "paymentMethod", headerName: "Loại thanh toán", width: 200, renderCell: (params) => {
            if(params.row.paymentMethod === 'VNPAY') {
                return (
                    <img src={QLPAY}
                        style={{width: 40, height: 40, borderRadius: 10}}
                    />
                )
            }
            else {
                return (
                    <img src={COD}
                        style={{width: 40, height: 40, borderRadius: 10}}
                    />
                )
            }
        } },
        
        { field: "status", headerName: "Tình trạng", width: 200, renderCell: (params) => {
            if(params.row.status === 'Done') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'green', color: 'white'}}
                    >Hoàn tất</p>
                )
            }
            else if(params.row.status === 'Ordered') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'blue', color: 'white'}}
                    >Vừa đặt</p>
                )
            }
            // else if(params.row.status === 'Confirmed') {
            //     return (
            //         <p
            //             className='order__status-view'
            //             style={{backgroundColor:'#14d9e3', color: 'black'}}
            //         >Đã xác nhận</p>
            //     )
            // }
            else if (params.row.status==='Wait_Delivering') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'#F9813A', color: 'white'}}
                    >Chờ giao hàng</p>
                )
            }
            else if(params.row.status === 'Delivering') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'yellow', color: 'black'}}
                    >Đang giao</p>
                )
            }
            else if(params.row.status === 'Delivered') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'yellow', color: 'black'}}
                    >Đã giao</p>
                )
            }
            else if(params.row.status === 'Cancel') {
                return (
                    <p
                        className='order__status-view'
                        style={{backgroundColor:'red', color: 'white'}}
                    >Đơn hủy</p>
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
                        <Link to={"/home"}>Trang chủ</Link>
                    </LinkBreadcrums>
                    <Typography color={"black"}>Đơn hàng</Typography>
                </Breadcrumbs>
            </Box>
            <Container style={{marginBottom: 20}}>
                <Row>
                    <Col lg='2'>
                        <div className='filter__order-item'>
                            <p
                                className={`${tabOrder === 'All' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('All')}
                            >Tất cả</p>
                            <p
                                className={`${tabOrder === 'Ordered' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Ordered')}
                            >Vừa đặt</p>
                            {/* <p
                            
                                className={`${tabOrder === 'Confirmed' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Confirmed')}
                            >Đã xác nhận</p> */}
                            <p
                                className={`${tabOrder === 'Wait_Delivering' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Wait_Delivering')}
                            >Chờ giao hàng</p>
                            <p
                                className={`${tabOrder === 'Delivering' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Delivering')}
                            >Đang giao</p>
                            <p
                                className={`${tabOrder === 'Delivered' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Delivered')}
                            >Đã giao</p>
                            <p
                                className={`${tabOrder === 'Received' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Received')}
                            >Đã nhận hàng</p>
                            <p
                                className={`${tabOrder === 'Done' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Done')}
                            >Hoàn tất</p>
                            <p
                                className={`${tabOrder === 'Cancel' ? 'filter__order-item-active' : ''}`}
                                onClick={() => setTabOrder('Cancel')}
                            >Đơn hủy</p>
                            
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
