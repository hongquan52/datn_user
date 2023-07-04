import React, { useState, useEffect } from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
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

const AllFoods = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // category and brand

  const [allProductData, setAllProductData] = useState([])
  const [allProductDataOriginal, setAllProductDataOriginal] = useState([])
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();

  const [filter, setFilter] = useState("all")

  // FILTER NAVIGATION STATE:
  const [filterRating, setFilterRating] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  // FILTER PRICE
  const [filterPriceMin, setFilterPriceMin] = useState(0);
  const [filterPriceMax, setFilterPriceMax] = useState(70000000);
  // SORT ASC / DESC
  const [sortMode, setSortMode] = useState('');
  // ONMODE FILTER
  const [onRunFilter, setOnRunFilter] = useState(false);

  const handleChangeSortMode = (event) => {
    setSortMode(event.target.value);
  };
  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
    console.log('Brand handelChange: ', event.target.value)
    setFilter(event.target.value);
    setCategory('')
    
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    console.log('Category handelChange: ', event.target.value)
    setFilter(event.target.value)
    setBrand('');
  }

  //
  const [open, setOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  //const [productData, setProductData] = useState(products)
  const [pageNumber, setPageNumber] = useState(0)

  const productPerPage = 8
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
    
    if(querySearchText !== null) {
      setSearchTerm(querySearchText);
    }
  })

  useEffect(() => {
    if(data) {
      if(filter === "all") {
        setAllProductData(data?.data)
        setAllProductDataOriginal(data?.data)

      }
      if(filter === "disable") {
        setAllProductData([])
      }
      if(filter === "Samsung") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.brand === "Samsung"
        )
        console.log("test samsung product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Logitech") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.brand === "Logitech"
        )
        console.log("test Logitech product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Kingston") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.brand === "Kingston"
        )
        console.log("test Kingston product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Case") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "Case"
        )
        console.log("test Case product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Mouse") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "Mouse"
        )
        console.log("test Mouse product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Ram") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "Ram"
        )
        console.log("test Ram product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "SSD") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "SSD"
        )
        console.log("test SSD product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "VGA") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "VGA"
        )
        console.log("test VGA product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "CPU") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "CPU"
        )
        console.log("test CPU product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Fan") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "Fan"
        )
        console.log("test Fan product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Mainboard") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "Mainboard"
        )
        console.log("test Mainboard product data: ", filter1111);
        setAllProductData(filter1111);
      }
      
    }
  }, [data,filter])

  useEffect(() => {
    
    if(sortMode === 'ASC') {
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
    else if(sortMode === 'DESC') {
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

  const searchedProduct = data?.data?.filter((item) => {
    if (searchTerm?.value === '')
      return item;
    if (item.name.toLowerCase().includes(searchTerm?.toLowerCase()))
      return item
  })
  
  const searchedProductNew = allProductData.filter((item) => {
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
      <Box m={2} style={{padding: 10, marginTop: 50, marginLeft: 100}}>
        <Breadcrumbs
            // maxItems={}
            // itemsBeforeCollapse={2}
            aria-label='breadcrumb'
            separator={<NavigationNexIcon fontSize='small' />}
        >
            <Link underline='hover' href='Home' color={'#F9813A'}>
                Home
            </Link>
            <Typography color={"black"}>Shopping</Typography>
        </Breadcrumbs>
      </Box>
      <Container>
        <Row style={{marginBottom: 20}}>
          <div className="sorting__widget text-end d-flex align-items-center
               justify-content-end w-100">
                <p style={{marginRight: 170, width: 300, margin: 'auto'}}>Hiển thị kết quả cho "{searchTerm} {filterBrand!=='' && filterBrand}{filterRating!=='' && 'và rate: '+filterRating}"</p>
                <Box sx={{ minWidth: 180, marginRight: 5 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sortMode}
                      label="Sort"
                      onChange={handleChangeSortMode}
                    >
                          <MenuItem value={'ASC'}>PRICE ASC</MenuItem>
                          <MenuItem value={"DESC"}>PRICE DESC</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
              </div>
        </Row>
        <Row>
          <Col lg='3' md='6' sm='6' xs='12' style={{background: '#F9813A', borderRadius: 20, height: 880}}>
            
            <div className='filter__price-container'>
              <p className='filter__title-item'>PRICE</p>
              <div className='filter__price-item1' style={{marginTop: 30}}>
                <p>Min</p>
                <input type="text"
                  onChange={(e) => setFilterPriceMin(parseInt(e.target.value))}
                />
                <p>Max</p>
                <input type="text"
                  onChange={(e) => setFilterPriceMax(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className='filter__price-container'>
              <p className = 'filter__title-item'>TOP RATING</p>
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
              <p className = 'filter__title-item'> BRAND </p>
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
              
            </div>
            <div className='filter__price-container'>
              <p className = 'filter__title-item'> ORTHER </p>  
              <div className='filter__price-item'>
                <input type='checkbox'/>
                <p>Hot product</p>
              </div>
              <div className='filter__price-item'>
                <input type='checkbox'/>
                <p>Flash sale</p>
              </div>
              
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button
                onClick={() => {
                  setOnRunFilter(!onRunFilter);
                  
                }}
                className='filter__btn'><FilterAltIcon /> Fillter</button>
              <button
                style={{marginLeft : 10}}
                onClick={() => {
                  setFilterBrand('');
                  setFilterRating('');
                  setFilterPriceMin(0);
                  setFilterPriceMax(100000000);
                  navigate('/foods');
                  setSearchTerm('');
                }}
                className='filter__btn'><LoopIcon /> Refresh</button>
            </div>
          </Col>
          <Col lg='9'  md='4' sm='6' xs='6' className='mb-4'
            style={{display: 'flex', justifyContent: 'flex-start',flexWrap: 'wrap'}}
          > 
            {
              searchedProductNew.map((item) => (
                <div style={{height: 270, width: 200,backgroundColor: '#fedac5', margin: 5,
                  borderRadius: 10}}>
                  <ProductCard1 item={item} sukien={handleClick} />

                </div>
              ))
            }

          </Col>
          
        </Row>
        
      </Container>
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6' sm='6' xs='12'>
              <div className="search__widget d-flex align-items-center
               justify-content-between w-50">
                <input type="text" placeholder='Bạn muốn tìm gì?...'
                  value={searchTerm} onChange={(e) => {
                    setSearchTerm(e.target.value);
                    // setAllProductData([]);
                  }} />
                <span><i className='ri-search-line'></i></span>
              </div>
            </Col>
            
            <Col lg='6' md='6' sm='6' xs='12' className='mb-5'>
              <div className="sorting__widget text-end d-flex align-items-center
               justify-content-between w-100">

                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={brand}
                      label="Brand"
                      onChange={handleChangeBrand}
                    >
                      {
                        brandData.map((item) => (
                          <MenuItem value={item.name}>{item.name}</MenuItem>
                        ))
                      }

                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Category"
                      onChange={handleChangeCategory}
                    >
                      {
                        categoryData.map((item) => (
                          <MenuItem value={item.name}>{item.name}</MenuItem>
                        ))
                      }

                    </Select>
                  </FormControl>
                </Box>

              </div>
            </Col>
            
            
            {
              allProductData.map((item) => (
                <Col lg='3' md='4' sm='6' xs='6' key={item.id} className='mb-4' >
                      {""}
                      <ProductCard item={item} sukien={handleClick} />
                    </Col>
              ))
            }
            <h2>Search product</h2>
            {
              displayPage.map((item) => (
                <Col lg='3' md='4' sm='6' xs='6' key={item.id} className='mb-4' >
                      {""}
                      <ProductCard item={item} sukien={handleClick} />
                    </Col>
              ))
            }
            <Dialog open={open} onClose={handleClick}>
              <Alert

              >
                <AlertTitle>Product</AlertTitle>
                Add product to cart succesfully
              </Alert>
            </Dialog>
            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel='Prev'
                nextLabel='Next'
                containerClassName='paginationBttns'
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default AllFoods