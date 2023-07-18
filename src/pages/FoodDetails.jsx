import React, { useContext, useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, Breadcrumbs } from '@mui/material'
import NavigationNexIcon from '@mui/icons-material/NavigateNext'
import { useParams } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import { CircularProgress, Fade, Box, Typography, Modal, Backdrop } from '@mui/material'
import userAvatar from '../assets/images/ava-1.jpg'
import { useDispatch } from 'react-redux'
import ProductCard from '../components/UI/product-card/ProductCard'

import '../styles/product-detail.css'

import Rating from '@mui/material/Rating';

import flashSaleLogo from '../assets/images/flashSaleLogo.png'
import BreadCrumb from '../components/Breadcrumb/BreadCrumb'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'
import { AppContext } from '../Context/AppProvider';

const cartId = sessionStorage.getItem("cartId")

const userID = sessionStorage.getItem("userID")

const FoodDetails = () => {
  const [tab, setTab] = useState('rev')
  const [enteredName, setEnteredName] = useState('')

  const { productId } = useParams()
  const { allProductData, cartProductData } = useContext(AppContext);
  // MODAL RATING
  const [modalRatingVisible, setModalRatingVisible] = useState(false);
  const [ratingFlag, setRatingFlag] = useState(false);

  const [productDetail, setProductDetail] = useState({});

  const [feedbackData, setFeedbackData] = useState([])

  // RATING STATE
  const [value, setValue] = React.useState(2);
  const [totalReview, setTotalReview] = useState(0);

  // TOTAL REVIEW STAR
  const [total5Star, setTotal5Star] = useState(0)
  const [total4Star, setTotal4Star] = useState(0)
  const [total3Star, setTotal3Star] = useState(0)
  const [total2Star, setTotal2Star] = useState(0)
  const [total1Star, setTotal1Star] = useState(0)

  // AMOUNT PRODUCT BUY STATE:
  const [amountProduct, setAmountProduct] = useState(1);

  const [previewImgList, setPreviewImgList] = useState([]);
  const [previewImg, setPreviewImg] = useState()
  // TOAST ERROR
  const showToastMessageError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });

  };
  const addItem = (productID) => {
    axios.get(`${baseURL}/api/v1/cart/product?cartId=${cartId}`)
      .then((res) => {
        let x = res.data.find(
          (item) => item.productId == productID
        )
        if (x === undefined) {
          if (amountProduct > productDetail.inventory) {
            showToastMessageError('Số lượng mua lớn hơn số lượng sản phẩm còn lại!');
          }
          else {

            axios.post(`${baseURL}/api/v1/cart/product?cartId=${cartId}&productId=${productID}&amount=${amountProduct}`)
              .then((res) => {
                showToastMessage('Thêm sản phẩm vào giỏ hàng thành công!!')
              })
              .catch((err) => console.log("Add product to cart error: ", err))
          }
        }
        else {

          if (amountProduct + x.amount > productDetail.inventory) {
            showToastMessageError('Số lượng mua lớn hơn số lượng sản phẩm còn lại!');
          }
          else {
            axios.post(`${baseURL}/api/v1/cart/product?cartId=${cartId}&productId=${productID}&amount=${amountProduct}`)
              .then((res) => {
                showToastMessage('Thêm sản phẩm vào giỏ hàng thành công!!')
              })
              .catch((err) => console.log("Add product to cart error: ", err))

          }
        }
      })
  }


  const addReview = () => {

    var formdata = new FormData();
    formdata.append("content", enteredName);
    formdata.append("vote", value);
    formdata.append("user", userID);
    formdata.append("product", productId);

    axios.post(`${baseURL}/api/v1/review`, formdata)
      .then((res) => {
        if (res.data.status === 'BAD_REQUEST') {
          showToastMessageErrorReview(res.data.message);

        }
        else {
          showToastMessage("Thêm đánh giá thành công!");
          setRatingFlag(!ratingFlag);
        }

      })
      .catch((err) => console.log("Error add review: ", err));

  }
  // TOAST SUCCESS BUY PRODUCT:
  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };
  // TOAST ERROR REVIEW BEFORE BUY DONE PRODUCT:
  const showToastMessageErrorReview = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });

  };



  useEffect(() => {
    axios.get(`${baseURL}/api/v1/review/product?productId=${productId}`)
      .then((res) => {
        setFeedbackData(res.data.list);
      })
      .catch((err) => console.log("Review error: ", err))
  }, [ratingFlag])
  useEffect(() => {
    // GET PRODUCT BY ID
    axios.get(`${baseURL}/api/v1/product/${productId}`)
      .then((res) => {
        console.log("Product data detail: ", res.data);
        setProductDetail(res.data);
        setPreviewImg(res.data.thumbnail);
        setPreviewImgList(res.data.images);
      })

    // GET ALL REVIEW BY PRODUCT ID
    axios.get(`${baseURL}/api/v1/review/product?productId=${productId}`)
      .then((res) => {
        setTotalReview(res.data.list.length);
        setFeedbackData(res.data.list);


        // GET TOTAL AMOUNT REVIEW
        const total5Star = res.data.list.filter((item) => { return item.vote == 5.0 })
        setTotal5Star(total5Star.length);
        const total4Star = res.data.list.filter((item) => { return item.vote == 4.0 })
        setTotal4Star(total4Star.length);
        const total3Star = res.data.list.filter((item) => { return item.vote == 3.0 })
        setTotal3Star(total3Star.length);
        const total2Star = res.data.list.filter((item) => { return item.vote == 2.0 })
        setTotal2Star(total2Star.length);
        const total1Star = res.data.list.filter((item) => { return item.vote == 1.0 })
        setTotal1Star(total1Star.length);
      })
      .catch((err) => console.log("Review error: ", err))
  }, [])

  // RELATED PRODUCT
  const relatedProduct = allProductData.filter(
    item => item.price <= productDetail.price && item.id != productId && item.category === productDetail.category
  )

  // if () {
  //   return (
  //     <div style={{
  //       display: "flex",
  //       height: "100vh",
  //       alignItems: "center",
  //       justifyContent: "center",
  //     }}>
  //       <Box sx={{ display: 'flex' }}>
  //         <CircularProgress />
  //       </Box>
  //     </div>
  //   )
  // }

  return (

    <Helmet title="Product-details">
      <Box m={2} style={{ padding: 10, marginTop: 50, marginLeft: 100 }} >
        <Breadcrumbs
          // maxItems={}
          // itemsBeforeCollapse={2}
          aria-label='breadcrumb'
          separator={<NavigationNexIcon fontSize='small' />}
        >
          <Link underline='hover' href='/home' color={'#F9813A'}>
            Trang chủ
          </Link>
          <Link underline='hover' href='/foods' color={'#F9813A'}>
            Mua sắm
          </Link>
          <Typography color={"black"}>{productDetail.name}</Typography>
        </Breadcrumbs>
      </Box>
      <Container>
        <Row >
          <Col lg="2" md="2" className='productDetail__container'>
            <div className="product__images ">
              <div
                className="img__item mb-3"
                onClick={() => setPreviewImg(productDetail.thumbnail)}
              >
                <img src={productDetail.thumbnail?.slice(0, -1)} alt="" style={{ width: 100, height: 100 }} />
              </div>
              <div
                className="img__item mb-3"
                onClick={() => setPreviewImg(previewImgList[0])}
              >
                <img src={previewImgList[0]?.slice(0, -1)} alt="" style={{ width: 100, height: 100 }} />
              </div>
              <div
                className="img__item mb-3"
                onClick={() => setPreviewImg(previewImgList[1])}
              >
                <img src={previewImgList[1]?.slice(0, -1)} alt="" style={{ width: 100, height: 100 }} />
              </div>

              <div
                className="img__item"
                onClick={() => setPreviewImg(previewImgList[2])}
              >
                <img src={previewImgList[2]?.slice(0, -1)} alt="" style={{ width: 100, height: 100 }} />
              </div>
            </div>
          </Col>

          <Col lg="4" md="4" className='productDetail__container'>
            <div className="product__main-img">
              <img src={previewImg?.slice(0, -1)} alt="" style={{ width: 300, height: 300 }} />
            </div>
          </Col>

          <Col lg="6" md="6" className='productDetail__container'>
            <div className="single__product-content">
              <p className="product__title mb-3">{productDetail.name}</p>
              <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                <p className='product__title-item' style={{ marginRight: 20, paddingRight: 10, fontWeight: 'bold' }}>{productDetail?.rate?.toFixed(2)} ★</p>
                <p className='product__title-item' style={{ marginRight: 20, paddingRight: 10, fontWeight: 'bold' }}>{totalReview} đánh giá</p>
                <p style={{ fontWeight: 'bold' }}>{200 - productDetail.inventory} sản phẩm đã bán</p>
              </div>
              {
                productDetail.inventory < 20 &&
                <p style={{ fontWeight: 'bold', fontSize: 20, padding: 10, borderRadius: 5, color: 'white', backgroundColor: 'red', width: 'fit-content' }}>Còn lại {productDetail.inventory} sản phẩm</p>
              }

              <Rating

                value={
                  productDetail.rate % 1 < 0.5 ?
                    Math.floor(productDetail.rate)
                    :
                    Math.ceil(productDetail.rate)
                }
                readOnly
              />
              <div style={{ marginTop: 20 }}>
                {
                  productDetail.discountPercent >= 30 &&
                  <div style={{ backgroundColor: '#f1431e', height: 40 }}>

                    <img src={flashSaleLogo} height={40} width={160} />
                  </div>
                }
                {
                  productDetail.forSale ?
                    <div style={{ backgroundColor: '#fedac5', display: 'flex', flexDirection: 'row', alignItems: 'center', height: 70 }}>
                      {
                        productDetail.discountPercent > 0 &&
                        <h5 className='product__title-originalPrice'>{productDetail.price} đ</h5>
                      }
                      <h4 className='product__title-discountPrice'>{productDetail.price * ((100 - productDetail.discountPercent) / 100)} đ</h4>
                      <p className='product__title-discountPercent'>-{productDetail.discountPercent}%</p>
                    </div>
                    :
                    <div style={{ backgroundColor: '#fedac5', display: 'flex', flexDirection: 'row', alignItems: 'center', height: 70 }}>
                      <p style={{ fontWeight: 'bold', fontSize: 25, color: 'red', marginLeft: 10 }}>The product has been discontinued</p>
                    </div>
                }
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 25 }}>
                <p className='product__category'>Thương hiệu: {productDetail.brand}</p>
                <p className='product__category'>Loại: {productDetail.category}</p>
                <p className='product__category'>Nhóm sản phẩm: {productDetail.groupProduct}</p>
              </div>
              <div style={{ marginTop: 20, width: 130 }} className='d-flex '>
                <div style={{ marginLeft: 10 }} className='changeAmount__btn'
                  onClick={() => setAmountProduct(amountProduct - 1)}
                >
                  <i className='ri-subtract-line'></i>
                </div>
                <p style={{ fontWeight: 'bold', marginLeft: 10, textAlign: 'center', margin: 'auto', fontSize: 20 }}>{amountProduct}</p>
                <div className='changeAmount__btn'
                  onClick={() => setAmountProduct(amountProduct + 1)}
                >
                  <i className='ri-add-line'></i>
                </div>
              </div>
              <div style={{ marginTop: 30 }}>
                {/* <button onClick={addItem} className="addTOCart__btn"
                  style={{ marginRight: 20 }}
                >
                  Mua ngay
                </button> */}
                <button
                  onClick={() => {
                    addItem(productId);
                  }}
                  className="addTOCart__btn">
                  Thêm giỏ hàng
                </button>
                <ToastContainer />
              </div>
            </div>
          </Col>
          <Col lg='10'>
            <div className="tabs d-flex align-items-center gap-3 py-3">
              <h6 className={`${tab === 'desc' ? 'tab__activeProductDetail' : ''}`} onClick={() => setTab('desc')}>Mô tả</h6>
              <h6 className={`${tab === 'rev' ? 'tab__activeProductDetail' : ''}`}
                onClick={() => setTab('rev')}>Đánh giá</h6>
            </div>
            {
              tab === 'desc' ? (
                <div className="tab__content">
                  {/* <p>{productDetail.description}</p> */}
                  <div style={{width: 500}}>

                  <p style={{width: 400}}>sdfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsddfsdf</p>
                  </div>
                  <div >
                    {
                      attributes.map((item) => (
                        <div className='attribute__item'>
                          <p style={{fontWeight: 'bold', fontSize: 20}}>{item.name}</p>
                          <p >{item.desc}</p>
                          
                        </div>
                        
                      ))
                    }
                  </div>
                </div>
              ) :
                (
                  <div className="tab__form mb-3" style={{ paddingLeft: 70, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#E5E5E5', borderRadius: 30 }}>
                    <div style={{ marginTop: 50 }}>
                      <div>
                        <p style={{ fontSize: 20, fontWeight: 'bold' }}>Đánh giá sản phẩm</p>
                        <p>{productDetail?.rate?.toFixed(2)}/5 ( {totalReview} đánh giá)</p>
                        
                        <Rating
                          name="simple-controlled"
                          value={
                            productDetail.rate % 1 < 0.5 ?
                              Math.floor(productDetail.rate)
                              :
                              Math.ceil(productDetail.rate)
                          }
                          readOnly
                        />
                      </div>
                      <div style={{ marginTop: 30 }}>
                        <div style={{ flexDirection: 'row', marginBottom: 5, display: 'flex' }}>
                          <p style={{ width: 10, fontSize: 20 }}>5</p>
                          <i class="ri-star-fill" style={{ color: '#f9a825', fontSize: 20 }}></i>
                          <div style={{ backgroundColor: 'white', height: 20, width: 200 }}>
                            <div style={{ backgroundColor: '#F9813A', height: 20, width: 10 * total5Star }}></div>

                          </div>
                        </div>
                        <div style={{ flexDirection: 'row', marginBottom: 5, display: 'flex' }}>
                          <p style={{ width: 10, fontSize: 20 }}>4</p>
                          <i class="ri-star-fill" style={{ color: '#f9a825', fontSize: 20 }}></i>
                          <div style={{ backgroundColor: 'white', height: 20, width: 200 }}>
                            <div style={{ backgroundColor: '#F9813A', height: 20, width: 10 * total4Star }}></div>

                          </div>
                        </div>
                        <div style={{ flexDirection: 'row', marginBottom: 5, display: 'flex' }}>
                          <p style={{ width: 10, fontSize: 20 }}>3</p>
                          <i class="ri-star-fill" style={{ color: '#f9a825', fontSize: 20 }}></i>
                          <div style={{ backgroundColor: 'white', height: 20, width: 200 }}>
                            <div style={{ backgroundColor: '#F9813A', height: 20, width: 10 * total3Star }}></div>

                          </div>
                        </div>
                        <div style={{ flexDirection: 'row', marginBottom: 5, display: 'flex' }}>
                          <p style={{ width: 10, fontSize: 20 }}>2</p>
                          <i class="ri-star-fill" style={{ color: '#f9a825', fontSize: 20 }}></i>
                          <div style={{ backgroundColor: 'white', height: 20, width: 200 }}>
                            <div style={{ backgroundColor: '#F9813A', height: 20, width: 10 * total2Star }}></div>

                          </div>
                        </div>
                        <div style={{ flexDirection: 'row', marginBottom: 5, display: 'flex' }}>
                          <p style={{ width: 10, fontSize: 20 }}>1</p>
                          <i class="ri-star-fill" style={{ color: '#f9a825', fontSize: 20 }}></i>
                          <div style={{ backgroundColor: 'white', height: 20, width: 200 }}>
                            <div style={{ backgroundColor: '#F9813A', height: 20, width: 10 * total1Star }}></div>

                          </div>
                        </div>
                      </div>
                    </div>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={modalRatingVisible}
                      onClose={() => setModalRatingVisible(!modalRatingVisible)}
                      closeAfterTransition
                      slots={{ backdrop: Backdrop }}
                      slotProps={{
                        backdrop: {
                          timeout: 500,
                        },
                      }}
                    >
                      <Fade in={modalRatingVisible}>
                        <Box sx={style}>
                          <Typography id="transition-modal-title" variant="h6" component="h2">
                            Nội dung
                          </Typography>
                          <div className="form__group">
                            <input type="text" placeholder='Enter your name...'
                              onChange={e => setEnteredName(e.target.value)}
                              required />
                          </div>

                          <div className='form__group'>
                            <Box
                              sx={{
                                '& > legend': { mt: 2 },
                              }}
                            >
                              <Typography component="legend"><h5>Đánh giá</h5></Typography>
                              <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                  setValue(newValue);
                                }}
                              />

                            </Box>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type='submit' className='addTOCart__btn' style={{ marginRight: 30 }}
                              onClick={() => {

                                setModalRatingVisible(false);
                                addReview();
                              }}
                            >
                              Lưu
                            </button>
                            <button type='submit' className='addTOCart__btn' style={{ marginLeft: 30 }}
                              onClick={() => setModalRatingVisible(!modalRatingVisible)}
                            >
                              Thoát
                            </button>
                          </div>
                        </Box>
                      </Fade>
                    </Modal>
                    <div style={{ marginRight: 200, width: 400 }}>
                      <div style={{height: 400, width: 600, overflowY: 'scroll'}}>
                        {
                          feedbackData?.map((item) => (
                            <div className="review pt-5" >
                              <div className="review__content">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                  <img src={userAvatar}
                                    style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 }}
                                  />
                                  <p className="user__name mb-3">{item.userName}</p>
                                </div>
                                <p className="feedback__text" >{item.content}</p>
                              </div>
                              <Rating name="read-only" value={item.vote} readOnly />
                            </div>
                          ))
                        }
                      </div>
                      <button className='addTOCart__btn' style={{ marginTop: 20, marginBottom: 20 }}
                        onClick={() => setModalRatingVisible(true)}
                      >
                        Thêm đánh giá
                      </button>
                    </div>

                  </div>
                )
            }



          </Col>
          <Col lg='12' className='mb-5 mt-4'>
            <h2 className='related__Product-title'>Sản phẩm liên quan</h2>

          </Col>
          {
            relatedProduct.map(item => (
              <Col lg='3' md='4' sm='6' xs='6' key={item.id}
                className='mb-4'>
                <ProductCard item={item} />
              </Col>
            ))
          }
        </Row>
      </Container>

    </Helmet>
  )
}

export default FoodDetails

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 320,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const attributes = [
  {
    id: 1,
    name: 'CPU',
    desc: 'sdlfkjsldkfjsldkfjsldkfsdf',
  },
  {
    id: 2,
    name: 'CPU',
    desc: 'sdlfkjsldkfjsldkfjsldkfjsldkfssldkfjsldkfjsldkfsldkfsdf',
  },
  {
    id: 3,
    name: 'CPU',
    desc: 'sdlfkjsldkfjsldkfjsldkfssldkfjsldkfjsldkfssldkfjsldkfjsldkfssldkfjsldkfjsldkfsdf',
  },
]