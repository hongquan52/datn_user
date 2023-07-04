import React from 'react'
import {Container, Col, Row} from 'reactstrap'

import '../../../styles/category.css'

const categoryData = [
    
]

const Category = () => {
  return (
    <Container>
        <Row>
            
            {categoryData.map((item, index) => (
                <Col lg="3" md="4" key={index} >
                    <div className="category__item">
                    <div className="category__img"
                    >
                        <img src={item.imgUrl} alt="category__item d-flex align-items-center gap-3" />
                    </div>
                    <h6>{item.display}</h6>
                    </div>
                </Col>
            ))}
        </Row>
    </Container>
  )
}

export default Category