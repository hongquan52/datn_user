import React, { useState, useEffect } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, ListGroup, ListGroupItem, ListInlineItem } from 'reactstrap'
import heroImg from '../assets/images/hero1.png'
import flashSale from '../assets/images/flashSale.png'
import '../styles/hero-section.css'
import '../styles/home.css'
import { Box, CircularProgress } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Link, useNavigate } from 'react-router-dom'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import featureImg01 from '../assets/images/service-01.png'
import featureImg02 from '../assets/images/service-02.png'
import featureImg03 from '../assets/images/service-03.png'

import {Dialog, Alert, AlertTitle } from '@mui/material'

import ProductCard from '../components/UI/product-card/ProductCard'
import ProductCardBestSale from '../components/UI/product-card/ProductCardBestSale'

import voucherLogo from '../assets/images/voucherLogo.png'
import whyImg from '../assets/images/location.jpg'
import TestimonialSlider from '../components/UI/Slider/TestimonialSlider'
// BRAND
import Samsung from '../assets/images/brand/Samsung.svg.webp'
import Kingston from '../assets/images/brand/Kingston-Logo.png'
import Asus from '../assets/images/brand/Asus-Logo.png'
import Intel from '../assets/images/IntelLogo.png'
import MSI from '../assets/images/brand/MSI-Logo.png'

import HomeSlider from '../components/UI/Slider/HomeSlider'


import { useQuery } from '@tanstack/react-query'
import { thunkCartTypes, thunkProductTypes, thunkProductTypeTypes } from '../constants/thunkTypes'
import { getAllProducts, getAllProductsList, getHotProducts } from '../api/fetchers/product'
import { getCart } from '../api/fetchers/cart'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'

const featureData = [
  {
    title: 'Giao hàng nhanh chóng',
    imgUrl: featureImg01,
    desc: 'lorem ipsum dolor, sit amet consectuture adipsdfjsldf elit'
  },
  {
    title: 'Chất lượng bảo đảm',
    imgUrl: featureImg02,
    desc: 'lorem ipsum dolor, sit amet consectuture adipsdfjsldf elit'
  },
  {
    title: 'Dễ dàng đặt hàng',
    imgUrl: featureImg03,
    desc: 'lorem ipsum dolor, sit amet consectuture adipsdfjsldf elit'
  },
]
// SETTING PRODUCT SLIDER
var settings = {
  // swipeToSlide: true,
  dots: false,
  infinite: false,
  speed: 2000,
  slidesToShow: 4,
  autoplay: true,
  // autoplaySpeed: 1000,
  slidesToScroll: 4,
  
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
};

