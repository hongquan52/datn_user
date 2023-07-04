import React, { useEffect } from 'react'
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
import { useState } from 'react'


const Voucher = () => {
    const userID = sessionStorage.getItem('userID');
    // VOUCHER OF USER:
    const [userVoucher, setUserVoucher] = useState([]);
    // STATE CLAIM VOUCHER
    const [claimed, setClaimed] = useState({});
    // ALL VOUCHER STATE:
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
        axios.get(`${baseURL}/api/v1/voucher`)
            .then((res) => {
            setAllVoucher(res.data);
            setAllVoucherOriginal(res.data);
            })
            .catch((err) => console.log("Voucher all error: ", err))
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
                        <Link to={"/home"}>Home</Link>
                    </LinkBreadcrums>
                    <Typography color={"black"}>Voucher</Typography>
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
                                <p style={{textAlign: 'center', backgroundColor: '#fde4e4', padding: 5, fontWeight: 'bold'}}>SEARCH VOUCHER</p>
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

                                    />
                                    <p><FlashOnIcon />{'    '}Hot deals</p>
                                </div>
                                <div className='voucher__filter-item1'>
                                    <input type='checkbox'
                                      value={1}
                                      onChange={(e) => setFilterVoucherType(2)}
                                      checked={filterVoucherType === 2 ? true : false}
                                    />
                                    <p><LocalShippingIcon />{'    '}Free ship</p>
                                </div>
                                <div className='voucher__filter-item1'>
                                    <input type='checkbox'
                                      value={2}
                                      onChange={(e) => setFilterVoucherType(1)}
                                      checked={filterVoucherType === 1 ? true : false}
                                    />
                                    <p><ShoppingBasketIcon />{'    '}Promotion order</p>
                                </div>
                            </div>
                        </Col> 
                        <Col lg='8' md='6' sm='6' xs='12' style={{ marginBottom: 10,padding: 10,background: '#F9813A', borderRadius: 5,marginLeft: 10, marginBottom: 20}}>
                            <Link to={`/userinformation/${userID}`}>
                                <p
                                    style={{color: 'white'}}
                                >See your voucher <ArrowForwardIosIcon fontSize='small' /></p>
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
                                            {/* <button className='voucher__btn-inactive' */}
                                            {/* <button className='addressItem__btn' */}
                                            <button
                                            className= {claimed?.[item.id] ? 'voucher__btn-inactive' : 'addressItem__btn'}
                                                onClick={() => {
                                                    addVoucher(item.id);
                                                    setClaimed(prev=>({...prev, [item.id]: true}));
                                                }}
                                            >
                                                Claim
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

const a = [1,2,3,4,5]
// import React from "react"
// const objectData = [
//     {name:'Javascript', price: 500},
//     {name:'PHP', price: 35},
//     {name:'Phyton', price: 36599},
//     {name:'Javascript', price: 342},
//     {name:'PHP', price: 34},
//     {name:'Phyton', price: 22},
//     {name:'Javascript', price: 745},
//     {name:'PHP', price: 24},
//     {name:'Phyton', price: 12},
//     {name:'Javascript', price: 7},
//     {name:'PHP', price: 78},
//     {name:'Phyton', price: 67},
//   ]
  
  
//   const Voucher = () =>  {
//     const [objectsToShow, setToShow] = React.useState(objectData)
    
//     const compare = (a, b, ascendingOrder) => {
//       if (a < b) {
//         return ascendingOrder ? -1 : 1;
//       }
//       if (a > b) {
//         return ascendingOrder ? 1 : -1;
//       }
//       return 0;
//     }
    
//     const handleChange = (value) => {
//       if(value == 'none'){
//           setToShow([...objectData])
//       } else {
//         let toType, toAscending
//         switch(value){
//           case 'ascending' : toType = true; toAscending = true; break;
//           case 'descending' : toType = true; toAscending = false; break;
//           case 'high' : toType = false; toAscending = true; break;
//           case 'low' : toType = false; toAscending = false; break;
//         }
//         let current = [...objectData]
//         current.sort((a, b) => toType ?
//                compare(a.name, b.name, toAscending) 
//                : 
//                compare(a.price, b.price, toAscending))
//         setToShow([...current])
//       }
//     }
//     return(
//       <div>
//       <select onChange={(e) => handleChange(e.target.value)}>
//         <option value="none">Default</option>
//         <option value="ascending">Alphabetically, A-Z</option>
//         <option value="descending">Alphabetically, Z-A</option>
//         <option value="high">Low to high</option>
//         <option value="low">High to low</option>
//       </select>
//       {objectsToShow.map(elem => <p key={elem.name}>{elem.name} {elem.price}</p>)}
//       </div>
//     )
//   }

//   export default Voucher;