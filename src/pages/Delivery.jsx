
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Link, useParams } from 'react-router-dom'
import {Typography,Breadcrumbs, Box
} from '@mui/material'
import NavigationNexIcon from '@mui/icons-material/NavigateNext'
import LinkBreadcrums from '@mui/material/Link'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import deliveredLogo from '../assets/images/Delivered.png'
import { baseURL } from '../constants/baseURL'
import '../styles/delivery.css'

const Delivery = () => {
    const [loading, setLoading] = useState(false);
    const [deliveryData, setDeliveryData] = useState({});
    const [received, setReceived] = useState(true);
    const [visibleReceived, setVisibleReceived] = useState(false);

    const {orderID} = useParams();
    useEffect(() => {
        setLoading(true);
        axios.get(`${baseURL}/api/v1/delivery/order?orderId=${orderID}`)
            .then((res) => {
                setDeliveryData(res.data[0]);
                if(res.data[0].status === 'Delivered' || res.data[0].status === 'Received' || res.data[0].status === 'Done' ) {
                    setVisibleReceived(true);
                }
                if(res.data[0].status === 'Delivered') {
                    setReceived(false);
                }
            })
            .catch((err) => console.log("Error delivery: ", err))
            .finally(() => setLoading(false))
    }, [])
    // RECEIVED DELIVERY:
    const receivedHandle = () => {
        
        axios.put(`${baseURL}/api/v1/order/updateStatus?orderId=${orderID}&orderStatus=Received`)
            .then((res) => {
                if(res.data.status === 'OK') {
                    setReceived(!received);
                    alert('Receied!!!')
                }
            })
            .catch((err) => console.log(err))
    }
    if(loading) {
        return <div>...Đang tải</div>
    }
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
                        <Link to={"/home"}>Trang chủ</Link>
                    </LinkBreadcrums>
                    <LinkBreadcrums underline='hover' color={'#F9813A'}>
                        <Link to={"/historyOrder"}>Đơn hàng</Link>
                    </LinkBreadcrums>
                    <Typography color={"black"}>Vận chuyển</Typography>
                </Breadcrumbs>
            </Box>
            {
                deliveryData !== undefined ?

                <Container>
                    <Row style={{marginBottom: 40}}>
                        <Col lg='8'>
                            <div className="userUpdateLeft">
                                <div className="form__group">
                                    <label>Mã vận chuyển</label>
                                    <input
                                        readOnly
                                        type='text'
                                        placeholder='Full name'
                                        className=''
                                        value={deliveryData?.id}
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Giá</label>
                                    <input
                                        readOnly
                                        type='text'
                                        placeholder='Total Price'
                                        className=''
                                        value={deliveryData?.totalPrice
                                        + " VNĐ"}
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Tên người giao</label>
                                    <input
                                        readOnly
                                        type='text'
                                        placeholder='Last name'
                                        className=''
                                        value={deliveryData?.shipperName}
                                    />
                                </div>
                                
                                <div className="form__group">
                                    <label>Số điện thoại người giao</label>
                                    <input
                                        type='text'
                                        placeholder='Ngay sinh'
                                        className=''
                                        value={deliveryData?.shipperPhone}
                                        readOnly
                                    />
                                </div>
                                <div className="form__group">
                                    <label>Tình trạng</label>
                                    <input
                                        type='text'
                                        placeholder='Tình trạng đơn hàng'
                                        className=''
                                        value={deliveryData?.status === 'Wait__Delivery' ? 'Wait delivery' : deliveryData?.status}
                                        readOnly
                                    />
                            
                                </div>
                                <div className="form__group">
                                    <label>Địa chỉ giao</label>
                                    <input
                                        
                                        readOnly
                                        type='text'
                                        placeholder='Phone'
                                        style={{width: 500}}
                                        
                                        value={`${deliveryData?.deliveryApartmentNumber},${
                                            deliveryData?.deliveryWard[0] === '{' ?
                                            JSON.parse(deliveryData?.deliveryWard).ward_name :
                                            deliveryData?.deliveryWard
                                        },${
                                            deliveryData?.deliveryDistrict[0] === '{' ?
                                            JSON.parse(deliveryData?.deliveryDistrict).district_name :
                                            deliveryData?.deliveryDistrict
                                        },${
                                            deliveryData?.deliveryProvince
                                        }`}
                                    />
                                    
                                </div>
                                {
                                    visibleReceived &&
                                    <button 
                                        onClick={() => receivedHandle()}
                                        className="addToCart__btn" 
                                        style={{ backgroundColor: received ? 'grey' : null , marginRight: 100}}
                                        disabled={ received ? true : false }
                                    >
                                        Đã giao hàng
                                    </button>
                                }
                                
                                {
                                    deliveryData?.status === 'Received' &&
                                    <img
                                        src={deliveredLogo}
                                        style={{width: 300, height: 150}}
                                    />
                                }
                                {
                                    deliveryData?.status === 'Done' &&
                                    <img
                                        src={deliveredLogo}
                                        style={{width: 300, height: 150}}
                                    />
                                }
                                {
                                    deliveryData?.status === 'Delivered' &&
                                    <img
                                        src={deliveredLogo}
                                        style={{width: 300, height: 150}}
                                    />
                                }
                                
                            </div>
                        </Col>
                        <Col lg='4'>
                            <div className="userFormRight">
                                <img 
                                    src={deliveryData?.image?.slice(0,-1)}
                                    style={{width: 300, height: 300, borderRadius: 30, marginBottom: 20}}
                                />
                                <a href={deliveryData?.image?.slice(0,-1)}>Hình ảnh giao hàng</a>   
                            </div>
                        </Col>
                    </Row>
                </Container>
                :
                <Container>
                  <Row
                    style={{height: 400}}
                  >
                    <h5 style={{textAlign: 'center', margin: 'auto', color: '#df2020'}}>
                        Đơn hàng của bạn chưa được vận chuyển</h5>
                </Row>  
                </Container>
            }
        </Helmet>

    )
}

export default Delivery