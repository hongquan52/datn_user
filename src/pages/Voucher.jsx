import React, { useEffect, useContext, useState } from 'react'
import { Col, Row, Container } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import { Breadcrumbs, Typography, Box } from '@mui/material'
import LinkBreadcrums from '@mui/material/Link'
import { Link } from 'react-router-dom'
import NavigationNexIcon from '@mui/icons-material/NavigateNext'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/voucher.css'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'
import { AppContext } from '../Context/AppProvider'


const Voucher = () => {
    const userID = sessionStorage.getItem('userID');
    // VOUCHER OF USER:
    const [userVoucher, setUserVoucher] = useState([]);
    // STATE CLAIM VOUCHER
    const [claimed, setClaimed] = useState({});
    // ALL VOUCHER STATE:
    const { voucherData } = useContext(AppContext);
    const [allVoucher, setAllVoucher] = useState([]);
    const [allVoucherOriginal, setAllVoucherOriginal] = useState([]);
    // SEARCH VOUCHER:
    const [filterVoucherType, setFilterVoucherType] = useState(0);
    const [searchText, setSearchText] = useState('');

    const searchedProduct = allVoucher.filter((item) => {
      if (searchText === '')
        return item;
      if (item.title.toLowerCase().includes(searchText.toLowerCase()) || item.description.toLowerCase().includes(searchText.toLowerCase()))
        return item
    })
    // FILTER VOUCHER
    useEffect(() => {
      if(filterVoucherType === 1) {
        let x = allVoucherOriginal.filter(
          (item) => item.voucherType.id === 1
        )
        setAllVoucher(x);
      }
      else {
        let x = allVoucherOriginal.filter(
          (item) => item.voucherType.id === 2
        )
        setAllVoucher(x);
      }
    }, [filterVoucherType])
    useEffect(() => {
        // GET ALL VOUCHER LIST
        setAllVoucher(voucherData);
        setAllVoucherOriginal(voucherData);
        
        // GET VOUCHER BY USER ID
        let x = sessionStorage.getItem('userID');
        axios.get(`${baseURL}/api/v1/voucher/user?userId=${x}`)
            .then((res) => {
                setUserVoucher(res.data);
                setClaimed(res.data.reduce((_o,_c) => ({..._o,[_c.voucher.id]: true}), {}))
            })
            .catch((err) => console.log("Error my voucher: ", err))
    }, [])
    // ADD VOUCHER FUNCTION:
    const addVoucher = (voucherID) => {

        axios.post(`${baseURL}/api/v1/voucher/user?userId=${userID}&voucherId=${voucherID}`)
            .then((res) => console.log(res.data.message))
            .catch((err) => console.log("Add voucher to my voucher error: ", err))
    }
    return (
        <Helmet title='Voucher'>
            <Box m={2} style={{ padding: 10, marginTop: 50, marginLeft: 100 }}>
                <Breadcrumbs
                    // maxItems={}
                    // itemsBeforeCollapse={2}
                    aria-label='breadcrumb'
                    separator={<NavigationNexIcon fontSize='small' />}
                >
                    <LinkBreadcrums underline='hover' color={'#F9813A'}>
                        <Link to={"/home"}>Trang chủ</Link>
                    </LinkBreadcrums>
                    <Typography color={"black"}>Ưu đãi</Typography>
                </Breadcrumbs>
            </Box>
            <span style={{ marginBottom: 20 }}>
                <Container>
                    <Row style={{marginBottom: 15}}>
                        <Col lg='4'>
                        <img src='https://down-vn.img.susercontent.com/file/vn-50009109-f1d236eb8fd814c45462fe675d86af88'
                            style={{width: '100%', height: '100%'}}
                        />
                        </Col>
                        <Col lg='4'>
                        <img src='https://down-vn.img.susercontent.com/file/vn-50009109-48152aefe282243669ebfecd6063d1b2'
                            style={{width: '100%', height: '100%'}}
                        />
                        </Col>
                        <Col lg='4'>
                        <img src='https://down-vn.img.susercontent.com/file/vn-50009109-90ce7bdb3f35f391906956349e2f07d1'
                            style={{width: '100%', height: '100%'}}
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='3' md='6' sm='6' xs='12' style={{ background: '#F9813A', borderRadius: 5, height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            <div className='voucher__filter-container'>
                                <p style={{textAlign: 'center', backgroundColor: '#fde4e4', padding: 5, fontWeight: 'bold'}}>Tìm kiếm</p>
                                <div className='voucher__filter-item'>
                                    <input type='email' style={{ width: 200, padding: 5, height: 40, borderRadius: 5, fontSize: 16 }}
                                      onChange={(e) => setSearchText(e.target.value)}
                                    />
                                    <button onClick={() => console.log(
                                      "search voucher : =================", searchText, 'search filter: ', filterVoucherType
                                    )}>
                                        <SearchIcon />
                                    </button>
                                </div>
                            </div>
                            <div className='voucher__filter-container'>
                                
                                <div className='voucher__filter-item1'>
                                    <input type='checkbox'
                                      value={1}
                                      onChange={(e) => setFilterVoucherType(2)}
                                      checked={filterVoucherType === 2 ? true : false}
                                    />
                                    <p><LocalShippingIcon />{'    '}Miễn phí vận chuyển</p>
                                </div>
                                <div className='voucher__filter-item1'>
                                    <input type='checkbox'
                                      value={2}
                                      onChange={(e) => setFilterVoucherType(1)}
                                      checked={filterVoucherType === 1 ? true : false}
                                    />
                                    <p><ShoppingBasketIcon />{'    '}Giảm đơn hàng</p>
                                </div>
                            </div>
                        </Col> 
                        <Col lg='8' md='6' sm='6' xs='12' style={{ marginBottom: 10,padding: 10,background: '#F9813A', borderRadius: 5,marginLeft: 10, marginBottom: 20}}>
                            <Link to={`/userinformation/${userID}`}>
                                <p
                                    style={{color: 'white'}}
                                >Ưu đãi của tôi <ArrowForwardIosIcon fontSize='small' /></p>
                            </Link>
                            {
                                searchedProduct.map((item) => (
                                    <div style={{
                                        backgroundColor: 'white', marginBottom: 3,marginTop: 5, display: 'flex', flexDirection: 'row'
                                        , alignItems: 'center', justifyContent: 'space-between', padding: 5, borderRadius: 5
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <img src={item.thumbnail}
                                                style={{ width: 80, height: 80, marginRight: 20 }}
                                            />
                                            <div>
                                                <p style={{ fontWeight: 'bold' }}>{item.title}</p>
                                                <p>{item.description}</p>
                                            </div>
        
                                        </div>
                                        <div style={{ width: 100 }}>
                                            <button
                                            className= {claimed?.[item.id] ? 'voucher__btn-inactive' : 'voucher__btn'}
                                                onClick={() => {
                                                    addVoucher(item.id);
                                                    setClaimed(prev=>({...prev, [item.id]: true}));
                                                }}
                                            >
                                                Lưu
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </Col>
                        
                    </Row>
                </Container>
            </span>
        </Helmet>
    )
}

export default Voucher
