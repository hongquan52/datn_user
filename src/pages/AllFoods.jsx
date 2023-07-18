import React, { useState, useEffect } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Col, Row } from 'reactstrap'
import { Box, CircularProgress } from '@mui/material'
import { Button, Dialog, Alert, AlertTitle, Breadcrumbs, Typography, Link } from '@mui/material'
import NavigationNexIcon from '@mui/icons-material/NavigateNext'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LoopIcon from '@mui/icons-material/Loop';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductCard from '../components/UI/product-card/ProductCard'
import ProductCard1 from '../components/UI/product-card/ProductCard1'
import '../styles/all-foods.css'
import '../styles/pagination.css'
import ReactPaginate from 'react-paginate'

import { useQuery } from '@tanstack/react-query'
import { thunkBrandTypes, thunkProductTypes, thunkProductTypeTypes } from '../constants/thunkTypes'
import { getAllProducts } from '../api/fetchers/product'
import { getAllBrand } from '../api/fetchers/brand'
import { getAllProductType } from '../api/fetchers/producttype'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../constants/baseURL'

const AllFoods = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // category and brand

  const [allProductData, setAllProductData] = useState([])
  const [allProductDataOriginal, setAllProductDataOriginal] = useState([])
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState('');

  const [filter, setFilter] = useState("all")

  // FILTER NAVIGATION STATE:
  const [filterRating, setFilterRating] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  // FILTER PRICE
  const [filterPriceMin, setFilterPriceMin] = useState(0);
  const [filterPriceMax, setFilterPriceMax] = useState(70000000);
  // FILTER FLASH SALE
  const [filterFlashSale, setFilterFlashSale] = useState(false);
  // SORT ASC / DESC
  const [sortMode, setSortMode] = useState('');
  // ONMODE FILTER
  const [onRunFilter, setOnRunFilter] = useState(false);

  const handleChangeSortMode = (event) => {
    setSortMode(event.target.value);
  };
  const showToastMessageError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });

  };
  //
  const [open, setOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  //const [productData, setProductData] = useState(products)
  const [pageNumber, setPageNumber] = useState(0)

  const productPerPage = 12
  const visitedPage = pageNumber * productPerPage

  // react query fetch api
  const { isLoading, data } = useQuery([thunkProductTypes.GETALL_PRODUCT], getAllProducts)
  const brandUseQuery = useQuery([thunkBrandTypes.GETALL_BRAND], getAllBrand);
  const categoryUseQuery = useQuery([thunkProductTypeTypes.GETALL_PRODUCTTYPE], getAllProductType);

  const [brandData, setBrandData] = useState([])
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    if (brandUseQuery.data && categoryUseQuery.data) {
      setBrandData(brandUseQuery.data.data);
      setCategoryData(categoryUseQuery.data.data);

    }
  }, [brandUseQuery.data, categoryUseQuery.data])
  
  // SEARCH HEADER
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const querySearchText = params.get('searchText');
    const queryCategory = params.get('category');
    
    if(querySearchText !== null) {
      setSearchTerm(querySearchText);
    }
    if(queryCategory !== null) {
      setCategory(queryCategory);
    }

  })
  // useEffect(() => {
  //   axios.get(`${baseURL}/api/v1/product`)
  //   .then((res) => {
  //     let categoryProduct = res.data.filter(
  //       (item) => item.category === category
  //     )
  //     setAllProductData(categoryProduct);
  //   })
  // }, [category])

  useEffect(() => {
    if(data) {
      if(filter === "all") {
        if(category === '') {
          setAllProductData(data?.data)
          setAllProductDataOriginal(data?.data)
        }
        else {
          let x = data?.data.filter(
            (item) => item.category == category
          )
          setAllProductData(x);
          setAllProductDataOriginal(data?.data)
        }    
      }
      
      
    }
  }, [data,filter, category])

  useEffect(() => {
    if(filterPriceMax < filterPriceMin) {
      showToastMessageError("Giá tối thiểu phải bé hơn giá tối đa");
    }
    else {

      if(sortMode === 'ASC') {
        if(filterFlashSale) {
          if(filterBrand == '') {
            if(filterRating ==='') {
              const z = allProductDataOriginal.filter(
                (item) => item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
              let z1 = z.sort((a, b) => (a.discountPrice > b.discountPrice) ? 1: -1);
              setAllProductData(z1);
            }
            else {
              const y = allProductDataOriginal.filter(
                (item) => Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
              let z1 = y.sort((a, b) => (a.discountPrice > b.discountPrice) ? 1: -1);
              setAllProductData(z1);
            }
          }
          else {
            if(filterRating !== '') {
      
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
              let z1 = x.sort((a, b) => (a.discountPrice > b.discountPrice) ? 1: -1);
              setAllProductData(z1);
            }
            else {
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
              let z1 = x.sort((a, b) => (a.discountPrice > b.discountPrice) ? 1: -1);
              setAllProductData(z1);
            }
          }
        }
        else {
          if(filterBrand == '') {
            if(filterRating ==='') {
              const z = allProductDataOriginal.filter(
                (item) => item.price >= filterPriceMin && item.price <= filterPriceMax
              )
              let z1 = z.sort((a, b) => (a.discountPrice > b.discountPrice) ? 1: -1);
              setAllProductData(z1);
            }
            else {
              const y = allProductDataOriginal.filter(
                (item) => Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax
              )
              let z1 = y.sort((a, b) => (a.discountPrice > b.discountPrice) ? 1: -1);
              setAllProductData(z1);
            }
          }
          else {
            if(filterRating !== '') {
      
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax
              )
              let z1 = x.sort((a, b) => (a.discountPrice > b.discountPrice) ? 1: -1);
              setAllProductData(z1);
            }
            else {
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && item.price >= filterPriceMin && item.price <= filterPriceMax
              )
              let z1 = x.sort((a, b) => (a.discountPrice > b.discountPrice) ? 1: -1);
              setAllProductData(z1);
            }
          }
        }
      }
      else if(sortMode === 'DESC') {
        if(filterFlashSale) {
  
          if(filterBrand == '') {
            if(filterRating ==='') {
              const z = allProductDataOriginal.filter(
                (item) => item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
              let z1 = z.sort((a,b) => (a.discountPrice < b.discountPrice) ? 1: -1 );
              setAllProductData(z1);
            }
            else {
              const y = allProductDataOriginal.filter(
                (item) => Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
              let z1 = y.sort((a,b) => (a.discountPrice < b.discountPrice) ? 1: -1 );
              setAllProductData(z1);
            }
          }
          else {
            if(filterRating !== '') {
      
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
              let z1 = x.sort((a,b) => (a.discountPrice < b.discountPrice) ? 1: -1 );
              setAllProductData(z1);
            }
            else {
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
              let z1 = x.sort((a,b) => (a.discountPrice < b.discountPrice) ? 1: -1 );
              setAllProductData(z1);
            }
          }
        }
        else {
          if(filterBrand == '') {
            if(filterRating ==='') {
              const z = allProductDataOriginal.filter(
                (item) => item.price >= filterPriceMin && item.price <= filterPriceMax
              )
              let z1 = z.sort((a,b) => (a.discountPrice < b.discountPrice) ? 1: -1 );
              setAllProductData(z1);
            }
            else {
              const y = allProductDataOriginal.filter(
                (item) => Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax
              )
              let z1 = y.sort((a,b) => (a.discountPrice < b.discountPrice) ? 1: -1 );
              setAllProductData(z1);
            }
          }
          else {
            if(filterRating !== '') {
      
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax
              )
              let z1 = x.sort((a,b) => (a.discountPrice < b.discountPrice) ? 1: -1 );
              setAllProductData(z1);
            }
            else {
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && item.price >= filterPriceMin && item.price <= filterPriceMax
              )
              let z1 = x.sort((a,b) => (a.discountPrice < b.discountPrice) ? 1: -1 );
              setAllProductData(z1);
            }
          }
        }
      }
      else {
        if(filterFlashSale) {
  
          if(filterBrand == '') {
            if(filterRating ==='') {
              const z = allProductDataOriginal.filter(
                (item) => item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
              
              setAllProductData(z);
            }
            else {
              const y = allProductDataOriginal.filter(
                (item) => Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
              
              setAllProductData(y);
            }
          }
          else {
            if(filterRating !== '') {
      
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
             
              setAllProductData(x);
            }
            else {
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && item.price >= filterPriceMin && item.price <= filterPriceMax && item.discount >=30
              )
              
              setAllProductData(x);
            }
          }
        }
        else {
          if(filterBrand == '') {
            if(filterRating ==='') {
              const z = allProductDataOriginal.filter(
                (item) => item.price >= filterPriceMin && item.price <= filterPriceMax
              )
              
              setAllProductData(z);
            }
            else {
              const y = allProductDataOriginal.filter(
                (item) => Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax
              )
              
              setAllProductData(y);
            }
          }
          else {
            if(filterRating !== '') {
      
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && Math.ceil(item.rate) == filterRating && item.price >= filterPriceMin && item.price <= filterPriceMax
              )
             
              setAllProductData(x);
            }
            else {
              const x = allProductDataOriginal.filter(
                (item) => item.brand === filterBrand && item.price >= filterPriceMin && item.price <= filterPriceMax
              )
              
              setAllProductData(x);
            }
          }
        }
      }
    }
  }, [onRunFilter, sortMode])

  console.log("alll product data filter is: ", allProductData);

  if (isLoading || brandUseQuery.isLoading || categoryUseQuery.isLoading) {
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

  // const searchedProduct = data?.data?.filter((item) => {
  //   if (searchTerm?.value === '')
  //     return item;
  //   if (item.name.toLowerCase().includes(searchTerm?.toLowerCase()))
  //     return item
  // })
  
  const searchedProduct = allProductData.filter((item) => {
    if (searchTerm?.value === '')
      return item;
    if (item.name.toLowerCase().includes(searchTerm?.toLowerCase()))
      return item
  })

  const displayPage = searchedProduct.slice(visitedPage, visitedPage + productPerPage)
  console.log('displayPage: ', displayPage);
  const pageCount = Math.ceil(searchedProduct.length / productPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Helmet title='All-foods'>
      <ToastContainer />
      <Box m={2} style={{padding: 10, marginTop: 50, marginLeft: 100}}>
        <Breadcrumbs
            // maxItems={}
            // itemsBeforeCollapse={2}
            aria-label='breadcrumb'
            separator={<NavigationNexIcon fontSize='small' />}
        >
            <Link underline='hover' href='Home' color={'#F9813A'}>
                Trang chủ
            </Link>
            <Typography color={"black"}>Mua sắm</Typography>
        </Breadcrumbs>
      </Box>
      <Container>
        <Row style={{marginBottom: 20}}>
          <div className="sorting__widget text-end d-flex align-items-center
               justify-content-end w-100">
                <p style={{marginRight: 170, width: 300, margin: 'auto'}}>Hiển thị kết quả cho "{category}{searchTerm} {filterBrand!=='' && filterBrand}{filterRating!=='' && 'và rate: '+filterRating}"</p>
                <Box sx={{ minWidth: 180, marginRight: 5 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Loại sản phẩm"
                      onChange={(e) => {
                        navigate('/foods');
                        setCategory(e.target.value);
                      }}
                    >
                      {
                        categoryData.map((item) => (
                          <MenuItem value={item.name}>{item.name}</MenuItem>
                        ))
                      }
                          
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 180, marginRight: 5 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sortMode}
                      label="Sắp xếp"
                      onChange={handleChangeSortMode}
                    >
                          <MenuItem value={'ASC'}>Giá từ thấp đến cao</MenuItem>
                          <MenuItem value={"DESC"}>Giá từ cao đến thấp</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
              </div>
        </Row>
        <Row>
          <Col lg='3' md='6' sm='6' xs='12' style={{background: '#F9813A', borderRadius: 20, height: 880}}>
            
            <div className='filter__price-container'>
              <p className='filter__title-item'>Khoảng giá</p>
              <div className='filter__price-item1' style={{marginTop: 30}}>
                <p>Min</p>
                <input type="number"
                  onChange={(e) => setFilterPriceMin(parseInt(e.target.value))}
                />
                <p>Max</p>
                <input type="number"
                  onChange={(e) => setFilterPriceMax(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className='filter__price-container'>
              <p className = 'filter__title-item'>Đánh giá sản phẩm</p>
              <div className='filter__price-item' style={{height: 40, fontWeight: 'bold'}}>
                <input type='checkbox' value={5}
                  onChange={(e) => setFilterRating(e.target.value)}
                  checked = { filterRating == 5 ? true : false}
                />
                <p style={{fontSize: 25, color: '#FFD700'}}> 5 ★★★★★</p>
              </div>
              <div className='filter__price-item' style={{height: 40, fontWeight: 'bold'}}>
                <input type='checkbox' value={4}
                  onChange={(e) => setFilterRating(e.target.value)}
                  checked = { filterRating == 4 ? true : false}
                />
                <p style={{fontSize: 22, color: '#FFD700'}}>4 ★★★★</p>
              </div>
              <div className='filter__price-item' style={{height: 40, fontWeight: 'bold'}}>
                <input type='checkbox' value={3}
                  onChange={(e) => setFilterRating(e.target.value)}
                  checked = { filterRating == 3 ? true : false}
                />
                <p style={{fontSize: 20, color: '#FFD700'}}>3 ★★★</p>
              </div>
              <div className='filter__price-item' style={{height: 40, fontWeight: 'bold'}}>
                <input type='checkbox' value={2}
                  onChange={(e) => setFilterRating(e.target.value)}
                  checked = { filterRating == 2 ? true : false}
                />
                <p style={{fontSize: 18, color: '#FFD700'}}>2 ★★</p>
              </div>
              <div className='filter__price-item' style={{height: 40, fontWeight: 'bold'}}>
                <input type='checkbox' value={1}
                  onChange={(e) => setFilterRating(e.target.value)}
                  checked = { filterRating == 1 ? true : false}
                  
                />
                <p style={{fontSize: 16, color: '#FFD700'}}>1 ★</p>
              </div>
              
            </div>
            <div className='filter__price-container'>
              <p className = 'filter__title-item'> Thương hiệu </p>
              <div className='filter__price-item'>
                <input type='checkbox' value={'Samsung'}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  checked = { filterBrand === 'Samsung' ? true : false }
                />
                <p>Samsung</p>
              </div>
              <div className='filter__price-item'>
                <input type='checkbox' value={'Kingston'}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  checked = { filterBrand === 'Kingston' ? true : false }
                />
                <p>Kingston</p>
              </div>
              <div className='filter__price-item'>
                <input type='checkbox' value={'Asus'}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  checked = { filterBrand === 'Asus' ? true : false }
                />
                <p>Asus</p>
              </div>
              <div className='filter__price-item'>
                <input type='checkbox' value={'Logitech'}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  checked = { filterBrand === 'Logitech' ? true : false }
                />
                <p>Logitech</p>
              </div>
              <div className='filter__price-item'>
                <input type='checkbox' value={'Intel'}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  checked = { filterBrand === 'Intel' ? true : false }
                />
                <p>Intel</p>
              </div>
              <div className='filter__price-item'>
                <input type='checkbox' value={'MSI'}
                  onChange={(e) => setFilterBrand(e.target.value)}
                  checked = { filterBrand === 'MSI' ? true : false }
                />
                <p>MSI</p>
              </div>
              
            </div>
            <div className='filter__price-container'>
              <p className = 'filter__title-item'> Khác </p>  
              <div className='filter__price-item'>
                <input type='checkbox'
                  onChange={(e) => setFilterFlashSale(!filterFlashSale)}
                  checked={filterFlashSale ? true : false}
                />
                <p>Flash sale</p>
              </div>
              
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button
                onClick={() => {
                  setOnRunFilter(!onRunFilter);
                  
                }}
                className='filter__btn'><FilterAltIcon /> Lọc</button>
              <button
                style={{marginLeft : 10}}
                onClick={() => {
                  setFilterBrand('');
                  setFilterRating('');
                  setCategory('');
                  setFilterPriceMin(0);
                  setFilterPriceMax(100000000);
                  setSearchTerm('');
                  navigate('/foods');
                }}
                className='filter__btn'><LoopIcon /> Đặt lại</button>
            </div>
          </Col>
          <Col lg='9'  md='4' sm='6' xs='6' className='mb-4'
            style={{display: 'flex', justifyContent: 'flex-start',flexWrap: 'wrap'}}
          > 
            {
              displayPage.length > 0 ?
              displayPage.filter(
                (item) => item.deleted === false
              )
              .map((item) => (
                <div style={{height: 270, width: 200,backgroundColor: '#fedac5', margin: 5,
                  borderRadius: 10}}>
                  <ProductCard1 item={item} sukien={handleClick} />

                </div>
              ))
              :
              <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%', height: '100%'}}>
                <p style={{color: 'red'}}>Không tìm thấy sản phẩm phù hợp</p>
              </div>
            }
            {/* NOTIFY AND PAGING */}
            <Dialog open={open} onClose={handleClick}>
              <Alert

              >
                <AlertTitle>Product</AlertTitle>
                Add product to cart succesfully
              </Alert>
            </Dialog>
          </Col>
          
        </Row>
        <Row>

        </Row>
            <Col lg='3'  md='4' sm='6' xs='6' className='mb-4'>

            </Col>
            <Col lg='9'  md='4' sm='6' xs='6' className='mb-4' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              
                <ReactPaginate
                  pageCount={pageCount}
                  onPageChange={changePage}
                  previousLabel='<'
                  nextLabel='>'
                  containerClassName='paginationBttns'
                />
              
            </Col>
        
      </Container>
      
    </Helmet>
  )
}

export default AllFoods