const Home = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery([thunkProductTypes.GETALL_PRODUCT], getAllProducts)
  const queryGetHotProduct = useQuery([thunkProductTypes.GETHOT_PRODUCT], getHotProducts)

  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState('ALL')

  const [allProducts, setAllProducts] = useState([])
  const [allProduct, setAllProduct] = useState([])
  const [flashSaleProduct, setFlashSaleProduct] = useState([]);
  const [hotProducts, setHotProducts] = useState([])
  const [bestSaleProduct, setBestSaleProduct] = useState([]);

  const [voucherData, setVoucherData] = useState([]);

  const [cart, setCart] = useState([])

  const [open, setOpen] = useState(false);

  const [hotPizza, setHotPizza] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };


  useEffect(() => {
    if (hotProducts) {
      // const filteredPizza = hotProducts.filter((item) => item.price > 1000);
      const slicePizza = hotProducts.slice(0, 8);
      setHotPizza(slicePizza);

    }
  }, [hotProducts]);

  useEffect(() => {
    if (queryGetHotProduct.data) {
      setHotProducts(queryGetHotProduct.data.data);
    }
  })
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseURL}/api/v1/product`)
      .then((res) => {
        console.log("DATA PRODUCT=========================================, ", res.data);
        setAllProduct(res.data);
        // FLASH SALE PRODUCT
        let flashSale = res.data.filter(
          (item) => item.discount >= 40
        )
        setFlashSaleProduct(flashSale);
        
      })
    // BEST SALE PRODUCT
    axios.get(`${baseURL}/statistic/sold-product-amount`)
      .then((res) => setBestSaleProduct(res.data))
      .catch((err) => console.log("Best sale err: ", err))
    // GET ALL VOUCHER
    axios.get(`${baseURL}/api/v1/voucher`)
      .then((res) => setVoucherData(res.data))
      .catch((err) => console.log("error all voucher: ", err))
      .finally(() => setLoading(false))
  }, [])

  // search product
  useEffect(() => {
    if (data) {
      if (category === "ALL") {
        setAllProducts(data.data);

      }

      if (category === "Kingston") {
        const filteredProducts = data.data.filter(
          (item) => item.brand === "Kingston"
        );
        console.log('Kingston product: ', filteredProducts)

        setAllProducts(filteredProducts);
      }

      if (category === "Samsung") {
        const filteredProducts = data.data.filter(
          (item) => item.brand === 'Samsung'
        );
        console.log('Samsung product: ', filteredProducts)
        setAllProducts(filteredProducts);
      }

      if (category === "Logitech") {
        const filteredProducts = data.data.filter(
          (item) => item.brand === 'Logitech'
        );

        console.log("Logitech product: ", filteredProducts)
        setAllProducts(filteredProducts);
      }
      if (category === "Asus") {
        const filteredProducts = data.data.filter(
          (item) => item.brand === 'Asus'
        );

        console.log("Asus product: ", filteredProducts)
        setAllProducts(filteredProducts);
      }
      if (category === "Intel") {
        const filteredProducts = data.data.filter(
          (item) => item.brand === 'Intel'
        );

        console.log("Intel product: ", filteredProducts)
        setAllProducts(filteredProducts);
      }
      if (category === "MSI") {
        const filteredProducts = data.data.filter(
          (item) => item.brand === 'MSI'
        );

        console.log("MSI product: ", filteredProducts)
        setAllProducts(filteredProducts);
      }

    }
  }, [category, data]);

  if (loading) {
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
    <Helmet title='Home'>
      <section>
        <Dialog open={open} onClose={handleClick}>
          <Alert
          //props go here
          >
            <AlertTitle>Sản phẩm</AlertTitle>
            Thêm sản phẩm vào giỏ hàng thành công
          </Alert>
        </Dialog>
      </section>
      {/* EVENTS AND VOUCHERS */}
      <section style={{ marginTop: -100 }}>
        <Container>
          <Row >
            <Col>
              <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#F9813A', alignItems: 'center' }}>
                <h5 style={{ fontWeight: 'bold', fontSize: 30, color: 'white' }}>EVENTS AND VOUCHERS</h5>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg='9' md='6'>
              <div style={{ backgroundColor: 'black', height: 250 }}>
                <HomeSlider />

              </div>
            </Col>
            <Col lg='3' md='6'>
              <div style={{ backgroundColor: '#908e8c', height: 250 }}>
                <div>
                  <img className='voucher-img' src="https://images.bloggiamgia.vn/full/10-02-2023/Shopee-sale-20-1675991508407.png" alt="" />
                  <img className='voucher-img' src="https://cdn.chanhtuoi.com/uploads/2022/07/1200x628-11-1-1.jpg" alt="" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ITEM GROUP */}
      <section style={{ marginTop: -100 }}>
        <Container>
          <Row >
            <Col>
              <div style={{
                display: 'flex', justifyContent: 'space-around', backgroundColor: '#F9813A', alignItems: 'center', height: 120,
                marginTop: 50, borderRadius: 10
              }}>
                <div className='item_group'>
                  <img src='https://seeklogo.com/images/H/hot-sale-mexico-logo-726E38BE8E-seeklogo.com.png'
                    style={{ height: 50, width: 70, marginBottom: 15 }} />
                  <h5 style={{ fontWeight: 'bold', fontSize: 15, color: 'black', width: 100, textAlign: 'center' }}>Sale</h5>
                </div>
                <div className='item_group'>
                  <img src={voucherLogo}
                    style={{ height: 50, width: 70, marginBottom: 15 }} />
                  <h5 style={{ fontWeight: 'bold', fontSize: 15, color: 'black', width: 100, textAlign: 'center' }}>Hot voucher</h5>
                </div>
                <div className='item_group'>
                  <img src='https://cdn-icons-png.flaticon.com/512/1069/1069102.png'
                    style={{ height: 50, width: 70, marginBottom: 15 }} />
                  <h5 style={{ fontWeight: 'bold', fontSize: 15, color: 'black', width: 100, textAlign: 'center' }}>Top product</h5>
                </div>
                <div className='item_group'>
                  <img src='https://cdn-icons-png.flaticon.com/512/983/983763.png'
                    style={{ height: 50, width: 70, marginBottom: 15 }} />
                  <h5 style={{ fontWeight: 'bold', fontSize: 15, color: 'black', width: 100, textAlign: 'center' }}>Ranking</h5>
                </div>
                <div className='item_group'>
                  <img src='https://freepngimg.com/save/14102-free-shipping-png-image/550x446'
                    style={{ height: 50, width: 70, marginBottom: 15 }} />
                  <h5 style={{ fontWeight: 'bold', fontSize: 15, color: 'black', width: 100, textAlign: 'center' }}>Free shipping</h5>
                </div>
              </div>
            </Col>
          </Row>

        </Container>
      </section>
      <section style={{ marginTop: -100 }}>
        <Container>
          <Row >
            <Col>
              <div style={{
                display: 'flex', justifyContent: 'space-between'
                , backgroundColor: '#F9813A', alignItems: 'center', height: 70, marginBottom: -20, marginTop: 50
              }}>
                <h5 style={{
                  fontWeight: 'bold', fontSize: 30, color: '#F9813A',
                  padding: 5, borderRadius: 5, marginLeft: 10, backgroundColor: 'white'
                }}>ITEM</h5>
              </div>
            </Col>
          </Row>
          <Row>
            {
              itemCategory.map((item) => (
                <Col key={item.id} lg='2' md='2' className='mt-5'>
                  <div className='item_category'>
                    <img src={item.image}
                      style={{ width: 150, height: 150 }}
                    />
                    <p>{item.title}</p>
                  </div>
                </Col>
              ))
            }

          </Row>
        </Container>
      </section>
      <section style={{ marginTop: -100 }}>
        <Container>
          <Row >
            <Col>
              <div style={{
                display: 'flex', justifyContent: 'space-between'
                , backgroundColor: '#F9813A', alignItems: 'center', height: 70, marginBottom: -20, marginTop: 50
              }}>
                <h5 style={{
                  fontWeight: 'bold', fontSize: 30, color: '#F9813A',
                  padding: 5, borderRadius: 5, marginLeft: 10, backgroundColor: 'white'
                }}> BEST SALES</h5>
                <h5 style={{ fontSize: 20, color: 'white', marginRight: 20 }}>Show all {'>'}</h5>
              </div>
            </Col>
          </Row>
          <Row>
            <Slider {...settings}>
              {
                bestSaleProduct.map((item) => (
                  <Col lg='3' md='4' key={item.id} className='mt-5'>
                    <ProductCardBestSale item={item} />
                  </Col>
                ))
            }
            </Slider>
          </Row>
        </Container>
      </section>
      <section style={{ marginTop: -100 }}>
        <Container>
          <Row >
            <Col>
              <div style={{
                display: 'flex', justifyContent: 'space-between'
                , backgroundColor: '#F9813A', alignItems: 'center', height: 70, marginBottom: -20, marginTop: 50
              }}>
                <h5 style={{
                  fontWeight: 'bold', fontSize: 30, color: '#F9813A',
                  padding: 5, borderRadius: 5, marginLeft: 10, backgroundColor: 'white'
                }}>PORPULAR BRAND</h5>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg='2' md='2' className='mt-5'>
              <div className='item_category'>
                <div onClick={() => setCategory("Samsung")}>
                  <img src={Samsung}
                    style={{ width: 200, height: 120, padding: 20 }}
                  />
                </div>

              </div>
            </Col>
            <Col lg='2' md='2' className='mt-5'>
              <div className='item_category'>
                <div onClick={() => setCategory("Logitech")}>
                    <img src={"data:image/png;base64,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"}
                    style={{ width: 200, height: 120, padding: 20 }}
                  />
                </div>

              </div>
            </Col>
            <Col lg='2' md='2' className='mt-5'>
              <div className='item_category'>
                <div onClick={() => setCategory("Kingston")}>
                  <img src={Kingston}
                    style={{ width: 200, height: 120, padding: 20 }}
                  />
                </div>

              </div>
            </Col>
            <Col lg='2' md='2' className='mt-5'>
            <div className='item_category'>
                <div onClick={() => setCategory("Asus")}>
                  <img src={Asus}
                    style={{ width: 200, height: 120, padding: 20 }}
                  />
                </div>

              </div>
            </Col>
            <Col lg='2' md='2' className='mt-5'>
              <div className='item_category' onClick={() => setCategory('Intel')}>
                <img src={Intel}
                  style={{ width: 200, height: 120, padding: 20 }}
                />
                
              </div>
            </Col>
            <Col lg='2' md='2' className='mt-5'>
              <div className='item_category' onClick={() => setCategory('MSI')}>
                <img src={MSI}
                  style={{ width: 200, height: 120, padding: 20 }}
                />
                
              </div>
            </Col>
          </Row>
          <Row>
            {
              allProducts.map((item) => (
                <Col lg='3' md='4' key={item.id} className='mt-5'>
                  <ProductCard item={item} sukien={handleClick} />
                </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section style={{ marginTop: -100 }}>
        <Container>
          <Row >
            <Col>
              <div style={{
                display: 'flex', justifyContent: 'space-between'
                , backgroundColor: '#F9813A', alignItems: 'center', height: 70, marginBottom: -20, marginTop: 50
              }}>
                <h5 style={{
                  fontWeight: 'bold', fontSize: 30, color: '#F9813A',
                  padding: 5, borderRadius: 5, marginLeft: 10, backgroundColor: 'white'
                }}>FLASH SALES</h5>
                <h5 style={{ fontSize: 20, color: 'white', marginRight: 20 }}>Show all {'>'}</h5>
              </div>
            </Col>
          </Row>
          <Row>
            <Slider {...settings}>
              {
                flashSaleProduct.map((item) => (
                  <Col lg='3' md='4' key={item.id} className='mt-5'>
                    <ProductCard item={item} />
                  </Col>
                ))
            }
            </Slider>
          </Row>
        </Container>
      </section>
      <section style={{ marginTop: -100 }}>
        <Container>
          <Row >
            <Col>
              <div style={{
                display: 'flex', justifyContent: 'space-between'
                , backgroundColor: '#F9813A', alignItems: 'center', height: 70, marginBottom: -20, marginTop: 50
              }}>
                <h5 style={{
                  fontWeight: 'bold', fontSize: 30, color: '#F9813A',
                  padding: 5, borderRadius: 5, marginLeft: 10, backgroundColor: 'white'
                }}>HOT VOUCHERS</h5>
                <h5 style={{ fontSize: 18, color: 'white', marginRight: 20 }}
                  onClick={() => navigate("/voucher")}
                >Show all <ArrowForwardIcon /></h5> 
              </div>
            </Col>
          </Row>
          <Row>
            {
              voucherData.map((item) => (
                <Col lg='3' md='2' className='mt-5'>
                  <div style={{
                    width: 310, height: 100, borderRadius: 10, backgroundColor: '#E5E5E5', borderWidth: 3, borderColor: 'black',
                    display: 'flex', flexDirection: 'row'
                  }}>
                    <img src={item.thumbnail}
                      style={{ width: 100, height: 100 }}
                    />
                    <div style={{ marginLeft: 5, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                      <h5 style={{ fontWeight: 'bold', fontSize: 18, marginTop: 15 }}>{item.title}</h5>
                      <p style={{ fontSize: 13, width: 140 }}>{item.description}</p>
                    </div>
                    
                  </div>
                </Col>
              ))
            }
            
          </Row>
        </Container>
      </section>
      <section style={{ marginTop: -100 }}>
        <Container>
          <Row >
            <Col>
              <div style={{
                display: 'flex', justifyContent: 'space-between'
                , backgroundColor: '#F9813A', alignItems: 'center', height: 70, marginBottom: -20, marginTop: 50
              }}>
                <h5 style={{
                  fontWeight: 'bold', fontSize: 30, color: '#F9813A',
                  padding: 5, borderRadius: 5, marginLeft: 10, backgroundColor: 'white'
                }}> BEST SALES</h5>
                <h5 style={{ fontSize: 20, color: 'white', marginRight: 20 }}>Show all {'>'}</h5>
              </div>
            </Col>
          </Row>
          <Row>
            <Slider {...settings}>
              {
                allProduct.map((item) => (
                  <Col lg='3' md='4' key={item.id} className='mt-5'>
                    <ProductCard item={item} />
                  </Col>
                ))
            }
            </Slider>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='testimonial'>
                <h5 style={{
                    fontWeight: 'bold', fontSize: 30, color: '#F9813A',
                    padding: 5, borderRadius: 5, backgroundColor: 'white'
                  }}>EVERYONE SAY ABOUT US</h5>
                
                <p className="testimonial__desc">
                Chúng tôi luôn luôn mong muốn mọi người nêu cảm nhận, ý kiến và sự hài lòng của mình về sản phẩm sau khi nhận hàng, đó là động lực để chúng tôi ngày càng cải thiện dịch vụ và nâng cao lòng tin mọi người cho công ty của chúng tôi.
                </p>
                <TestimonialSlider />
              </div>
            </Col>
            <Col lg='6' md='6'>
              <img 
                style={{height: '100%'}}
              src={'https://cdn.thesaigontimes.vn/wp-content/uploads/2022/01/Anh-bai-4.jpg'} alt="testimonial-img" className='w-100' />
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <h5 className="mb-3">Đặt hàng dễ dàng</h5>
                <h1 className="mb-4 hero__title">
                  <span>Bạn cần mua máy tính?</span> Chờ chút <br /> sản phẩm của chúng tôi
                  <span>  dành cho bạn</span>

                </h1>

                <p>
                  Gaming shop chúng tôi cung cấp các sản phẩm và linh kiện máy tính trong khu vực TP HCM và các tỉnh miền Nam Việt Nam
                </p>
                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn">
                    Mua ngay <i className='ri-arrow-right-s-line'></i>
                  </button>

                  <button className="all__foods-btn">
                    <Link to="/foods">Xem tất cả sản phẩm</Link>
                  </button>
                </div>

                <div className='hero__service d-flex align-items-center gap-5 mt-5'>
                  <p className='d-flex align-items-center gap-2'><span className="shipping__icon">
                    <i class="ri-car-line"></i>
                  </span>Miễn phí vận chuyển</p>

                  <p className='d-flex align-items-center gap-2'><span className="shipping__icon">
                    <i className="ri-shield-check-line"></i>
                  </span>Thanh toán an toàn</p>
                </div>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h5 className='feature__subtitle mb-4'>Bạn cần chúng tôi những gì</h5>
              <h2 className='feature__title'>Chỉ cần ở nhà</h2>
              <h2 className='feature__title'>
                Chúng tôi <span>sẽ giao tới</span>
              </h2>
              <p className='mt-5 mb-1 feature__text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum dolorem doloremque dicta maiores.
                Temporibus, ipsum facilis incidunt ut sint </p>
              <p className='feature__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse et saepe iure dignissimos ea! Blanditiis unde atque at illo fugiat ad aliquid rem iure</p>

            </Col>
            {featureData.map((item, index) => (
              <Col lg='4' md='4' key={index} className='mt-5'>
                <div className="feature__item text-center py-3 px-5">
                  <img src={item.imgUrl} alt="feature-img"
                    className='w-25 mb-3' />
                  <h5 className='fw-bold mb-3'>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}

          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2>Thương hiệu nổi tiếng</h2>
            </Col>

            <Col lg='12'>
              <div className="food__category d-flex align-items-center justify-content-center gap-4">

                <button
                  className={`all__btn  ${category === "ALL" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("ALL")}
                >
                  Tất cả
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${category === 'Kingston' ? 'foodBtnActive' : ''
                    }`}
                  onClick={() => setCategory("Kingston")}
                >
                  {/* <img src={foodCategoryImg01} alt="" /> */}
                  Kingston
                  <img src="https://www.pngitem.com/pimgs/m/26-260244_kingston-technology-hd-png-download.png" alt="" />
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "Samsung" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("Samsung")}
                >
                  {/* <img src={foodCategoryImg02} alt="" /> */}
                  Samsung
                  <img src="https://brademar.com/wp-content/uploads/2022/05/Samsung-Logo-PNG-1993-%E2%80%93-2005.png" alt="" />
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "Logitech" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("Logitech")}
                >
                  {/* <img src={foodCategoryImg03} alt="" /> */}
                  Logitech
                  <img src="https://1000logos.net/wp-content/uploads/2020/10/Corsair-logo.png" alt="" />
                </button>

              </div>
            </Col>

            {allProducts.map((item) => (
              <Col lg='3' md='4' key={item.id} className='mt-5'>
                <ProductCard item={item} sukien={handleClick} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className='w-100' />
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Tại sao <span>chọn Gaming shop?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Chúng tôi là đơn vị cung cấp máy tính và linh kiện uy tín và lâu đời nhất ở TP HCM, với đôi ngũ nhân viên nhiệt huyết và tận tình với khách hàng
                </p>
                <ListGroup className='mt-5'>
                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i> Luôn cung cấp những mẫu máy tình và linh kiện mới nhất thị trường
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Quia, voluptatibus.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i> Hỗ trợ tận tình
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui, earum.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i>Đặt hàng dễ dàng ở bất cứ đâu{" "}
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui, earum.
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2>Sản phẩm bán chạy</h2>
            </Col>
            {
              hotPizza.map((item) => (
                <Col lg='3' md='4' key={item.id}>
                  <p className='quantity__sales'>Số lượng bán ra: <span>{item.quantitySales}</span></p>
                  <ProductCard item={item} sukien={handleClick} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Home
const products = [
  {
    "id": 1,
    "name": "Case 1st Player Fire Dancing V2-A ",
    "category": "Case",
    "brand": "Logitech",
    "promotion": 2,
    "price": 690000.00,
    "image": "https://product.hstatic.net/1000026716/product/1st_b3f492cb6e754e3f93bd7492132e9eb4.png"
},
{
    "id": 2,
    "name": "Case Asus TUF GT301 (3 fan RGB)",
    "category": "Case",
    "brand": "Samsung",
    "promotion": 2,
    "price": 1250000.00,
    "image": "https://product.hstatic.net/1000026716/product/gt301_0624710ec4ac4cd9a6f49513afb1420b.png"
},
{
    "id": 3,
    "name": "Case Thermaltake Divider 300 TG Snow",
    "category": "Case",
    "brand": "Kingston",
    "promotion": 2,
    "price": 2290000.00,
    "image": "https://product.hstatic.net/1000026716/product/case-thermaltake-divider-300-tg-snow_9ea40947faca496da8d0ede9dacc5d7b.jpg"
},
{
    "id": 4,
    "name": "Case XIGMATEK GEMINI II PINK 3FB",
    "category": "Case",
    "brand": "Samsung",
    "promotion": 2,
    "price": 1090000.00,
    "image": "https://product.hstatic.net/1000026716/product/gemini_56113ebc3f0d4c68bf59d11159b029a2.png"
},
{
    "id": 5,
    "name": "Chuột Logitech G502 X Plus LightSpeed Black",
    "category": "Ram",
    "brand": "Samsung",
    "promotion": 3,
    "price": 2220000.00,
    "image": "https://product.hstatic.net/1000026716/product/artboard_1_2ff4ba55c7be43a89f8ea1b2c2e577d6.png"
},
{
    "id": 6,
    "name": "Chuột Logitech G102 Lightsync RGB Black",
    "category": "Mouse",
    "brand": "Samsung",
    "promotion": 3,
    "price": 290000.00,
    "image": "https://product.hstatic.net/1000026716/product/artboard_1_2ff4ba55c7be43a89f8ea1b2c2e577d6.png"
},
{
    "id": 7,
    "name": "Chuột Logitech G Pro X Superlight Wireless Red",
    "category": "Mouse",
    "brand": "Samsung",
    "promotion": 3,
    "price": 2990000.00,
    "image": "https://product.hstatic.net/1000026716/product/artboard_1-recovered_4aab2ffadfad4f83bb09aa86ce1a5cf7.png"
},
{
    "id": 8,
    "name": "Chuột Logitech G502 X White",
    "category": "Mouse",
    "brand": "Logitech",
    "promotion": 3,
    "price": 1750000.00,
    "image": "https://product.hstatic.net/1000026716/product/artboard_1-recovered_4aab2ffadfad4f83bb09aa86ce1a5cf7.png"
}
]
const itemCategory = [
  {
    'id': 1,
    'title': 'KEYBOARD GAMING',
    'image': 'https://product.hstatic.net/1000026716/product/thumbphim-recovered_75d81b3808e24d4d93607803d8f6dc7c.gif'
  },
  {
    'id': 2,
    'title': ' RAM',
    'image': 'https://product.hstatic.net/1000026716/product/dominator_rgb_platinum_wht_ddr5_01_36b7fdaea9d6428cbc4eacdf390a0e64.png'
  },
  {
    'id': 1,
    'title': 'SCREEN PC',
    'image': 'https://product.hstatic.net/1000026716/product/gearvn-man-hinh-viewsonic-vx2416-24-ips-100hz-vien-mong-1_f3885bced7a149d6bd9ad0997f4d03a7.jpg'
  },
  {
    'id': 1,
    'title': 'COOLER',
    'image': 'https://product.hstatic.net/1000026716/product/hyper-620s-gallery-02-zoom_4dc3dcf7b9ea414aaa77229f3afbdb7c.png'
  },
  {
    'id': 1,
    'title': 'KEYBOARD GAMING',
    'image': 'https://product.hstatic.net/1000026716/product/thumbphim-recovered_75d81b3808e24d4d93607803d8f6dc7c.gif'
  },
  {
    'id': 1,
    'title': 'KEYBOARD GAMING',
    'image': 'https://product.hstatic.net/1000026716/product/thumbphim-recovered_75d81b3808e24d4d93607803d8f6dc7c.gif'
  },
  {
    'id': 1,
    'title': 'KEYBOARD GAMING',
    'image': 'https://product.hstatic.net/1000026716/product/thumbphim-recovered_75d81b3808e24d4d93607803d8f6dc7c.gif'
  },
  {
    'id': 1,
    'title': 'KEYBOARD GAMING',
    'image': 'https://product.hstatic.net/1000026716/product/thumbphim-recovered_75d81b3808e24d4d93607803d8f6dc7c.gif'
  },
  {
    'id': 1,
    'title': 'KEYBOARD GAMING',
    'image': 'https://product.hstatic.net/1000026716/product/thumbphim-recovered_75d81b3808e24d4d93607803d8f6dc7c.gif'
  },
  {
    'id': 1,
    'title': 'KEYBOARD GAMING',
    'image': 'https://product.hstatic.net/1000026716/product/thumbphim-recovered_75d81b3808e24d4d93607803d8f6dc7c.gif'
  },
  {
    'id': 1,
    'title': 'KEYBOARD GAMING',
    'image': 'https://product.hstatic.net/1000026716/product/thumbphim-recovered_75d81b3808e24d4d93607803d8f6dc7c.gif'
  },
  {
    'id': 1,
    'title': 'KEYBOARD GAMING',
    'image': 'https://product.hstatic.net/1000026716/product/thumbphim-recovered_75d81b3808e24d4d93607803d8f6dc7c.gif'
  }
]
const productsSlider = [
  {
      "id": 1,
      "name": "Case 1st Player Fire Dancing V2-A - item 1 ",
      "category": "Case",
      "brand": "Logitech",
      "promotion": 2,
      "price": 690000.00,
      "image": "https://product.hstatic.net/1000026716/product/1st_b3f492cb6e754e3f93bd7492132e9eb4.png"
  },
  {
      "id": 2,
      "name": "Case Asus TUF GT301 (3 fan RGB) - item 2",
      "category": "Case",
      "brand": "Samsung",
      "promotion": 2,
      "price": 1250000.00,
      "image": "https://product.hstatic.net/1000026716/product/gt301_0624710ec4ac4cd9a6f49513afb1420b.png"
  },
  {
      "id": 3,
      "name": "Case Thermaltake Divider 300 TG Snow",
      "category": "Case",
      "brand": "Kingston",
      "promotion": 2,
      "price": 2290000.00,
      "image": "https://product.hstatic.net/1000026716/product/case-thermaltake-divider-300-tg-snow_9ea40947faca496da8d0ede9dacc5d7b.jpg"
  },
  {
      "id": 4,
      "name": "Case XIGMATEK GEMINI II PINK 3FB",
      "category": "Case",
      "brand": "Samsung",
      "promotion": 2,
      "price": 1090000.00,
      "image": "https://product.hstatic.net/1000026716/product/gemini_56113ebc3f0d4c68bf59d11159b029a2.png"
  },
  {
      "id": 5,
      "name": "Chuột Logitech G502 X Plus LightSpeed Black - item 5",
      "category": "Ram",
      "brand": "Samsung",
      "promotion": 3,
      "price": 2220000.00,
      "image": "https://product.hstatic.net/1000026716/product/case-thermaltake-divider-300-tg-snow_9ea40947faca496da8d0ede9dacc5d7b.jpg"
  },
  {
      "id": 6,
      "name": "Chuột Logitech G102 Lightsync RGB Black",
      "category": "Mouse",
      "brand": "Samsung",
      "promotion": 3,
      "price": 290000.00,
      "image": "https://product.hstatic.net/1000026716/product/case-thermaltake-divider-300-tg-snow_9ea40947faca496da8d0ede9dacc5d7b.jpg"
  },
  {
      "id": 7,
      "name": "Chuột Logitech G Pro X Superlight Wireless Red",
      "category": "Mouse",
      "brand": "Samsung",
      "promotion": 3,
      "price": 2990000.00,
      "image": "https://product.hstatic.net/1000026716/product/artboard_1-recovered_4aab2ffadfad4f83bb09aa86ce1a5cf7.png"
  },
  {
      "id": 8,
      "name": "Chuột Logitech G502 X White",
      "category": "Mouse",
      "brand": "Logitech",
      "promotion": 3,
      "price": 1750000.00,
      "image": "https://product.hstatic.net/1000026716/product/artboard_1-recovered_4aab2ffadfad4f83bb09aa86ce1a5cf7.png"
  },
  {
    "id": 9,
    "name": "Chuột Logitech G502 X Plus LightSpeed Black  - item 9",
    "category": "Ram",
    "brand": "Samsung",
    "promotion": 3,
    "price": 2220000.00,
    "image": "https://product.hstatic.net/1000026716/product/case-thermaltake-divider-300-tg-snow_9ea40947faca496da8d0ede9dacc5d7b.jpg"
},
{
    "id": 10,
    "name": "Chuột Logitech G102 Lightsync RGB Black",
    "category": "Mouse",
    "brand": "Samsung",
    "promotion": 3,
    "price": 290000.00,
    "image": "https://product.hstatic.net/1000026716/product/case-thermaltake-divider-300-tg-snow_9ea40947faca496da8d0ede9dacc5d7b.jpg"
},
{
    "id": 11,
    "name": "Chuột Logitech G Pro X Superlight Wireless Red",
    "category": "Mouse",
    "brand": "Samsung",
    "promotion": 3,
    "price": 2990000.00,
    "image": "https://product.hstatic.net/1000026716/product/artboard_1-recovered_4aab2ffadfad4f83bb09aa86ce1a5cf7.png"
},
{
    "id": 12,
    "name": "Chuột Logitech G502 X White",
    "category": "Mouse",
    "brand": "Logitech",
    "promotion": 3,
    "price": 1750000.00,
    "image": "https://product.hstatic.net/1000026716/product/artboard_1-recovered_4aab2ffadfad4f83bb09aa86ce1a5cf7.png"
}
]