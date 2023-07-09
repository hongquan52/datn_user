import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../components/UI/common-section/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Combobox, DropdownList } from "react-widgets"
import '../styles/checkout.css'

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import { Box, Typography, Breadcrumbs, Fade, Modal, Backdrop } from '@mui/material'
import LinkBreadcrumb from '@mui/material/Link'
import NavigationNexIcon from '@mui/icons-material/NavigateNext'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { pay } from '../api/fetchers/pay'
import { useRef } from 'react'

import axios from 'axios'
import { baseURL } from '../constants/baseURL'
import { useContext } from 'react'
import { AppContext } from '../Context/AppProvider'

const Checkout = () => {
  const { userData } = useContext(AppContext);
  const cartIDD = sessionStorage.getItem("cartId");
  const [userIDD, setUserIDD] = useState(0);

  const navigate = useNavigate()
  const ref = useRef()

  // NOTE ORDER
  const [noteValue, setNoteValue] = useState('');
  // PAYMENT METHOD
  const [paymentMethod, setPaymentMethod] = useState('COD')

  // MODAL VISIBLE CHOOSE ADDRESS
  const [modalAddressVisible, setModalAddressVisible] = useState(false);
  const [modalVoucherVisible, setModalVoucherVisible] = useState(false);

  const [productCartData, setProductCartData] = useState([]);
  const [addressUserData, setAddressUserData] = useState([]);
  const [voucherUserData, setVoucherUserData] = useState([]);
  // ADDRESS STATE SELECTED
  const [addressUserSelectedId, setAddressUserSelectedId] = useState(0); // address ID
  const [addressUserSelected, setAddressUserSelected] = useState({});

  const [addressConfirm, setAddressConfirm] = useState(false);
  // VOUCHER STATE SELECTED
  const [voucherUserSelectedId, setVoucherUserSelectedId] = useState(0); // voucher ID
  const [voucherUserSelected, setVoucherUserSelected] = useState({});

  const [addressIdBill, setAddressIdBill] = useState(0)

  // STATE PRICE
  const [shippingState, setShippingState] = useState(0);
  const [shippingStateOriginal, setShippingStateOriginal] = useState(20000);
  const [subtotalStateOriginal, setSubtotalStateOriginal] = useState(0)
  const [subtotalState, setSubtotalState] = useState(0);

  // DELETE ALL PRODUCT IN CART WHEN CREATE ORDER:
  const clearCart = () => {
    axios.delete(`${baseURL}/api/v1/cart/product/clear-all?cartId=${cartIDD}`)
      .then((res) => console.log(res))
      .catch((err) => console.log("CLear cart err: ", err))
  }
  // ADD PRODUCT FROM CART TO ORDER
  const addProductToOrder = (orderId) => {
    productCartData.map((item) => {
      axios.post(`${baseURL}/api/v1/order/orderProduct?orderId=${orderId}&productId=${item.productId}&amount=${item.amount}`)
        .then((res) => console.log(res.data.message))
        .catch((err) => console.log("Response add porduct to ordeer", err))
    })
  }
  // PLACE AN ORDER FUNCTION:
  const orderHandle = () => {
    var dataJSON = JSON.stringify({
      "totalPrice": subtotalStateOriginal - subtotalState,
      "shippingFee": shippingStateOriginal - shippingState,
      "finalPrice": subtotalStateOriginal - subtotalState + shippingStateOriginal - shippingState,
      "note": noteValue,
      "paymentMethod": paymentMethod,
      "addressId": addressUserSelectedId,
    });
    axios.post(`${baseURL}/api/v1/order?userId=${userIDD}`, dataJSON, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        sessionStorage.setItem('orderIdCreate', res.data.data.orderId)
        addProductToOrder(res.data.data.orderId)
        clearCart();
        if (paymentMethod === 'VNPAY') {
          navigate(`/payment?orderID=${res.data.data.orderId}&&totalPrice=${subtotalStateOriginal - subtotalState + shippingStateOriginal - shippingState}`);
        }
        else {
          navigate('/success')
        }

      })
      .catch((err) => {
        console.log('Create order error: ', err);
      })

  }

  useEffect(() => {
    if (addressUserSelected?.ward?.[0] === '{' && addressUserSelected?.district?.[0] === '{') {
      let wardObject = JSON.parse(addressUserSelected?.ward)
      let districtObject = JSON.parse(addressUserSelected?.district)
      console.log("ssssssssssssssssssss: ", `type of ward: ${(wardObject.ward_id)}`, `type of district: ${(districtObject.district_id)}`)

      var dataJSON = JSON.stringify({
        "service_id": 53320,
        "insurance_value": subtotalStateOriginal,
        "coupon": null,
        "from_district_id": 3695,
        "to_district_id": districtObject.district_id,
        "to_ward_code": wardObject.ward_id,
        "height": 15,
        "length": 15,
        "weight": 1000,
        "width": 15
      });

      axios.post(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, dataJSON, {
        headers: {
          'token': '466cdca6-febd-11ed-a967-deea53ba3605',
          'shop_id': '4311551',
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          setShippingStateOriginal(res.data.data.total);
        })
        .catch((err) => console.log(err))
    }
    setShippingStateOriginal(30000);

  }, [addressConfirm])

  useEffect(() => {
    // GET PRODUCT BY CART ID
    let cartID = sessionStorage.getItem("cartId");

    axios.get(`${baseURL}/api/v1/cart/product?cartId=${cartID}`)
      .then((res) => {
        console.log("Cart data product: ", res.data);
        setProductCartData(res.data);
        const total = res.data.reduce((acc, item) => {
          return acc + item.price * item.amount * (100 - item.discount) / 100
        }, 0)
        setSubtotalStateOriginal(total);

      })
      .catch((err) => {
        console.log("Cart data error: ", err);
      })
    // GET ADDRESS BY USER ID:
    let userID = sessionStorage.getItem("userID")
    setUserIDD(userID);
    axios.get(`${baseURL}/api/v1/address/user?userId=${userID}`)
      .then((res) => {
        setAddressUserData(res.data);
        // DEFAULT ADDRESS
        const x = res.data.filter((item) => {
          return item.defaultAddress === true;
        })
        setAddressUserSelected(x[0].address);
        setAddressUserSelectedId(x[0].address.id);
      })
      .catch((err) => {
        console.log("Address by user data error: ", err);
      })
    // GET ALL VOUCHER BY USER ID:
    axios.get(`${baseURL}/api/v1/voucher/user?userId=${userID}`)
      .then((res) => {
        setVoucherUserData(res.data);
      })
      .catch((err) => console.log("Voucher error: ", err))
  }, [])
  // CHANGE USER ADDRESS WHEN CHOOSE ADDRESS LIST
  useEffect(() => {
    const x = addressUserData.filter((item) => {
      return item?.address.id == addressUserSelectedId;
    })

    setAddressUserSelected(x[0]?.address);

  }, [addressUserSelectedId])
  // CHANGE USER VOUCHER WHEN CHOOSE VOUCHER LIST
  useEffect(() => {
    const y = voucherUserData.filter(
      (item) => item.voucher.id === voucherUserSelectedId
    )
    setVoucherUserSelected(y[0]?.voucher);
  }, [voucherUserSelectedId])

  // CHANGE VOUCHER PRICE WHEN CHANGE VOUCHER:
  useEffect(() => {
    if (voucherUserSelected?.voucherType?.id == 2) {
      const x = (voucherUserSelected?.percent) / 100 * shippingStateOriginal;
      if (x < voucherUserSelected?.upTo) {
        setShippingState(x);
        setSubtotalState(0);
      }
      else {
        setShippingState(voucherUserSelected?.upTo);
        setSubtotalState(0);
      }
    }
    else if (voucherUserSelected?.voucherType?.id == 1) {
      const y = (voucherUserSelected?.percent) / 100 * subtotalStateOriginal;
      if (y < voucherUserSelected?.upTo) {
        setSubtotalState(y);
        setShippingState(0);
      }
      else {
        setSubtotalState(voucherUserSelected?.upTo);
        setShippingState(0);
      }
    }
  }, [voucherUserSelected])
  // CART CARD COMPONENT
  const CartCard = ({ item }) => {
    return (
      <>
        <div className='orderProductCard__container'>
          <img src={item.productImage.slice(0, -1)}
            style={{ height: 80, width: 80, marginLeft: 5 }}
          />
          <p className='orderProductCard__name'>{item.productName}</p>
          <p className='orderProductCard__amount'>{item.price} $</p>
          {/* <p className='orderProductCard__amount'>{item.discount} %</p> */}
          <p style={{ marginLeft: 300 }}>{item.amount}</p>

        </div>

      </>


    )
  }
  return (
    <Helmet title='Checkout'>
      <Box m={2} style={{ padding: 10, marginTop: 50, marginLeft: 100, marginBottom: -50 }}>
        <Breadcrumbs
          // maxItems={}
          // itemsBeforeCollapse={2}
          aria-label='breadcrumb'
          separator={<NavigationNexIcon fontSize='small' />}
        >
          <LinkBreadcrumb underline='hover' color={'#F9813A'}>
            <Link to={"/home"}>Home</Link>
          </LinkBreadcrumb>
          <LinkBreadcrumb underline='hover' color={'#F9813A'}>
            <Link to={"/cart"}>Cart</Link>
          </LinkBreadcrumb>
          <Typography color={"black"}>Checkout</Typography>
        </Breadcrumbs>
      </Box>
      {/* MODAL ADDRESS CHOOSE */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalAddressVisible}
        onClose={() => setModalAddressVisible(!modalAddressVisible)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalAddressVisible}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Choose address
            </Typography>
            {
              addressUserData.map((item) => (
                <div className='address__detail-select' key={item.address.id}>
                  <p style={{ fontSize: 16, width: 600 }}>
                    {item.address.apartmentNumber},
                    {item.address.ward[0] === '{' ? JSON.parse(item.address.ward).ward_name : item.address.ward},
                    {item.address.district[0] === '{' ? JSON.parse(item.address.district).district_name : item.address.district},
                    {item.address.province}</p>
                  <input
                    checked={addressUserSelectedId === item.address.id ? true : false}
                    style={{ width: 20, height: 20 }}
                    type='checkbox'
                    onClick={() => setAddressUserSelectedId(item.address.id)}
                  />
                </div>
              ))
            }
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>

              <div className='address__btn'>
                <button
                  onClick={() => {
                    navigate(`/userinformation/${1}`)
                  }}
                >My address</button>
              </div>
              <div className='address__btn'>
                <button
                  onClick={() => {
                    setModalAddressVisible(!modalAddressVisible)
                    setAddressConfirm(!addressConfirm);
                  }}
                >Done</button>
              </div>

            </div>
          </Box>
        </Fade>
      </Modal>
      {/* MODAL CHOOSE VOUCHER */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalVoucherVisible}
        onClose={() => setModalVoucherVisible(!modalVoucherVisible)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalVoucherVisible}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" style={{ marginBottom: 20 }}>
              Choose voucher
            </Typography>
            {
              voucherUserData.map((item) => {
                return (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <img src={item.voucher.thumbnail}
                      style={{ width: 70, height: 70, borderRadius: 10, marginRight: 20 }}
                    />
                    <div className='voucher__item-title' style={{ width: 300 }}>
                      <p style={{ fontWeight: 'bold' }}>{item.voucher.title}</p>
                      <p>{item.voucher.description}</p>
                    </div>
                    <input
                      type='radio'
                      style={{ width: 20, height: 20 }}
                      onChange={(e) => setVoucherUserSelectedId(item.voucher.id)}
                      checked={voucherUserSelectedId === item.voucher.id ? true : false}
                    />
                  </div>
                )
              })
            }
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
              <div className='address__btn1'>
                <button
                  onClick={() => {
                    setVoucherUserSelectedId(0);
                    setModalVoucherVisible(!modalVoucherVisible);
                  }}
                >No use</button>
              </div>
              <div className='address__btn'>
                <button
                  onClick={() => {
                    setModalVoucherVisible(!setModalVoucherVisible)
                  }}
                >Done</button>
              </div>
              
            </div>
          </Box>
        </Fade>
      </Modal>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className='checkout__address-container'>
                <div style={{ height: 80 }}>
                  <div className='address__title'>

                    <i class="ri-map-pin-fill"></i>

                    <p >Delivery address</p>
                  </div>
                  <div className='address__detail'>
                    <p style={{ fontWeight: 'bold', fontSize: 16 }}>{userData.name} ({userData.phone})</p>
                    <p style={{ fontSize: 16 }}>{addressUserSelected?.apartmentNumber},
                      {addressUserSelected?.ward !== undefined && JSON.parse(addressUserSelected?.ward).ward_name},
                      {addressUserSelected?.district !== undefined && JSON.parse(addressUserSelected?.district)?.district_name},
                      {addressUserSelected?.province}</p>
                  </div>
                </div>
                <div className='address__btn'>
                  <button
                    onClick={() => setModalAddressVisible(!modalAddressVisible)}
                  >Edit</button>
                </div>
              </div>
              <div style={{ backgroundColor: '#fde4e4', width: '100%', marginBottom: 10, borderRadius: 10 }}>
                <div className='borderBottom'>
                  <div className='orderList__title'>
                    <p style={{ fontWeight: 'bold', fontSize: 18, color: '#F9813A' }}>List product</p>
                    <span

                    ><i style={{ width: 20, height: 20, color: '#F9813A' }} class="ri-arrow-down-s-line"></i></span>
                  </div>
                  <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <div className='product__table-title'>
                      <p style={{ marginRight: 750 }}>Product</p>
                      <p style={{ marginRight: 300 }}>Price</p>
                      <p >Amount</p>
                    </div>
                    <div>
                      {
                        productCartData.map((item) => (
                          <CartCard item={item} />
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className='borderBottom orderList__footer'>
                  <div style={{ height: 50, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                    <p style={{ marginRight: 30, margin: 'auto' }}>Note</p>
                    <input className='note__input' type='email'
                      onChange={(e) => setNoteValue(e.target.value)}
                    />
                  </div>
                  <p>Subtotal ({productCartData.length} items) : {subtotalStateOriginal}$</p>
                </div>
              </div>

              <div style={{ backgroundColor: '#F9813A', height: 110, width: '100%' }}>
                <div className='voucher__title'>
                  <div style={{ display: 'flex', fontSize: 20, fontWeight: 600, color: '#F9813A' }}>
                    <span><i class="ri-map-pin-fill"></i></span>
                    <p>Voucher</p>
                  </div>
                  <button className='voucher__btn'
                    onClick={() => setModalVoucherVisible(true)}
                  ><i class="ri-add-circle-fill"></i> Add</button>
                </div>
                {
                  voucherUserSelectedId == 0 ?
                    <div className="voucher__item">
                      <p style={{ color: 'red' }}>No voucher is used <DeleteForeverIcon /></p>
                    </div>
                    :
                    <div className='voucher__item'>
                      <img src={voucherUserSelected?.thumbnail}
                        style={{ width: 70, height: 70, borderRadius: 10, marginRight: 20 }}
                      />
                      <div className='voucher__item-title'>
                        <p style={{ fontWeight: 'bold' }}>{voucherUserSelected?.title}</p>
                        <p>{voucherUserSelected?.description}</p>
                      </div>
                    </div>
                }
              </div>
              <div
                className='payment__container'
                style={{ height: 100, marginTop: 70, display: 'flex', alignItems: 'center', backgroundColor: '#fde4e4' }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: '#F9813A' }}>Payment method</p>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 50 }}>
                  <input type='radio' style={{ height: 20, width: 20, marginRight: 10 }}
                    checked={paymentMethod == 'VNPAY' ? true : false}
                    onChange={() => setPaymentMethod('VNPAY')}
                  />
                  <img src='https://inkythuatso.com/uploads/images/2021/12/vnpay-logo-inkythuatso-01-13-16-26-42.jpg'
                    style={{ height: 60, width: 60, borderRadius: 10 }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 50 }}>
                  <input type='radio' style={{ height: 20, width: 20, marginRight: 10 }}
                    checked={paymentMethod == 'COD' ? true : false}
                    onChange={() => setPaymentMethod('COD')}
                  />
                  <img src='https://png.pngtree.com/png-vector/20210529/ourlarge/pngtree-cod-cash-on-delivery-fast-png-image_3382624.jpg'
                    style={{ height: 60, width: 60, borderRadius: 10 }}
                  />
                </div>
              </div>
              <div className='finalPrice__container'>
                <div className='finalPrice__item'>
                  <h5>Subtotal</h5>
                  <h5>{subtotalStateOriginal} $</h5>
                </div>
                <div className='finalPrice__item'>
                  <h5>Shipping fee</h5>
                  <h5>{shippingStateOriginal} $</h5>
                </div>
                <div className='finalPrice__item'>
                  <h5>Voucher (Subtotal)</h5>
                  <h5>-{subtotalState} $</h5>
                </div>
                <div className='finalPrice__item'>
                  <h5>Voucher (Shipping)</h5>
                  <h5>-{shippingState} $</h5>
                </div>
                <div className='finalPrice__item1'>
                  <h5>Total price</h5>
                  <h5>{subtotalStateOriginal + shippingStateOriginal - subtotalState - shippingState} $</h5>
                </div>
              </div>
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
                <Link to={'/cart'}>
                  <button className='checkout__btn'><ArrowBackIosIcon />Back</button>
                </Link>
                <button className='checkout__btn'
                  onClick={() => orderHandle()}
                >Place an order <ArrowForwardIosIcon /></button>
              </div>
            </Col>
          </Row>
          <a href rel="noreferrer" id="redirect" ref={ref}></a>
        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};